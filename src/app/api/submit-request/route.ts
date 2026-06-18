import { NextResponse } from "next/server";
import { Resend } from "resend";

// Resend testing mode (onboarding@resend.dev) only delivers to your Resend account email.
const CONTACT_EMAIL = (
  process.env.CONTACT_EMAIL ?? "hasnibachiri25@gmail.com"
).toLowerCase();
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "HASNI bachiri <onboarding@resend.dev>";
const MAX_ATTACHMENT_SIZE = 4 * 1024 * 1024;

type UploadedFileRef = { name: string; url: string };

type SubmitPayload = {
  companyName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  productName?: string;
  quantity?: string;
  specifications?: string;
  description?: string;
  notes?: string;
  images?: UploadedFileRef[];
  documents?: UploadedFileRef[];
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;width:35%;">${escapeHtml(label)}</td>
    <td style="padding:10px;border-bottom:1px solid #eee;white-space:pre-wrap;">${escapeHtml(value || "—")}</td>
  </tr>`;
}

function fileLinks(title: string, files: UploadedFileRef[]) {
  if (!files.length) return "";
  return `
    <p style="margin-top:16px;font-weight:bold;">${escapeHtml(title)}</p>
    <ul style="padding-left:18px;margin:8px 0;">
      ${files
        .map(
          (file) =>
            `<li style="margin-bottom:6px;"><a href="${escapeHtml(file.url)}" style="color:#b87333;">${escapeHtml(file.name)}</a></li>`,
        )
        .join("")}
    </ul>
  `;
}

async function buildAttachments(files: UploadedFileRef[]) {
  const attachments: { filename: string; content: Buffer }[] = [];

  for (const file of files) {
    try {
      const response = await fetch(file.url);
      if (!response.ok) continue;

      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length <= MAX_ATTACHMENT_SIZE) {
        attachments.push({ filename: file.name, content: buffer });
      }
    } catch {
      // Link is still included in the email body.
    }
  }

  return attachments;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Email is not configured. Add RESEND_API_KEY in Vercel Environment Variables.",
      },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as SubmitPayload;

    const companyName = String(body.companyName ?? "");
    const contactPerson = String(body.contactPerson ?? "");
    const email = String(body.email ?? "");
    const phone = String(body.phone ?? "");
    const productName = String(body.productName ?? "");
    const quantity = String(body.quantity ?? "");
    const specifications = String(body.specifications ?? "");
    const description = String(body.description ?? "");
    const notes = String(body.notes ?? "");
    const images = Array.isArray(body.images) ? body.images : [];
    const documents = Array.isArray(body.documents) ? body.documents : [];

    if (!companyName || !contactPerson || !email || !productName) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    const html = `
      <h2>New Product Sourcing Request</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px;">
        ${row("Company Name", companyName)}
        ${row("Contact Person", contactPerson)}
        ${row("Email", email)}
        ${row("Phone", phone)}
        ${row("Product Name", productName)}
        ${row("Quantity", quantity)}
        ${row("Specifications", specifications)}
        ${row("Description", description)}
        ${row("Additional Notes", notes)}
      </table>
      ${fileLinks("Product images (download links)", images)}
      ${fileLinks("Supporting documents (download links)", documents)}
      <p style="margin-top:20px;font-size:12px;color:#666;">Reply to this email to contact the customer directly.</p>
    `.trim();

    const allFiles = [...images, ...documents];
    const attachments = await buildAttachments(allFiles);

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Sourcing Request: ${productName} — ${companyName}`,
      html,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      const message = error.message.includes("only send testing emails")
        ? "Email is in Resend testing mode. Set CONTACT_EMAIL to hasnibachiri25@gmail.com in Vercel, or verify a domain at resend.com/domains."
        : error.message;
      return NextResponse.json({ error: message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send request.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
