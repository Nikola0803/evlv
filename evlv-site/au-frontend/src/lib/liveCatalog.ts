import { shopProducts } from '@/mocks/shop';

type ApiProduct = {
  slug: string;
  name: string;
  price: number;
  image?: string;
  purity?: string;
  categoryLabel?: string;
  shortDescription?: string;
  inStock?: boolean;
};

const cutoutSlugs = new Set([
  'aod-9604-10mg', 'bpc-tb-500-blend-10mg', 'bpc-tb-500-blend-20mg',
  'bpc-157-5mg', 'bpc-157-10mg', 'bpc-157-20mg', 'cartalax-20mg',
  'cjc-ipa-blend-10mg', 'cjc-ipa-blend-20mg', 'ghk-cu-50mg', 'glow-70mg',
  'hcg-2000iu', 'hcg-5000iu', 'igf-1-lr3-1mg', 'kpv-10mg', 'kpv-oral-500mcg',
  'klow-80mg', 'mots-c-10mg', 'mots-c-40mg', 'melanotan-ii-10mg', 'nad-500mg',
  'oxytocin-10mg', 'pt-141-10mg', 'evlv-3-10mg', 'evlv-3-15mg', 'evlv-3-30mg',
  'evlv-3-60mg', 'evlv-1-5mg', 'evlv-1-10mg', 'selank-10mg', 'semax-10mg',
  'ss-31-10mg', 'thymosin-alpha-1-5mg', 'tb-500-5mg', 'tb-500-10mg',
  'tb-500-20mg', 'tesamorelin-10mg', 'tesamorelin-20mg', 'evlv-2-10mg',
  'evlv-2-15mg', 'evlv-2-30mg', 'evlv-2-60mg',
]);

function splitName(value: string) {
  const match = value.trim().match(/^(.*?)(?:\s+)(\d+(?:\.\d+)?\s*(?:MG|MCG|IU|ML))$/i);
  return match ? { name: match[1], size: match[2].replace(/(\d)(MG|MCG|IU|ML)$/i, '$1 $2').toLowerCase() } : { name: value, size: '' };
}

function categoryFor(product: ApiProduct) {
  const value = `${product.slug} ${product.name} ${product.categoryLabel ?? ''}`.toLowerCase();
  if (/blend|glow|klow|cjc/.test(value)) return 'blends';
  if (/semaglutide|tirzepatide|retatrutide|evlv-[123]|aod/.test(value)) return 'metabolic';
  if (/mots|nad|ss-31|epitalon|igf/.test(value)) return 'longevity';
  return 'peptides';
}

export async function hydrateShopProducts() {
  try {
    const response = await fetch('/api/catalog', { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Catalog request failed (${response.status})`);
    const payload = (await response.json()) as { products?: ApiProduct[] };
    if (!Array.isArray(payload.products) || payload.products.length === 0) return;

    const live = payload.products.map((product) => {
      const title = splitName(product.name);
      return {
        slug: product.slug,
        name: title.name,
        size: title.size,
        price: product.price,
        category: categoryFor(product),
        summary: product.shortDescription || `${title.name} is available through the EVLV Australia catalogue.`,
        purity: product.purity || '',
        coa: Boolean(product.purity),
        image: cutoutSlugs.has(product.slug)
          ? `/images/products/au-cutouts/${product.slug}.webp`
          : product.image || '/images/products/vial-placeholder.png',
        inStock: product.inStock !== false,
      };
    });
    shopProducts.splice(0, shopProducts.length, ...live);
  } catch (error) {
    console.error('Using the reviewed fallback catalogue because the AU CRM feed is unavailable.', error);
  }
}
