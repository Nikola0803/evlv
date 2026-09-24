import "server-only";

import { getGoogleInventoryRows } from "./google-inventory";
import { applyInventoryRows, INVENTORY_SNAPSHOT } from "./inventory-snapshot";
import { getLiveProducts, mergeProducts } from "./product-feed";
import { getProducts, withQuantityPricing } from "./products";

export async function getCatalogProducts() {
  const [liveProducts, googleRows] = await Promise.all([getLiveProducts(), getGoogleInventoryRows()]);
  const inventoryRows = googleRows?.length ? googleRows : INVENTORY_SNAPSHOT;
  return applyInventoryRows(mergeProducts(getProducts(), liveProducts), inventoryRows, true).map(withQuantityPricing);
}
