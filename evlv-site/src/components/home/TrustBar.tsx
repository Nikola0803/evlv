const ITEMS = [
  { title: "Research Use Only", subtitle: "Clearly labeled, every SKU" },
  { title: "Third-Party Tested", subtitle: "Every batch, no exceptions" },
  { title: "Premium Quality", subtitle: "99%+ verified purity" },
  { title: "Performance Driven", subtitle: "Precision. Purity. Potential." },
];

export function TrustBar() {
  return (
    <section className="border-y border-stone bg-sage-deep">
      <div className="container-altr grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4 md:gap-0">
        {ITEMS.map((item, i) => (
          <div key={item.title} className={`px-4 text-center ${i > 0 ? "md:border-l md:border-ivory/15" : ""}`}>
            <p className="font-display text-sm font-medium text-ivory">{item.title}</p>
            <p className="mt-1 text-[11px] text-ivory/65">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
