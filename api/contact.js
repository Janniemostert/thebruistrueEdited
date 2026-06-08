import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "The Bru Is True <noreply@thebruistrue.com>";
const TO = "info@thebruistrue.com";
const BCC = "janniecmostert@gmail.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Notification email to the business
    await resend.emails.send({
      from: FROM,
      to: TO,
      bcc: [BCC],
      replyTo: email,
      subject: `New enquiry from ${name}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 24px;background:#0F0F0F;color:#E8DFD0;">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C6A75E;margin-bottom:24px;">New Enquiry</p>
          <h2 style="font-weight:300;font-size:28px;margin:0 0 32px;color:#E8DFD0;">${name}</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid rgba(198,167,94,0.15);font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#C6A75E;width:120px;">Name</td>
              <td style="padding:12px 0;border-bottom:1px solid rgba(198,167,94,0.15);font-size:14px;color:#E8DFD0;">${name}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid rgba(198,167,94,0.15);font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#C6A75E;">Email</td>
              <td style="padding:12px 0;border-bottom:1px solid rgba(198,167,94,0.15);font-size:14px;color:#E8DFD0;"><a href="mailto:${email}" style="color:#C6A75E;">${email}</a></td>
            </tr>
          </table>
          <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#C6A75E;margin-bottom:12px;">Message</p>
          <p style="font-size:15px;line-height:1.7;color:#E8DFD0;white-space:pre-wrap;">${message}</p>
          <div style="margin-top:40px;padding-top:24px;border-top:1px solid rgba(198,167,94,0.15);">
            <p style="font-size:11px;color:rgba(232,223,208,0.4);font-style:italic;">Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
    });

    // Auto-reply to the enquirer
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Thank you for your enquiry — The Bru Is True",
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 24px;background:#0F0F0F;color:#E8DFD0;">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C6A75E;margin-bottom:24px;">The Bru Is True</p>
          <h2 style="font-weight:300;font-size:28px;margin:0 0 16px;color:#E8DFD0;">Thank you, ${name}.</h2>
          <div style="width:40px;height:1px;background:#C6A75E;margin-bottom:32px;"></div>
          <p style="font-size:15px;line-height:1.8;color:#E8DFD0;margin-bottom:16px;">
            We've received your message and will be in touch with you shortly.
          </p>
          <p style="font-size:15px;line-height:1.8;color:rgba(232,223,208,0.7);">
            In the meantime, feel free to browse our blends or visit our online store.
          </p>
          <div style="margin-top:40px;padding-top:24px;border-top:1px solid rgba(198,167,94,0.15);">
            <p style="font-size:12px;color:rgba(232,223,208,0.4);font-style:italic;margin:0;">
              Honestly sourced. Carefully roasted. Passionately brewed.
            </p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
