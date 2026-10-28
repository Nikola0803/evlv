import QRCode from "qrcode";
import { getCoaEntries } from "@/lib/coa-data";
import { getCoaLotId } from "@/lib/coa-lots";

const SITE_URL = "https://www.evlvpeptides.com";

export async function GET(_request: Request, { params }: { params: Promise<{ lot: string }> }) {
  const { lot } = await params;
  const entries = await getCoaEntries();
  const coa = entries.find((entry) => getCoaLotId(entry) === lot);
  if (!coa) return new Response("Not found", { status: 404 });

  const svg = await QRCode.toString(`${SITE_URL}/coas/${lot}`, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 2,
    color: { dark: "#0b2f2c", light: "#ffffff" },
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Disposition": `inline; filename="evlv-${lot}-coa-qr.svg"`,
    },
  });
}
