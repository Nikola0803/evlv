export type MarketId = "US" | "AU";

export interface MarketConfig {
  id: MarketId;
  hostname: string;
  siteUrl: string;
  locale: "en-US" | "en-AU";
  currency: "USD" | "AUD";
  country: "US" | "AU";
  countryName: string;
  paymentProvider: "manual" | "niftipay";
  fulfillmentLabel: string;
  legalEntity: string;
  supportEmail: string;
}

const MARKETS: Record<MarketId, MarketConfig> = {
  US: {
    id: "US",
    hostname: "www.evlvpeptides.com",
    siteUrl: "https://www.evlvpeptides.com",
    locale: "en-US",
    currency: "USD",
    country: "US",
    countryName: "United States",
    paymentProvider: "manual",
    fulfillmentLabel: "U.S. fulfillment",
    legalEntity: "EVLV Research",
    supportEmail: "office@evlvpeptides.com",
  },
  AU: {
    id: "AU",
    hostname: "www.evlvpeptides.com.au",
    siteUrl: "https://www.evlvpeptides.com.au",
    locale: "en-AU",
    currency: "AUD",
    country: "AU",
    countryName: "Australia",
    paymentProvider: "niftipay",
    fulfillmentLabel: "Australian fulfillment",
    legalEntity: process.env.AU_LEGAL_ENTITY || "EVLV Australia",
    supportEmail: process.env.AU_SUPPORT_EMAIL || "support@evlvpeptides.com.au",
  },
};

export function getMarketId(): MarketId {
  return process.env.NEXT_PUBLIC_SITE_MARKET?.toUpperCase() === "AU" ? "AU" : "US";
}

export function getMarket(): MarketConfig {
  return MARKETS[getMarketId()];
}

export function isAustralianMarket() {
  return getMarketId() === "AU";
}
