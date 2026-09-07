import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/services",
  "/projects",
  "/about",
  "/design-process",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/projects/warm-modern-living",
  "/projects/quiet-order",
  "/projects/considered-details",
  "/projects/everyday-kitchen",
];
for (const route of routes)
  test(`page ${route} renders without overflow, broken images or accessibility violations`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toHaveCount(1);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 30));
      }
      window.scrollTo(0, 0);
    });
    for (const img of await page.locator("img").all()) {
      if (await img.isVisible()) {
        await img.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            img.evaluate(
              (el) =>
                (el as HTMLImageElement).complete &&
                (el as HTMLImageElement).naturalWidth > 0,
            ),
          )
          .toBe(true);
      }
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await expect
      .poll(() =>
        page
          .locator("img")
          .evaluateAll(
            (imgs) =>
              imgs.filter(
                (img) =>
                  img.getClientRects().length > 0 &&
                  (!(img as HTMLImageElement).complete ||
                    !(img as HTMLImageElement).naturalWidth),
              ).length,
          ),
      )
      .toBe(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      audit.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    ).toEqual([]);
  });
test("navigation, email and WhatsApp destinations", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Services", exact: true })
      .click();
  } else {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Services", exact: true })
      .click();
  }
  await expect(page).toHaveURL(/\/services$/);
  const links = await page
    .locator('a[href^="https://wa.me/"]')
    .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
  expect(links.length).toBeGreaterThan(10);
  for (const href of links) {
    const url = new URL(href);
    expect(url.pathname).toBe("/917013265720");
  }
  await expect(
    page.locator('a[href="mailto:thenestorainteriors@gmail.com"]').first(),
  ).toBeVisible();
  await page.locator('a[href^="/contact?service="]').first().click();
  await expect(page.locator("#service")).toHaveValue("Complete Home Interiors");
});
test("project filters, reset, gallery keyboard and swipe support", async ({
  page,
  isMobile,
}) => {
  await page.goto("/projects");
  await page
    .getByRole("button", { name: "Modular Kitchen", exact: true })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Luxury", exact: true }).click();
  await expect(page.getByText("Your space could be next.")).toBeVisible();
  await page.getByRole("button", { name: "Reset Filters" }).click();
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page
    .getByRole("link", { name: "View Project", exact: true })
    .first()
    .click();
  const opener = page.getByRole("button", { name: /Open .* image 1/ });
  await opener.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const modalAudit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(modalAudit.violations.map((v) => v.id)).toEqual([]);
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".lb-count")).toContainText("2 / 2");
  if (isMobile) {
    await page.locator(".lightbox-inner").evaluate((el) => {
      el.dispatchEvent(
        new TouchEvent("touchstart", {
          bubbles: true,
          changedTouches: [
            new Touch({ identifier: 1, target: el, clientX: 300 }),
          ],
        }),
      );
      el.dispatchEvent(
        new TouchEvent("touchend", {
          bubbles: true,
          changedTouches: [
            new Touch({ identifier: 1, target: el, clientX: 100 }),
          ],
        }),
      );
    });
    await expect(page.locator(".lb-count")).toContainText("1 / 2");
  }
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(opener).toBeFocused();
  await opener.click();
  await page.goBack();
  await expect(page).toHaveURL(/\/projects$/);
  await expect
    .poll(() => page.evaluate(() => document.body.style.overflow))
    .toBe("");
});
test("form validation, loading, failure and success UI (mocked provider boundary)", async ({
  page,
}) => {
  await page.goto("/contact");
  await page
    .getByRole("button", { name: "Request a Free Consultation" })
    .click();
  await expect(page.locator("#name")).toBeFocused();
  await expect(page.locator("#consent-error")).toBeVisible();
  await page.locator("#name").fill("Test Homeowner");
  await page.locator("#email").fill("test@example.com");
  await page.locator("#phone").fill("+91 9000000000");
  await page.locator("#location").fill("Hyderabad");
  await page.locator("#propertyType").selectOption("Apartment");
  await page.locator("#propertyStatus").selectOption("Planning stage");
  await page.locator("#service").selectOption("Complete Home Interiors");
  await page.locator("#budget").selectOption("Prefer to discuss");
  await page.locator("#contactMethod").selectOption("Email");
  await page.locator("input[name=consent]").check();
  await page.route("**/api/contact", async (route) => {
    await new Promise((r) => setTimeout(r, 300));
    await route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({
        message: "We could not confirm your enquiry was sent.",
      }),
    });
  });
  await page
    .getByRole("button", { name: "Request a Free Consultation" })
    .click();
  await expect(
    page.getByRole("button", { name: "Sending your enquiry…" }),
  ).toBeDisabled();
  await expect(page.locator(".form-status[role=alert]")).toContainText(
    "could not confirm",
  );
  await expect(page.locator("#name")).toHaveValue("Test Homeowner");
  await page.unroute("**/api/contact");
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        message: "Your enquiry has been accepted by our email service.",
      }),
    }),
  );
  await page
    .getByRole("button", { name: "Request a Free Consultation" })
    .click();
  await expect(page.locator(".form-status.success")).toContainText("accepted");
  await expect(
    page.getByRole("link", { name: "Continue on WhatsApp" }),
  ).toBeVisible();
});
test("metadata, sitemap, robots and missing pages", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(
    "Nestora Interiors | Home Interior Designers in Hyderabad",
  );
  await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
    "href",
    /^http:\/\/localhost:3000\/?$/,
  );
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect((await request.get("/opengraph-image")).status()).toBe(200);
  expect((await request.get("/not-a-page")).status()).toBe(404);
  expect((await request.get("/projects/not-a-project")).status()).toBe(404);
});
