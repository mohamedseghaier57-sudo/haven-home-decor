import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCard } from "@/components/site/ProductCard";
import {
  categories,
  collections,
  colors,
  materials,
  products,
  sizes,
  styles,
  type Product,
} from "@/lib/catalog";

type Search = {
  q?: string;
  category?: string;
  collection?: string;
  sort?: string;
};

export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);
    const out: Search = {};
    const q = str(search.q);
    const category = str(search.category);
    const collection = str(search.collection);
    const sort = str(search.sort);
    if (q) out.q = q;
    if (category) out.category = category;
    if (collection) out.collection = collection;
    if (sort) out.sort = sort;
    return out;
  },
  head: () => ({
    meta: [
      { title: "Wholesale Catalogue — Frames, Mirrors & Wall Décor | Maison Cadre" },
      {
        name: "description",
        content:
          "Browse the full Maison Cadre trade catalogue: photo frames, mirrors, posters and wall décor with wholesale prices, MOQs and recommended retail prices.",
      },
      { property: "og:title", content: "Wholesale Catalogue | Maison Cadre" },
      {
        property: "og:description",
        content: "Filter by material, colour, size, style and minimum order quantity.",
      },
    ],
  }),
  component: Catalogue,
});

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "best", label: "Best selling" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

function Catalogue() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [price, setPrice] = useState<number[]>([40]);
  const [selMaterials, setMaterials] = useState<string[]>([]);
  const [selColors, setColors] = useState<string[]>([]);
  const [selSizes, setSizes] = useState<string[]>([]);
  const [selStyles, setStyles] = useState<string[]>([]);
  const [inStockOnly, setInStock] = useState(false);
  const [maxMoq, setMaxMoq] = useState<number[]>([12]);
  const [minRating, setMinRating] = useState(0);

  const results = useMemo(() => {
    let list: Product[] = [...products];
    if (search.q) {
      const t = search.q.toLowerCase();
      list = list.filter((p) =>
        [p.name, p.ref, p.brand, p.category, p.material, p.color, p.style]
          .join(" ")
          .toLowerCase()
          .includes(t),
      );
    }
    if (search.category) {
      if (search.category === "new-arrivals") list = list.filter((p) => p.isNew);
      else list = list.filter((p) => p.categorySlug === search.category);
    }
    if (search.collection) list = list.filter((p) => p.collections.includes(search.collection!));
    if (selMaterials.length) list = list.filter((p) => selMaterials.includes(p.material));
    if (selColors.length) list = list.filter((p) => selColors.includes(p.color));
    if (selSizes.length) list = list.filter((p) => selSizes.includes(p.size));
    if (selStyles.length) list = list.filter((p) => selStyles.includes(p.style));
    if (inStockOnly) list = list.filter((p) => p.stock > 0);
    list = list.filter((p) => p.wholesale <= price[0]);
    list = list.filter((p) => p.moq <= maxMoq[0]);
    if (minRating) list = list.filter((p) => p.rating >= minRating);

    switch (search.sort) {
      case "newest":
        return [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
      case "best":
        return [...list].sort((a, b) => Number(!!b.bestSeller) - Number(!!a.bestSeller));
      case "price-asc":
        return [...list].sort((a, b) => a.wholesale - b.wholesale);
      case "price-desc":
        return [...list].sort((a, b) => b.wholesale - a.wholesale);
      default:
        return list;
    }
  }, [search, selMaterials, selColors, selSizes, selStyles, inStockOnly, price, maxMoq, minRating]);

  const activeCategory = categories.find((c) => c.slug === search.category);
  const activeCollection = collections.find((c) => c.slug === search.collection);

  const filters = (
    <div className="space-y-2">
      <Accordion type="multiple" defaultValue={["category", "price", "material", "moq"]}>
        <AccordionItem value="category">
          <AccordionTrigger className="text-sm">Category</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/products"
                  search={(prev) => ({ ...prev, category: undefined })}
                  className="text-muted-foreground hover:text-foreground"
                >
                  All categories
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/products"
                    search={(prev) => ({ ...prev, category: c.slug })}
                    className={
                      search.category === c.slug
                        ? "font-medium text-clay"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm">Wholesale price</AccordionTrigger>
          <AccordionContent className="pt-2">
            <Slider value={price} onValueChange={setPrice} min={4} max={40} step={1} />
            <p className="mt-2 text-xs text-muted-foreground">Up to €{price[0]}.00 per unit</p>
          </AccordionContent>
        </AccordionItem>

        <FilterGroup
          id="material"
          label="Material"
          options={materials}
          selected={selMaterials}
          onToggle={setMaterials}
        />
        <FilterGroup
          id="color"
          label="Colour"
          options={colors}
          selected={selColors}
          onToggle={setColors}
        />
        <FilterGroup id="size" label="Size" options={sizes} selected={selSizes} onToggle={setSizes} />
        <FilterGroup
          id="style"
          label="Style"
          options={styles}
          selected={selStyles}
          onToggle={setStyles}
        />

        <AccordionItem value="moq">
          <AccordionTrigger className="text-sm">Minimum order quantity</AccordionTrigger>
          <AccordionContent className="pt-2">
            <Slider value={maxMoq} onValueChange={setMaxMoq} min={4} max={12} step={1} />
            <p className="mt-2 text-xs text-muted-foreground">MOQ of {maxMoq[0]} units or less</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger className="text-sm">Availability & rating</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-2">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox checked={inStockOnly} onCheckedChange={(v) => setInStock(Boolean(v))} />
              In stock only
            </label>
            <div className="flex flex-wrap gap-2">
              {[0, 4, 4.5].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setMinRating(r)}
                  className={`border px-3 py-1 text-xs ${
                    minRating === r ? "border-clay text-clay" : "border-border text-muted-foreground"
                  }`}
                >
                  {r === 0 ? "Any" : `${r}★ +`}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8">
      <nav className="mb-4 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>{" "}
        / <span>Catalogue</span>
        {activeCategory && ` / ${activeCategory.name}`}
      </nav>

      <div className="mb-8 max-w-2xl space-y-2">
        <h1 className="font-display text-3xl sm:text-4xl">
          {search.q
            ? `Results for “${search.q}”`
            : (activeCategory?.name ?? activeCollection?.name ?? "Wholesale catalogue")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {activeCollection?.copy ??
            "Trade prices shown excluding VAT. Tiered discounts apply automatically from 10 units."}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-44">
            <p className="eyebrow pb-2">Filters</p>
            {filters}
          </div>
        </aside>

        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3 border-y border-border py-3">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground">{results.length}</span> products
            </p>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 lg:hidden">
                  <SlidersHorizontal className="size-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto p-6">
                <p className="eyebrow pb-3">Filters</p>
                {filters}
              </SheetContent>
            </Sheet>

            <div className="ml-auto flex items-center gap-3">
              <label className="hidden text-xs text-muted-foreground sm:block">Sort by</label>
              <select
                value={search.sort ?? "featured"}
                onChange={(e) =>
                  navigate({ search: (prev) => ({ ...prev, sort: e.target.value }) })
                }
                className="border border-border bg-card px-3 py-1.5 text-sm outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <div className="hidden border border-border sm:flex">
                <button
                  type="button"
                  aria-label="Grid view"
                  onClick={() => setLayout("grid")}
                  className={`grid size-8 place-items-center ${layout === "grid" ? "bg-secondary" : ""}`}
                >
                  <LayoutGrid className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  onClick={() => setLayout("list")}
                  className={`grid size-8 place-items-center ${layout === "list" ? "bg-secondary" : ""}`}
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {(search.q || search.category || search.collection) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {[
                search.q && { key: "q", label: search.q },
                search.category && { key: "category", label: activeCategory?.name ?? search.category },
                search.collection && {
                  key: "collection",
                  label: activeCollection?.name ?? search.collection,
                },
              ]
                .filter(Boolean)
                .map((chip) => {
                  const c = chip as { key: string; label: string };
                  return (
                    <Link
                      key={c.key}
                      to="/products"
                      search={(prev) => ({ ...prev, [c.key]: undefined })}
                      className="flex items-center gap-1 border border-border px-3 py-1 text-xs"
                    >
                      {c.label} <X className="size-3" />
                    </Link>
                  );
                })}
            </div>
          )}

          {results.length === 0 ? (
            <div className="border border-border p-16 text-center">
              <p className="font-display text-lg">No products match these filters</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try widening the price range or clearing a filter.
              </p>
            </div>
          ) : (
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-2 gap-3 xl:grid-cols-3"
                  : "flex flex-col gap-3"
              }
            >
              {results.map((p) => (
                <ProductCard key={p.id} product={p} layout={layout} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({
  id,
  label,
  options,
  selected,
  onToggle,
}: {
  id: string;
  label: string;
  options: string[];
  selected: string[];
  onToggle: (v: string[]) => void;
}) {
  return (
    <AccordionItem value={id}>
      <AccordionTrigger className="text-sm">{label}</AccordionTrigger>
      <AccordionContent className="space-y-2 pt-1">
        {options.map((o) => (
          <label key={o} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox
              checked={selected.includes(o)}
              onCheckedChange={(v) =>
                onToggle(v ? [...selected, o] : selected.filter((s) => s !== o))
              }
            />
            {o}
          </label>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
