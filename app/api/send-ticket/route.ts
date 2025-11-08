import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with API key
const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, faculty } = await request.json();

    console.log("HELOOOO", resend);

    if (!name || !email || !faculty) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, faculty" },
        { status: 400 }
      );
    }

    // Generate ticket URL
    const ticketUrl = `https://www.fusionx-usj.org/ticket?name=${encodeURIComponent(
      name
    )}&email=${encodeURIComponent(email)}&faculty=${encodeURIComponent(
      faculty
    )}`;

    // Generate email with ticket URL
    const emailHtml = generateTicketUrlEmail(name, email, ticketUrl, faculty);

    // Send email with ticket URL
    const { data, error } = await resend.emails.send({
      from: "tickets@fusionx-usj.org", // You'll need to verify this domain in Resend
      to: email,
      subject: "Your Fusion X 1.0 Event Ticket - Access Link",
      html: emailHtml,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Ticket access link sent successfully",
      data,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Generate email with ticket URL link
function generateTicketUrlEmail(
  name: string,
  email: string,
  ticketUrl: string,
  faculty: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your Fusion X 1.0 Ticket Access Link</title>
    </head>
    <body style="margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif; background-color: #191b1f; color: white;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #1f2227; border-radius: 12px; padding: 32px; border: 1px solid rgba(51, 56, 66, 0.2);">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 36px; font-weight: bold; color: white; margin-bottom: 8px;">Your Fusion X 1.0 Ticket</h1>
          <p style="color: #9ca3af;">Congratulations! Your registration was successful.</p>
        </div>

        <div style="text-align: center; margin-bottom: 32px;">
          <p style="font-size: 18px; color: #d1d5db; margin-bottom: 24px;">
            Click the button below to access and download your ticket:
          </p>

          <a href="${ticketUrl}"
             style="display: inline-block; background-color: #581c87; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; margin-bottom: 16px;">
            🎫 Access My Ticket
          </a>

          <p style="color: #9ca3af; font-size: 14px; margin-top: 16px;">
            Or copy and paste this link into your browser:<br>
            <span style="color: #fbbf24; word-break: break-all;">${ticketUrl}</span>
          </p>
        </div>

        <div style="background-color: #262930; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
          <h3 style="color: #fbbf24; margin-bottom: 12px;">Ticket Details:</h3>
          <p style="margin: 4px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 4px 0;"><strong>Faculty:</strong> ${faculty}</p>
        </div>

        <div style="text-align: center; color: #9ca3af; font-size: 14px;">
          <p>⚠️ <strong>Important:</strong> Keep this email safe. You'll need it to access your ticket.</p>
          <p style="margin-top: 16px;">Present your ticket at the event entrance. The QR code will be scanned for check-in.</p>
          <p style="margin-top: 16px;">If you have any questions, contact us at support@fusionx-usj.org</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
