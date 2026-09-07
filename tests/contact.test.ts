import { test } from "node:test";
import assert from "node:assert/strict";
import { handleContact } from "../lib/contact-handler";
import { enquirySchema, enquiryText } from "../lib/enquiry";
import { company, whatsappUrl } from "../lib/config";
import { services, projects } from "../lib/content";
const valid = {
  name: "Test Homeowner",
  email: "test@example.com",
  phone: "+91 9000000000",
  location: "Hyderabad",
  propertyType: "Apartment",
  propertyStatus: "Planning stage",
  service: "Complete Home Interiors",
  size: "1500 sq ft",
  budget: "Prefer to discuss",
  date: "",
  contactMethod: "Email",
  message: "Test enquiry only",
  consent: true,
  website: "",
  startedAt: Date.now() - 5000,
};
const env = {
  siteUrl: "https://nestora.test",
  key: "test-only-not-a-secret",
  from: "Nestora <hello@nestora.test>",
  recipient: company.email,
};
function request(body: unknown = valid, origin = "https://nestora.test") {
  return new Request("https://nestora.test/api/contact", {
    method: "POST",
    headers: { origin, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
const limit = async () => true;
test("valid enquiry and consent are validated; dangerous markup and control characters removed", () => {
  assert.equal(enquirySchema.safeParse(valid).success, true);
  assert.equal(
    enquirySchema.safeParse({ ...valid, consent: false }).success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({ ...valid, email: "invalid" }).success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({ ...valid, phone: "123" }).success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({ ...valid, date: "2020-01-01" }).success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({ ...valid, message: "x".repeat(3001) }).success,
    false,
  );
  assert.equal(
    enquirySchema.parse({ ...valid, message: "<tag>\u0000" }).message,
    "tag",
  );
});
test("all enquiry fields included in plain text, no honeypot or timing data", () => {
  const text = enquiryText(enquirySchema.parse(valid));
  for (const key of [
    "name",
    "email",
    "phone",
    "location",
    "propertyType",
    "propertyStatus",
    "service",
    "size",
    "budget",
    "contactMethod",
    "message",
  ] as const)
    assert.ok(text.includes(valid[key]));
  assert.ok(text.includes("Consent to enquiry contact: true"));
  assert.ok(!text.includes("startedAt"));
});
test("provider acceptance is required, recipient and Reply-To correct", async () => {
  let payload: Record<string, unknown> = {};
  const send: typeof fetch = async (_, init) => {
    payload = JSON.parse(String(init?.body));
    return Response.json({ id: "accepted-test-id" });
  };
  const response = await handleContact(request(), { limit, send, env });
  assert.equal(response.status, 200);
  assert.deepEqual(payload.to, [company.email]);
  assert.equal(payload.reply_to, valid.email);
  assert.equal(payload.from, env.from);
  assert.ok(String(payload.text).includes(valid.message));
});
test("provider rejection, missing ID, network failure never report success", async () => {
  for (const send of [
    async () => Response.json({ error: "rejected" }, { status: 403 }),
    async () => Response.json({}),
    async () => {
      throw new Error("network");
    },
  ])
    assert.equal(
      (await handleContact(request(), { limit, send, env })).status,
      502,
    );
});
test("unconfigured email fails honestly", async () => {
  assert.equal(
    (await handleContact(request(), { limit, env: { siteUrl: env.siteUrl } }))
      .status,
    503,
  );
});
test("invalid fields, honeypot, too-fast and stale submissions rejected before sending", async () => {
  let sends = 0;
  const send: typeof fetch = async () => {
    sends++;
    return Response.json({ id: "bad" });
  };
  for (const body of [
    { ...valid, name: "" },
    { ...valid, website: "spam" },
    { ...valid, startedAt: Date.now() },
    { ...valid, startedAt: 0 },
    { ...valid, service: "Invalid" },
    { ...valid, date: "2030-02-31" },
  ])
    assert.equal(
      (await handleContact(request(body), { limit, env, send })).status,
      400,
    );
  assert.equal(sends, 0);
});
test("foreign origin, rate limit and rate service failure are rejected", async () => {
  assert.equal(
    (await handleContact(request(valid, "https://evil.test"), { limit, env }))
      .status,
    403,
  );
  const limited = await handleContact(request(), {
    limit: async () => false,
    env,
  });
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("retry-after"), "900");
  assert.equal(
    (
      await handleContact(request(), {
        limit: async () => {
          throw new Error("redis");
        },
        env,
      })
    ).status,
    503,
  );
});
test("oversized bodies, malformed JSON and wrong media type rejected", async () => {
  assert.equal(
    (
      await handleContact(request({ ...valid, message: "a".repeat(18000) }), {
        limit,
        env,
      })
    ).status,
    400,
  );
  const req = new Request("https://nestora.test/api/contact", {
    method: "POST",
    headers: { origin: env.siteUrl, "content-type": "application/json" },
    body: "bad json",
  });
  assert.equal((await handleContact(req, { limit, env })).status, 400);
  assert.equal(
    (
      await handleContact(
        new Request("https://nestora.test/api/contact", {
          method: "POST",
          headers: { origin: env.siteUrl },
          body: "hi",
        }),
        { limit, env },
      )
    ).status,
    415,
  );
});
test("all default, service and project WhatsApp messages round-trip with correct number", () => {
  for (const message of [
    company.defaultMessage,
    ...services.map((s) => company.serviceMessage(s.name)),
    ...projects.map((p) => company.projectMessage(p.name)),
  ]) {
    const url = new URL(whatsappUrl(message));
    assert.equal(url.hostname, "wa.me");
    assert.equal(url.pathname, `/${company.whatsapp}`);
    assert.equal(url.searchParams.get("text"), message);
  }
});
