# EVLV GLP Pair Event — October 6–12, 2026

## Recommended send setup

- Primary subject: `Your second GLP research vial is 70% off`
- A/B subject: `EVLV Research Week begins October 6`
- Preview text: `Add two matching eligible GLP Series items. The second is automatically 70% off through October 12.`
- Sender name: `EVLV Research`
- Reply-to: `office@evlvpeptides.com`

## Two-email launch sequence

### October 5 teaser

- Recommended send: `7:30 PM Eastern`
- Subject A: `Tomorrow: EVLV October Research Event begins`
- Subject B: `The October event calendar just dropped`
- Preview: `GLP Pair Week opens October 6. See the full October schedule.`
- Use `teaser.html` with `teaser.txt` as its plain-text fallback.

### October 6 launch

- Recommended send: `9:15 AM Eastern`
- Subject A: `Your second GLP research vial is 70% off`
- Subject B: `EVLV GLP Research Week is live`
- Preview: `Add two matching eligible GLP Series items. The second is automatically 70% off through October 12.`
- In Omnisend, paste `email.html` into the HTML field and paste the contents of `email-styles.css` into the separate Styles field. Use `email.txt` as its plain-text fallback.

## October 7 mid-sale surprise follow-up

- Recommended send: `5:45 PM Eastern`
- Subject A: `Surprise: shipping is on us at $175`
- Subject B: `Mid-sale unlock: 70% off the second + free shipping`
- Preview: `The GLP Pair Event just got better. Free U.S. shipping now unlocks at $175 after discounts.`
- Sender name: `EVLV Research`
- Sender email: `office@evlvpeptides.com`
- Campaign name: `GLP Pair Event | Mid-Sale Shipping Surprise | Oct 7`
- Language: `English`
- Paste only `mid-sale.html` into one Omnisend Custom HTML block. Every email style is inline; the Styles field stays empty. Use `mid-sale.txt` as the plain-text fallback.
- The email points directly to the GLP catalogue and uses `age_verified=1` for a reduced-friction campaign landing.

## Files

- `email.html`: Omnisend-ready, body-only, fluid 600px campaign HTML with tracked website links. It intentionally contains no `<style>` element.
- `email-styles.css`: scoped responsive CSS for Omnisend's separate Styles field.
- `email.txt`: plain-text fallback.
- `teaser.html`: October event-calendar teaser for the evening before launch.
- `teaser.txt`: teaser plain-text fallback.
- `teaser-preview.html`: local-only preview for the teaser email.
- V2 hero asset: `/public/images/email/glp-pair-event-oct-6-12-v2.png`.
- `preview.html`: local-only localhost preview with the undeployed V2 hero resolved.
- `email-v1.html`: preserved first draft; do not send this version.
- `mid-sale.html`: self-contained Omnisend-ready body-only mid-sale surprise follow-up with inline styling and no `<style>` element.
- `mid-sale.txt`: plain-text fallback for the mid-sale email.
- `mid-sale-preview.html`: local desktop/mobile preview harness for the mid-sale email.
- Mid-sale shipping artwork: `/public/images/email/glp-pair-oct-6-12-mid-sale/surprise-shipping.jpg`.

## Omnisend import

1. Start with a blank layout or delete every existing content/image block.
2. Add one Custom HTML block and replace its contents completely with `email.html`.
3. Paste `email-styles.css` into Omnisend's Styles field without adding `<style>` tags.
4. The template intentionally shows the EVLV logo followed by one GLP collection hero. If two identical collection images appear, remove the extra Omnisend image block outside the Custom HTML block.

For the October 7 mid-sale follow-up, paste only `mid-sale.html` into one blank Custom HTML block. Do not add CSS to Omnisend's Styles field.

## Before sending

1. Deploy the hero asset so its public URL resolves.
2. Replace `{{ unsubscribe_url }}` with the email platform's unsubscribe merge tag.
3. Enable and test the server-authoritative GLP pair discount.
4. Confirm the offer cannot stack with welcome, affiliate, quantity or wholesale pricing.
5. Complete a paid-order test on iPhone Safari and verify discount, shipping and CRM totals.
6. Send a rendering test to Gmail, Apple Mail and Outlook before the full list.
7. Do not send the mid-sale follow-up until the storefront and server-authoritative checkout both use the temporary $175 post-discount shipping threshold.

## Image-generation prompt

Built-in image generation was used to create an original EVLV GLP Series campaign hero from the current GLP1-S, GLP2-T and GLP3-R product-image references. The final V2 prompt requested a brighter, high-impact ecommerce event montage with luminous ivory and pale mint, deep emerald architecture, restrained copper accents, glossy percent-symbol decorations, exact product identity, RUO presentation, and no embedded promotional copy or human-use implications.

The mid-sale follow-up uses the existing label-accurate GLP product photography and a new text-free shipping-surprise image generated in EVLV's ivory, emerald, mint, and copper palette. The new artwork deliberately contains no vials, labels, or promotional claims so product identity stays exact in the real catalogue images.
