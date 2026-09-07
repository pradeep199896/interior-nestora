import { enquirySchema, enquiryText } from "./enquiry";
import { company } from "./config";
import { allowEnquiry } from "./rate-limit";
type Dependencies = {
  limit?: (request: Request) => Promise<boolean>;
  send?: typeof fetch;
  env?: { siteUrl?: string; key?: string; from?: string; recipient?: string };
  now?: () => number;
};
const reply = (
  data: unknown,
  status: number,
  headers: Record<string, string> = {},
) =>
  Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
async function readBody(request: Request) {
  if (Number(request.headers.get("content-length")) > 16000)
    throw new Error("large");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("empty");
  let size = 0;
  let body = "";
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16000) {
      await reader.cancel();
      throw new Error("large");
    }
    body += decoder.decode(value, { stream: true });
  }
  return JSON.parse(body + decoder.decode());
}
export async function handleContact(request: Request, deps: Dependencies = {}) {
  const env = deps.env || {
    siteUrl: company.siteUrl,
    key: process.env.RESEND_API_KEY,
    from: process.env.EMAIL_FROM,
    recipient: process.env.CONTACT_RECIPIENT_EMAIL || company.email,
  };
  const origin = request.headers.get("origin");
  const expected = env.siteUrl || "http://localhost:3000";
  if (origin !== new URL(expected).origin)
    return reply({ message: "Please submit the form from this website." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reply({ message: "Unsupported request format." }, 415);
  try {
    if (!(await (deps.limit || allowEnquiry)(request)))
      return reply(
        {
          message:
            "Too many attempts. Please wait 15 minutes or contact us on WhatsApp.",
        },
        429,
        { "Retry-After": "900" },
      );
  } catch {
    return reply(
      {
        message:
          "The enquiry form is temporarily unavailable. Please contact us on WhatsApp or by email.",
      },
      503,
    );
  }
  let raw;
  try {
    raw = await readBody(request);
  } catch {
    return reply({ message: "Invalid or oversized request." }, 400);
  }
  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues)
      errors[String(issue.path[0])] = issue.message;
    return reply(
      { message: "Please review the highlighted fields.", errors },
      400,
    );
  }
  const data = parsed.data;
  const elapsed = (deps.now?.() ?? Date.now()) - data.startedAt;
  if (elapsed < 2000 || elapsed > 86400000)
    return reply(
      {
        message:
          "Please take a moment to review your enquiry, or refresh the page if it has been open for a long time.",
      },
      400,
    );
  if (!env.key || !env.from || !env.recipient)
    return reply(
      {
        message:
          "Email enquiries are not available yet. Please use WhatsApp or send us an email directly.",
      },
      503,
    );
  try {
    const response = await (deps.send || fetch)(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.from,
          to: [env.recipient],
          reply_to: data.email,
          subject: `Website consultation: ${data.service}`,
          text: enquiryText(data),
        }),
        signal: AbortSignal.timeout(12000),
      },
    );
    if (!response.ok)
      return reply(
        {
          message:
            "We could not confirm your enquiry was sent. Please try again or contact us on WhatsApp.",
        },
        502,
      );
    const accepted = await response.json();
    if (typeof accepted.id !== "string" || !accepted.id)
      return reply(
        {
          message:
            "We could not confirm email acceptance. Please contact us on WhatsApp.",
        },
        502,
      );
    return reply(
      {
        message:
          "Thank you. Your enquiry has been accepted by our email service. Our team will contact you to discuss your consultation. Your preferred date is subject to confirmation.",
      },
      200,
    );
  } catch {
    return reply(
      {
        message:
          "We could not confirm your enquiry was sent. Please contact us on WhatsApp or by email.",
      },
      502,
    );
  }
}
