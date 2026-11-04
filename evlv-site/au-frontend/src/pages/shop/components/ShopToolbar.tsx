type Props = {
  categories: { slug: string; label: string }[];
  active: string;
  onCategory: (slug: string) => void;
  query: string;
  onQuery: (value: string) => void;
  sort: string;
  onSort: (value: string) => void;
  count: number;
  total: number;
};

export default function ShopToolbar({
  categories,
  active,
  onCategory,
  query,
  onQuery,
  sort,
  onSort,
  count,
  total,
}: Props) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => onCategory(c.slug)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium border cursor-pointer transition-colors ${
                active === c.slug
                  ? 'bg-secondary-900 text-background-50 border-secondary-900'
                  : 'border-primary-800/15 text-foreground-700 hover:bg-background-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto">
          <div className="relative w-full sm:w-[240px]">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm flex items-center justify-center w-4 h-4">
              <i className="ri-search-line" />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Search products"
              aria-label="Search products"
              className="w-full box-border rounded-full bg-background-50 border border-primary-800/15 pl-10 pr-4 py-2.5 text-sm text-foreground-900 outline-none placeholder:text-foreground-400 focus:border-primary-500"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value)}
            aria-label="Sort products"
            className="w-full sm:w-[190px] box-border rounded-full bg-background-50 border border-primary-800/15 px-4 py-2.5 text-sm text-foreground-800 outline-none focus:border-primary-500 cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="az">Name: A to Z</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-primary-800/10 pt-4">
        <p className="text-xs text-foreground-600">
          Showing <span className="font-semibold text-foreground-900">{count}</span> of {total} products
        </p>
        <p className="text-xs text-foreground-500">All prices in AUD · COA badge shown only where a matching report exists</p>
      </div>
    </div>
  );
}