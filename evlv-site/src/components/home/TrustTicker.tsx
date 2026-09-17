const ITEMS = ["Free Shipping $200+", "99%+ HPLC Purity", "Research Use Only", "Not for Human Consumption", "USA Made", "Batch COA Included"];

// One continuous marquee row, duplicated once so the CSS animation can
// scroll a full width and loop seamlessly (see .animate-ticker in
// globals.css). "USA Made" gets the copper dot like every other item, but
// its own text is bolded/colored so it reads as the standout claim on
// this row per the "highlight Made in USA" ask -- without needing a
// second, visually-competing ticker just for one item.
function TickerRow({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="flex flex-shrink-0 items-center" aria-hidden={ariaHidden}>
      {ITEMS.map((item, i) => (
        <span key={i} className="mx-8 inline-flex items-center whitespace-nowrap">
          <span className="mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-copper" />
          <span
            className={`font-sans text-[10px] uppercase tracking-widest ${
              item === "USA Made" ? "font-semibold text-copper-dark" : "font-normal text-charcoal"
            }`}
          >
            {item}
          </span>
        </span>
      ))}
    </div>
  );
}

export function TrustTicker() {
  return (
    <div className="relative z-40 w-full overflow-hidden border-b border-stone bg-ivory-soft py-2.5">
      <div className="flex animate-ticker">
        <TickerRow />
        <TickerRow ariaHidden />
      </div>
    </div>
  );
}
