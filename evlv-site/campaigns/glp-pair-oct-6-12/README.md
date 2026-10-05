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
- Use `email.html` with `email.txt` as its plain-text fallback.

## Files

- `email.html`: responsive 720px campaign email with tracked website links.
- `email.txt`: plain-text fallback.
- `teaser.html`: October event-calendar teaser for the evening before launch.
- `teaser.txt`: teaser plain-text fallback.
- `teaser-preview.html`: local-only preview for the teaser email.
- V2 hero asset: `/public/images/email/glp-pair-event-oct-6-12-v2.png`.
- `preview.html`: local-only localhost preview with the undeployed V2 hero resolved.
- `email-v1.html`: preserved first draft; do not send this version.

## Before sending

1. Deploy the hero asset so its public URL resolves.
2. Replace `{{ unsubscribe_url }}` with the email platform's unsubscribe merge tag.
3. Enable and test the server-authoritative GLP pair discount.
4. Confirm the offer cannot stack with welcome, affiliate, quantity or wholesale pricing.
5. Complete a paid-order test on iPhone Safari and verify discount, shipping and CRM totals.
6. Send a rendering test to Gmail, Apple Mail and Outlook before the full list.

## Image-generation prompt

Built-in image generation was used to create an original EVLV GLP Series campaign hero from the current GLP1-S, GLP2-T and GLP3-R product-image references. The final V2 prompt requested a brighter, high-impact ecommerce event montage with luminous ivory and pale mint, deep emerald architecture, restrained copper accents, glossy percent-symbol decorations, exact product identity, RUO presentation, and no embedded promotional copy or human-use implications.
