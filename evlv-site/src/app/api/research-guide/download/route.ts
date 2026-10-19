import { readFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FILE_NAME = "EVLV-Peptide-Research-and-Wellness-Guide-2026.docx";

export async function GET() {
  const cookieStore = await cookies();
  if (cookieStore.get("evlv_guide_access")?.value !== "granted") {
    return Response.json({ error: "Enter your email on the guide page to unlock this download." }, {
      status: 401,
      headers: { "X-Robots-Tag": "noindex, nofollow, noarchive" },
    });
  }

  const file = await readFile(path.join(process.cwd(), "public", "downloads", FILE_NAME));
  return new Response(file, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${FILE_NAME}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
