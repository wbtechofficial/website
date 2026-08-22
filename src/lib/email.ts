import { Resend } from "resend";

const resendApiKey = process.env.RESEND_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface SendWelcomeEmailParams {
  email: string;
  name: string;
}

export async function sendWelcomeEmail({ email, name }: SendWelcomeEmailParams) {
  if (!resend) {
    console.warn("RESEND_KEY is missing in environment variables. Email not sent.");
    return { success: false, error: "RESEND_KEY not configured" };
  }

  const firstName = name.trim().split(" ")[0] || "Technologist";

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to westbengal.tech</title>
</head>
<body style="margin: 0; padding: 0; background-color: #090d16; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; padding: 32px 16px;">
    <!-- Logo Header -->
    <tr>
      <td align="center" style="padding-bottom: 32px;">
        <a href="https://westbengal.tech" target="_blank" style="text-decoration: none;">
          <img src="https://westbengal.tech/brand-logo/west-bengal-tech-full-light.svg" alt="westbengal.tech" width="220" style="display: block; border: 0; max-width: 220px; height: auto;" />
        </a>
      </td>
    </tr>

    <!-- Main Card -->
    <tr>
      <td style="background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; padding: 40px 32px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
        <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #ffffff; line-height: 1.3;">
          You're in, ${firstName}! 🚀
        </h1>

        <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #9ca3af;">
          Thank you for joining <strong style="color: #38bdf8;">westbengal.tech</strong> — the primary open digital hub for software developers, tech startups, open-source maintainers, and engineering talent across West Bengal.
        </p>

        <p style="margin: 0 0 28px 0; font-size: 16px; line-height: 1.6; color: #9ca3af;">
          Our mission is to bring together technologists who want to learn, collaborate, and elevate the developer ecosystem in Kolkata and beyond. We're thrilled to have you with us!
        </p>

        <!-- Highlights Box -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1f2937; border-radius: 12px; margin-bottom: 32px;">
          <tr>
            <td style="padding: 24px;">
              <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.05em;">
                What's waiting for you:
              </h2>
              <ul style="margin: 0; padding-left: 20px; color: #d1d5db; font-size: 15px; line-height: 1.8;">
                <li style="margin-bottom: 8px;"><strong style="color: #ffffff;">Developer Network:</strong> Connect with local software engineers, founders, and creators.</li>
                <li style="margin-bottom: 8px;"><strong style="color: #ffffff;">Open Source & Projects:</strong> Discover and showcase projects built right here in Bengal.</li>
                <li style="margin-bottom: 0;"><strong style="color: #ffffff;">Meetups & Events:</strong> Stay updated on community gatherings, CFPs, and React Kolkata events.</li>
              </ul>
            </td>
          </tr>
        </table>

        <!-- CTA Button -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center">
              <a href="https://westbengal.tech" target="_blank" style="display: inline-block; background-color: #0284c7; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 10px; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.4);">
                Explore the Community
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td align="center" style="padding-top: 32px; font-size: 13px; color: #6b7280; line-height: 1.6;">
        <p style="margin: 0 0 8px 0;">
          West Bengal Tech Guild • Kolkata, West Bengal, India
        </p>
        <p style="margin: 0;">
          Sent from <a href="https://westbengal.tech" style="color: #9ca3af; text-decoration: underline;">westbengal.tech</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  try {
    const data = await resend.emails.send({
      from: "West Bengal Tech <noreply@westbengal.tech>",
      to: [email],
      subject: "You're In! Welcome to the West Bengal Tech Community 🚀",
      html: htmlContent,
    });

    console.log("Welcome email sent successfully to", email, ":", data);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send welcome email via Resend:", error);
    return { success: false, error };
  }
}
