import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { bySlug, tierPrice, type Product } from "./catalog";

export type CartLine = { slug: string; qty: number };

type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  saved: CartLine[];
  addToCart: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  removeLine: (slug: string) => void;
  saveForLater: (slug: string) => void;
  moveToCart: (slug: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  cartCount: number;
  subtotal: number;
  lines: { product: Product; qty: number; unit: number; total: number; belowMoq: boolean }[];
};

const ShopContext = createContext<ShopState | null>(null);

const KEY = "maison-cadre-shop-v1";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [saved, setSaved] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setCart(parsed.cart ?? []);
        setWishlist(parsed.wishlist ?? []);
        setSaved(parsed.saved ?? []);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify({ cart, wishlist, saved }));
  }, [cart, wishlist, saved, hydrated]);

  const addToCart = useCallback((slug: string, qty?: number) => {
    const product = bySlug(slug);
    if (!product) return;
    const amount = qty ?? product.moq;
    setCart((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + amount } : l));
      return [...prev, { slug, qty: amount }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setCart((prev) =>
      prev.map((l) => (l.slug === slug ? { ...l, qty: Math.max(1, Math.round(qty)) } : l)),
    );
  }, []);

  const removeLine = useCallback((slug: string) => {
    setCart((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const saveForLater = useCallback((slug: string) => {
    setCart((prev) => {
      const line = prev.find((l) => l.slug === slug);
      if (line) setSaved((s) => (s.some((x) => x.slug === slug) ? s : [...s, line]));
      return prev.filter((l) => l.slug !== slug);
    });
  }, []);

  const moveToCart = useCallback((slug: string) => {
    setSaved((prev) => {
      const line = prev.find((l) => l.slug === slug);
      if (line)
        setCart((c) =>
          c.some((x) => x.slug === slug)
            ? c.map((x) => (x.slug === slug ? { ...x, qty: x.qty + line.qty } : x))
            : [...c, line],
        );
      return prev.filter((l) => l.slug !== slug);
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const lines = useMemo(
    () =>
      cart.flatMap((l) => {
        const product = bySlug(l.slug);
        if (!product) return [];
        const unit = tierPrice(product, l.qty);
        return [
          {
            product,
            qty: l.qty,
            unit,
            total: +(unit * l.qty).toFixed(2),
            belowMoq: l.qty < product.moq,
          },
        ];
      }),
    [cart],
  );

  const value: ShopState = {
    cart,
    wishlist,
    saved,
    addToCart,
    setQty,
    removeLine,
    saveForLater,
    moveToCart,
    clearCart,
    toggleWishlist,
    cartCount: cart.reduce((n, l) => n + l.qty, 0),
    subtotal: +lines.reduce((n, l) => n + l.total, 0).toFixed(2),
    lines,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
