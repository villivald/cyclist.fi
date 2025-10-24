import { expect, test } from "@chromatic-com/playwright";

test.describe("Contact form - success flow", () => {
  test("submits form, shows success and resets fields", async ({ page }) => {
    await page.goto("/contact");

    // Fill fields
    const email = page.getByLabel(/your email/i);
    const subject = page.getByLabel(/subject/i);
    const name = page.getByLabel(/your name/i);
    const message = page.getByLabel(/your message/i);

    await email.fill("john.doe@example.com");
    await subject.selectOption("general");
    await name.fill("John Doe");
    await message.fill("Hello, this is a test message.");

    // Intercept API call and assert payload
    let capturedBody: unknown;
    await page.route("**/api/contact", async (route) => {
      const request = route.request();
      capturedBody = request.postDataJSON();
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, result: { id: "mock-id" } }),
      });
    });

    // Submit form
    await page.getByRole("button", { name: /send message/i }).click();

    // Expect success message
    await expect(
      page.getByText(/your message has been sent successfully/i),
    ).toBeVisible();

    // Expect countdown text to appear
    await expect(page.getByText(/redirecting in/i)).toBeVisible();

    // Assert payload matches what we filled (subject resolves to localized label inside component)
    expect(capturedBody).toMatchObject({
      fromEmail: "john.doe@example.com",
      name: "John Doe",
      message: "Hello, this is a test message.",
    });

    // Fields reset after success
    await expect(email).toHaveValue("");
    await expect(name).toHaveValue("");
    // Subject should reset to "general"
    await expect(subject).toHaveValue("general");
    await expect(message).toHaveValue("");
  });
});
