import { NextResponse } from "next/server";
import { getBase44ServerClient } from "@/lib/base44-server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const base44 = getBase44ServerClient();
    const result = await base44.integrations.Core.UploadFile({ file });

    return NextResponse.json({
      name: file.name,
      url: result.file_url,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
