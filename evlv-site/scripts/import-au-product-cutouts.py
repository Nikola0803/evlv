"""Import EVLV Australia's transparent vial photography from the supplied ZIP.

Source filenames are production/label codes. Storefront filenames use the
same product slugs as the CRM and catalog so the mapping is deterministic.
"""

from __future__ import annotations

import io
import sys
import zipfile
from pathlib import Path

from PIL import Image


SOURCE_TO_SLUG = {
    "10AD AOD-9604 10mg.png": "aod-9604-10mg",
    "BB10 BPC-TB-500 Blend 10mg.png": "bpc-tb-500-blend-10mg",
    "BB20 BPC-TB-500 Blend 20mg.png": "bpc-tb-500-blend-20mg",
    "BPC5 BPC-157 5mg.png": "bpc-157-5mg",
    "BPC10 BPC-157 10mg.png": "bpc-157-10mg",
    "BPC20 BPC-157 20mg.png": "bpc-157-20mg",
    "CART20 Cartalax 20mg.png": "cartalax-20mg",
    "CP10 CJC-Ipa Blend 10mg.png": "cjc-ipa-blend-10mg",
    "CP20 CJC-Ipa Blend 20mg.png": "cjc-ipa-blend-20mg",
    "GHK50 GHK-CU 50mg.png": "ghk-cu-50mg",
    "GW70 GLOW Blend 70mg.png": "glow-70mg",
    "HCG2 HCG - 2k 2000iu.png": "hcg-2000iu",
    "HCG5 HCG - 5k 5000iu.png": "hcg-5000iu",
    "IGF1 IGF-1LR3 1mg.png": "igf-1-lr3-1mg",
    "KPV10 KPV 10mg.png": "kpv-10mg",
    "KPVo500 KPV Oral 500mcg.png": "kpv-oral-500mcg",
    "KW80 KLOW Blend 80mg.png": "klow-80mg",
    "MOT10 MOTS-C 10mg.png": "mots-c-10mg",
    "MOT40 MOTS-C 40mg.png": "mots-c-40mg",
    "MT-2 Melanatan II 10mg.png": "melanotan-ii-10mg",
    "NAD500 NAD- 500mg.png": "nad-500mg",
    "OXY10 Oxytocin 10mg.png": "oxytocin-10mg",
    "PT10 PT-141 10mg.png": "pt-141-10mg",
    "RET10 Retatrutide 10mg.png": "evlv-3-10mg",
    "RET15 Retatrutide 15mg.png": "evlv-3-15mg",
    "RET30 Retatrutide 30mg.png": "evlv-3-30mg",
    "RET60 Retatrutide 60mg.png": "evlv-3-60mg",
    "SEM5 Semaglutide 5mg.png": "evlv-1-5mg",
    "SEM10 Semaglutide 10mg.png": "evlv-1-10mg",
    "SLK10 Selank 10mg.png": "selank-10mg",
    "SMX10 Semax 10mg.png": "semax-10mg",
    "SS3110 SS-31 10mg.png": "ss-31-10mg",
    "TA15 Thymosin Alpha-1 5mg.png": "thymosin-alpha-1-5mg",
    "TB5 TB-500 5mg.png": "tb-500-5mg",
    "TB10 TB-500 10mg.png": "tb-500-10mg",
    "TB20 TB-500 20mg.png": "tb-500-20mg",
    "TES10 Tesamorelin 10mg.png": "tesamorelin-10mg",
    "TES20 Tesamorelin 20mg.png": "tesamorelin-20mg",
    "TIR10 Tirzepatide 10mg.png": "evlv-2-10mg",
    "TIR15 Tirzepatide 15mg.png": "evlv-2-15mg",
    "TIR30 Tirzepatide 30mg.png": "evlv-2-30mg",
    "TIR60 Tirzepatide 60mg.png": "evlv-2-60mg",
}


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: import-au-product-cutouts.py <products-no-bg.zip>", file=sys.stderr)
        return 2

    archive_path = Path(sys.argv[1]).resolve()
    output_dir = Path(__file__).resolve().parents[1] / "public" / "images" / "products" / "au-cutouts"
    output_dir.mkdir(parents=True, exist_ok=True)

    with zipfile.ZipFile(archive_path) as archive:
        archive_names = set(archive.namelist())
        missing = sorted(set(SOURCE_TO_SLUG) - archive_names)
        if missing:
            print(f"Archive is missing mapped files: {', '.join(missing)}", file=sys.stderr)
            return 1

        for source_name, slug in SOURCE_TO_SLUG.items():
            with Image.open(io.BytesIO(archive.read(source_name))) as source:
                image = source.convert("RGBA")
                image.thumbnail((1200, 1800), Image.Resampling.LANCZOS)
                output_path = output_dir / f"{slug}.webp"
                image.save(output_path, "WEBP", quality=92, method=6, exact=True)
                print(f"{source_name} -> {output_path.name} ({image.width}x{image.height})")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
