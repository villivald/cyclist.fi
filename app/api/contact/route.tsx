import { Resend } from "resend";

import ContactEmailTemplate from "@/components/emails/contact-email-template";

export async function POST(request: Request) {
  try {
    const { message, fromEmail, name, subject } = (await request.json()) as {
      message?: string;
      fromEmail?: string;
      name?: string;
      subject?: string;
    };

    if (!message || !fromEmail) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "Missing RESEND_API_KEY environment variable",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const resend = new Resend(apiKey);

    const fromAddress = process.env.RESEND_FROM_EMAIL;

    if (!fromAddress) {
      return new Response(
        JSON.stringify({
          error: "Missing RESEND_FROM_EMAIL environment variable",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const result = await resend.emails.send({
      from: fromAddress,
      to: "maxim@villivald.com",
      subject: `Cyclist.fi - ${subject}`,
      react: (
        <ContactEmailTemplate
          message={message}
          fromEmail={fromEmail}
          name={name}
        />
      ),
      replyTo: fromEmail,
    });

    if (result.error) {
      return new Response(JSON.stringify({ error: result.error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message ?? "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
