import { NextResponse } from "next/server";
import { getBase44ServerClient } from "@/lib/base44-server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, html } = body as {
      to?: string;
      subject?: string;
      html?: string;
    };

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const base44 = getBase44ServerClient();
    await base44.integrations.Core.SendEmail({
      to,
      subject,
      body: html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send request";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
