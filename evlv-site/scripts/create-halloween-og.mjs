import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const background = path.join(root, "public/images/social/halloween-bogo-og-background-v1.png");
const logo = path.join(root, "public/logo/evlv-logo-light.png");
const output = path.join(root, "public/images/social/evlv-halloween-bogo-og-v1.jpg");

const copy = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#130b16" stop-opacity="0.92"/>
        <stop offset="0.62" stop-color="#29132e" stop-opacity="0.54"/>
        <stop offset="1" stop-color="#160b17" stop-opacity="0.14"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#shade)"/>
    <rect x="28" y="28" width="1144" height="574" rx="22" fill="none" stroke="#e46627" stroke-opacity="0.55" stroke-width="2"/>
    <text x="70" y="156" fill="#f29a58" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="700" letter-spacing="4">EVLV HALLOWEEN EVENT</text>
    <text x="66" y="250" fill="#fffaf4" font-family="Arial, Helvetica, sans-serif" font-size="82" font-weight="800" letter-spacing="-3">BUY 1,</text>
    <text x="66" y="335" fill="#f07832" font-family="Arial, Helvetica, sans-serif" font-size="82" font-weight="800" letter-spacing="-3">GET 1 FREE</text>
    <text x="70" y="390" fill="#fffaf4" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700" letter-spacing="2">UNLIMITED MATCHING PAIRS</text>
    <line x1="70" y1="422" x2="545" y2="422" stroke="#f07832" stroke-width="2"/>
    <text x="70" y="463" fill="#f4e8df" font-family="Arial, Helvetica, sans-serif" font-size="21">Automatic at checkout  |  Free shipping at $300</text>
    <text x="70" y="510" fill="#cbbbc9" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" letter-spacing="2">RESEARCH USE ONLY  |  OCT 26 - 31</text>
  </svg>
`);

const logoBuffer = await sharp(logo).resize({ width: 205 }).png().toBuffer();

await sharp(background)
  .resize(1200, 630, { fit: "cover" })
  .composite([
    { input: copy, left: 0, top: 0 },
    { input: logoBuffer, left: 70, top: 61 },
  ])
  .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
  .toFile(output);

console.log(output);
