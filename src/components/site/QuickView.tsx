import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { eur, margin, tierPrice, type Product } from "@/lib/catalog";
import { useShop } from "@/lib/store";
import { Stars } from "./Stars";
import { useState } from "react";
import { QtyStepper } from "./QtyStepper";

export function QuickView({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { addToCart } = useShop();
  const [qty, setQty] = useState(product.moq);
  const unit = tierPrice(product, qty);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0 sm:grid sm:grid-cols-2">
        <div className="bg-secondary">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            width={900}
            height={900}
            className="size-full object-cover"
          />
        </div>
        <div className="space-y-4 p-6">
          <DialogHeader className="space-y-1 text-left">
            <p className="eyebrow">{product.brand}</p>
            <DialogTitle className="font-display text-xl">{product.name}</DialogTitle>
          </DialogHeader>
          <Stars rating={product.rating} reviews={product.reviews} />
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <dl className="grid grid-cols-2 gap-3 border-y border-border py-4 text-sm">
            <div>
              <dt className="eyebrow">Unit price</dt>
              <dd className="font-display text-lg">{eur(unit)}</dd>
            </div>
            <div>
              <dt className="eyebrow">RRP</dt>
              <dd className="font-display text-lg">{eur(product.rrp)}</dd>
            </div>
            <div>
              <dt className="eyebrow">MOQ</dt>
              <dd>{product.moq} units</dd>
            </div>
            <div>
              <dt className="eyebrow">Margin</dt>
              <dd>{margin(product)}%</dd>
            </div>
          </dl>
          <QtyStepper value={qty} step={product.moq} min={1} onChange={setQty} />
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                addToCart(product.slug, qty);
                toast.success(`${qty} × ${product.name} added`);
                onOpenChange(false);
              }}
            >
              Add to cart · {eur(unit * qty)}
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/products/$slug" params={{ slug: product.slug }}>
                View full details
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
