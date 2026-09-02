import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Heart, Package, RotateCcw, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stars } from "@/components/site/Stars";
import { QtyStepper } from "@/components/site/QtyStepper";
import { ProductCard } from "@/components/site/ProductCard";
import { bySlug, eur, margin, products, tierPrice } from "@/lib/catalog";
import { useShop } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = bySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Product unavailable | Maison Cadre" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — Wholesale ${eur(p.wholesale)} | Maison Cadre` },
        {
          name: "description",
          content: `${p.name} (${p.ref}) in ${p.material}. Wholesale ${eur(p.wholesale)}, RRP ${eur(p.rrp)}, MOQ ${p.moq} units. Tiered trade pricing.`,
        },
        { property: "og:title", content: `${p.name} | Maison Cadre` },
        { property: "og:description", content: p.description.slice(0, 150) },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const [qty, setQty] = useState(product.moq);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const unit = tierPrice(product, qty);
  const wished = wishlist.includes(product.slug);
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/products" className="hover:text-foreground">
          Catalogue
        </Link>{" "}
        /{" "}
        <Link
          to="/products"
          search={{ category: product.categorySlug }}
          className="hover:text-foreground"
        >
          {product.category}
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-3">
          <div
            className="media-frame aspect-square cursor-zoom-in border border-border"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <img
              src={product.images[active]}
              alt={product.name}
              width={900}
              height={900}
              className={cn(
                "size-full object-cover transition-transform duration-500",
                zoom && "scale-150",
              )}
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "aspect-square overflow-hidden border",
                  i === active ? "border-clay" : "border-border",
                )}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${i + 1}`}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="eyebrow">{product.brand}</p>
            <h1 className="font-display text-3xl sm:text-4xl">{product.name}</h1>
            <p className="text-sm text-muted-foreground">Ref. {product.ref}</p>
            <Stars rating={product.rating} reviews={product.reviews} />
          </div>

          <div className="grid grid-cols-2 gap-4 border-y border-border py-5">
            <div>
              <p className="eyebrow">Wholesale (excl. VAT)</p>
              <p className="font-display text-3xl">{eur(unit)}</p>
              {unit < product.wholesale && (
                <p className="text-xs text-olive">Volume price applied at {qty} units</p>
              )}
            </div>
            <div>
              <p className="eyebrow">Recommended retail</p>
              <p className="font-display text-3xl">{eur(product.rrp)}</p>
              <p className="text-xs text-muted-foreground">{margin(product)}% gross margin</p>
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <QtyStepper
              label={`Quantity · MOQ ${product.moq}`}
              value={qty}
              step={product.moq}
              min={1}
              onChange={setQty}
            />
            <p className="pb-2 text-sm">
              {product.stock > 200 ? (
                <span className="flex items-center gap-1 text-olive">
                  <Check className="size-4" /> In stock — {product.stock.toLocaleString()} units
                </span>
              ) : (
                <span className="text-clay">Low stock — {product.stock} units</span>
              )}
            </p>
          </div>

          {qty < product.moq && (
            <p className="border border-clay/40 bg-clay/10 p-3 text-sm text-clay">
              Minimum order quantity for this reference is {product.moq} units.
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="flex-1"
              disabled={qty < product.moq}
              onClick={() => {
                addToCart(product.slug, qty);
                toast.success(`${qty} × ${product.name} added to cart`);
              }}
            >
              Add to cart · {eur(unit * qty)}
            </Button>
            <Button size="lg" variant="outline" asChild className="flex-1">
              <Link to="/checkout">Buy now</Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => toggleWishlist(product.slug)}
              aria-label="Add to wishlist"
            >
              <Heart className={cn("size-5", wished && "fill-clay text-clay")} />
            </Button>
          </div>

          <div>
            <p className="eyebrow pb-2">Wholesale pricing tiers</p>
            <table className="w-full border border-border text-sm">
              <tbody>
                {product.tiers.map((t) => {
                  const isActive = qty >= t.min && (t.max === null || qty <= t.max);
                  return (
                    <tr
                      key={t.min}
                      className={cn("border-b border-border last:border-0", isActive && "bg-secondary")}
                    >
                      <td className="p-3">
                        {t.min}
                        {t.max ? `–${t.max}` : "+"} units
                      </td>
                      <td className="p-3 text-right font-medium">{eur(t.price)}</td>
                      <td className="hidden p-3 text-right text-muted-foreground sm:table-cell">
                        {Math.round((1 - t.price / product.wholesale) * 100)}% off
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 text-sm sm:grid-cols-3">
            <p className="flex items-start gap-2">
              <Truck className="mt-0.5 size-4 text-clay" /> Dispatch in 48h
            </p>
            <p className="flex items-start gap-2">
              <Package className="mt-0.5 size-4 text-clay" /> Retail-ready packaging
            </p>
            <p className="flex items-start gap-2">
              <RotateCcw className="mt-0.5 size-4 text-clay" /> 30-day trade returns
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mt-16">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & returns</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="max-w-3xl py-6 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </TabsContent>
        <TabsContent value="specs" className="py-6">
          <dl className="grid max-w-2xl gap-px border border-border bg-border text-sm sm:grid-cols-2">
            {[
              ["Reference", product.ref],
              ["Dimensions", product.size],
              ["Material", product.material],
              ["Colour", product.color],
              ["Style", product.style],
              ["Packaging", product.packaging],
            ].map(([k, v]) => (
              <div key={k} className="bg-card p-4">
                <dt className="eyebrow">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </TabsContent>
        <TabsContent
          value="shipping"
          className="max-w-3xl space-y-3 py-6 text-sm leading-relaxed text-muted-foreground"
        >
          <p>
            Orders placed before 14:00 CET are dispatched within 48 hours from our Rotterdam
            warehouse. Standard EU delivery takes 2–5 working days; free over €500 net.
          </p>
          <p>
            Trade returns are accepted within 30 days on unopened master cartons. Damages must be
            reported within 5 working days with photographs of the outer packaging.
          </p>
        </TabsContent>
      </Tabs>

      <section className="mt-16">
        <h2 className="mb-6 font-display text-2xl">Related products</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
