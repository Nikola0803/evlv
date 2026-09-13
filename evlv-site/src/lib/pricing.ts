/**
 * Anchor-pricing helper: our listed `product.price` (and any derived pack
 * price) IS the real, current selling price -- it already reflects our
 * standing ~20% discount. For display only, we compute a crossed-out
 * "was" price above it so the discount is visible as a CRO anchor, the
 * same way competitors show an inflated strikethrough price next to the
 * real one. This never changes what anything actually costs or charges.
 */
const DISCOUNT_FRACTION = 0.2; // our real prices already reflect a ~20% discount

export function getAnchorPrice(currentPrice: number): number {
  return currentPrice / (1 - DISCOUNT_FRACTION);
}
