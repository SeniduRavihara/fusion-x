import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function sendCertificateEmail(name: string, email: string, certificateUrl: string) {
  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || "certificates@fusionx-usj.org";
    
    // Generate the premium HTML template
    const emailHtml = generateCertificateTemplate(name, certificateUrl);

    const { data, error } = await resend.emails.send({
      from: "Fusion X <" + fromEmail + ">",
      to: email,
      subject: "Your Fusion X 1.0 Certificate is Here!",
      html: emailHtml,
    });

    if (error) {
      console.error("Resend error sending certificate to", email, error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error("Failed to send certificate email to", email, err);
    return { success: false, error: err.message || "Unknown error" };
  }
}

function generateCertificateTemplate(name: string, certificateUrl: string): string {
  var html = "";
  html += "<!DOCTYPE html>";
  html += "<html>";
  html += "<head>";
  html += "  <meta charset=\"utf-8\">";
  html += "  <title>Your Fusion X 1.0 Certificate</title>";
  html += "</head>";
  html += "<body style=\"margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif; background-color: #ffffff; color: #1a1a1a;\">";
  html += "  <div style=\"max-width: 600px; margin: 0 auto; background-color: #1f2227; border-radius: 12px; padding: 32px; border: 1px solid rgba(51, 56, 66, 0.2);\">";
  html += "    <div style=\"text-align: center; margin-bottom: 32px;\">";
  html += "      <h1 style=\"font-size: 36px; font-weight: bold; color: white; margin-bottom: 8px;\">Fusion X 1.0</h1>";
  html += "      <p style=\"color: #9ca3af;\">Thank you for your participation!</p>";
  html += "    </div>";
  html += "    <div style=\"text-align: center; margin-bottom: 32px;\">";
  html += "      <h2 style=\"font-size: 24px; color: #fbbf24; margin-bottom: 16px;\">Congratulations, " + name + "!</h2>";
  html += "      <p style=\"font-size: 16px; color: #d1d5db; margin-bottom: 24px; line-height: 1.5;\">";
  html += "        We are thrilled to present you with your official certificate of participation for Fusion X 1.0. ";
  html += "        Your presence and engagement helped make this event a tremendous success.";
  html += "      </p>";
  html += "      <a href=\"" + certificateUrl + "\"";
  html += "         style=\"display: inline-block; background-color: #581c87; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; margin-bottom: 16px;\">";
  html += "        🎓 Download Certificate";
  html += "      </a>";
  html += "      <p style=\"color: #9ca3af; font-size: 14px; margin-top: 16px;\">";
  html += "        If the button doesn't work, you can copy and paste this link into your browser:<br>";
  html += "        <span style=\"color: #fbbf24; word-break: break-all;\">" + certificateUrl + "</span>";
  html += "      </p>";
  html += "    </div>";
  html += "    <div style=\"text-align: center; color: #9ca3af; font-size: 14px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px;\">";
  html += "      <p>We look forward to seeing you at our future events.</p>";
  html += "      <p style=\"margin-top: 16px;\">If you have any questions, please contact us at +94 77 488 8701</p>";
  html += "    </div>";
  html += "  </div>";
  html += "</body>";
  html += "</html>";
  return html;
}
