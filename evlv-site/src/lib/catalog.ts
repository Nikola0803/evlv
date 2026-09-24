import "server-only";

import { getGoogleInventoryRows } from "./google-inventory";
import { applyInventoryRows, INVENTORY_SNAPSHOT } from "./inventory-snapshot";
import { getLiveProducts, mergeProducts } from "./product-feed";
import { getProducts, withQuantityPricing } from "./products";

export async function getCatalogProducts() {
  const [liveProducts, googleRows] = await Promise.all([getLiveProducts(), getGoogleInventoryRows()]);
  const hasLiveInventory = Boolean(googleRows?.length);
  const inventoryRows = hasLiveInventory ? googleRows! : INVENTORY_SNAPSHOT;
  return applyInventoryRows(
    mergeProducts(getProducts(), liveProducts, !hasLiveInventory),
    inventoryRows,
    true,
    !hasLiveInventory,
  ).map(withQuantityPricing);
}
