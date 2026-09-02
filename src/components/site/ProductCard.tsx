import { Link } from "@tanstack/react-router";
import { Heart, Plus, Eye } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Stars } from "./Stars";
import { eur, margin, type Product } from "@/lib/catalog";
import { useShop } from "@/lib/store";
import { cn } from "@/lib/utils";
import { QuickView } from "./QuickView";
import { useState } from "react";

export function ProductCard({
  product,
  layout = "grid",
}: {
  product: Product;
  layout?: "grid" | "list";
}) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const [quickView, setQuickView] = useState(false);
  const wished = wishlist.includes(product.slug);

  const add = () => {
    addToCart(product.slug, product.moq);
    toast.success(`${product.moq} × ${product.name} added`, {
      description: "Minimum order quantity applied.",
    });
  };

  return (
    <>
      <article
        className={cn(
          "group relative flex flex-col border border-border bg-card transition-shadow duration-300 hover:shadow-lift",
          layout === "list" && "sm:flex-row",
        )}
      >
        <div className={cn("relative", layout === "list" && "sm:w-56 sm:shrink-0")}>
          <Link
            to="/products/$slug"
            params={{ slug: product.slug }}
            className="media-frame block aspect-square"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              width={900}
              height={900}
              className="size-full object-cover"
            />
          </Link>
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-ink px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-primary-foreground">
                New
              </span>
            )}
            {product.bestSeller && (
              <span className="bg-sand px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-sand-foreground">
                Bestseller
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => toggleWishlist(product.slug)}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-card/90 text-foreground backdrop-blur transition-colors hover:bg-card"
          >
            <Heart className={cn("size-4", wished && "fill-clay text-clay")} />
          </button>
          <button
            type="button"
            onClick={() => setQuickView(true)}
            className="absolute inset-x-3 bottom-3 hidden items-center justify-center gap-2 bg-card/95 py-2 text-xs font-medium tracking-wide backdrop-blur transition-opacity group-hover:flex"
          >
            <Eye className="size-3.5" /> Quick view
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="space-y-1">
            <p className="eyebrow">{product.brand}</p>
            <h3 className="font-display text-[15px] leading-snug">
              <Link to="/products/$slug" params={{ slug: product.slug }}>
                {product.name}
              </Link>
            </h3>
            <p className="text-xs text-muted-foreground">Ref. {product.ref}</p>
          </div>

          <Stars rating={product.rating} reviews={product.reviews} />

          <div className="mt-auto space-y-2">
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="font-display text-lg">{eur(product.wholesale)}</p>
                <p className="text-xs text-muted-foreground">
                  RRP {eur(product.rrp)} · {margin(product)}% margin
                </p>
              </div>
              <span className="border border-border px-2 py-1 text-[11px] text-muted-foreground">
                MOQ {product.moq}
              </span>
            </div>
            <Button onClick={add} variant="outline" className="w-full gap-2">
              <Plus className="size-4" /> Add {product.moq} to cart
            </Button>
          </div>
        </div>
      </article>
      <QuickView product={product} open={quickView} onOpenChange={setQuickView} />
    </>
  );
}
