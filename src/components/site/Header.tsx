import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { categories, collections, eur, searchProducts } from "@/lib/catalog";
import { useShop } from "@/lib/store";
import { cn } from "@/lib/utils";

const RECENT_KEY = "maison-cadre-recent-searches";

const navLinks = [
  { label: "New arrivals", to: "/products", search: { sort: "newest" } as const },
  { label: "Best sellers", to: "/products", search: { sort: "best" } as const },
  { label: "Collections", to: "/collections", search: undefined },
  { label: "For professionals", to: "/retailers", search: undefined },
];

export function Header() {
  const { cartCount, wishlist } = useShop();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]"));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const suggestions = searchProducts(query).slice(0, 6);

  const submit = (term: string) => {
    const value = term.trim();
    if (!value) return;
    const next = [value, ...recent.filter((r) => r !== value)].slice(0, 5);
    setRecent(next);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    setOpen(false);
    navigate({ to: "/products", search: { q: value } });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="hidden bg-ink py-2 text-center text-[11px] uppercase tracking-[0.18em] text-primary-foreground md:block">
        Trade only · Free EU delivery over €500 · Low minimum order quantities
      </div>

      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 md:h-20 lg:px-8">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[86vw] max-w-sm overflow-y-auto p-6">
            <p className="eyebrow mb-4">Categories</p>
            <nav className="flex flex-col gap-3 text-sm">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to="/products"
                  search={{ category: c.slug }}
                  className="hover:text-clay"
                >
                  {c.name}
                </Link>
              ))}
            </nav>
            <p className="eyebrow mb-4 mt-8">Discover</p>
            <nav className="flex flex-col gap-3 text-sm">
              <Link to="/collections">Collections</Link>
              <Link to="/retailers">For professionals</Link>
              <Link to="/account">My account</Link>
              <Link to="/admin">Admin</Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link to="/" className="shrink-0">
          <span className="font-display text-lg font-semibold tracking-[-0.03em] md:text-xl">
            MAISON&nbsp;CADRE
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.24em] text-muted-foreground md:block">
            Wholesale décor
          </span>
        </Link>

        <div ref={boxRef} className="relative mx-auto hidden w-full max-w-2xl md:block">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(query);
            }}
          >
            <div className="flex items-center gap-2 border border-border bg-card px-4">
              <Search className="size-4 text-muted-foreground" />
              <input
                value={query}
                onFocus={() => setOpen(true)}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                }}
                placeholder="Search products, categories, brands..."
                aria-label="Search"
                className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                  <X className="size-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </form>

          {open && (
            <div className="absolute inset-x-0 top-full mt-1 border border-border bg-popover p-2 shadow-lift">
              {query ? (
                suggestions.length ? (
                  <ul>
                    {suggestions.map((p) => (
                      <li key={p.id}>
                        <Link
                          to="/products/$slug"
                          params={{ slug: p.slug }}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 p-2 hover:bg-secondary"
                        >
                          <img
                            src={p.images[0]}
                            alt=""
                            loading="lazy"
                            className="size-10 object-cover"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm">{p.name}</span>
                            <span className="block text-xs text-muted-foreground">
                              {p.ref} · {p.category}
                            </span>
                          </span>
                          <span className="text-sm">{eur(p.wholesale)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-3 text-sm text-muted-foreground">
                    No matches for “{query}”. Try a reference, material or colour.
                  </p>
                )
              ) : (
                <div className="p-2">
                  {recent.length > 0 && (
                    <>
                      <p className="eyebrow px-1 pb-2">Recent searches</p>
                      <div className="flex flex-wrap gap-2 pb-3">
                        {recent.map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => submit(r)}
                            className="border border-border px-3 py-1 text-xs hover:bg-secondary"
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  <p className="eyebrow px-1 pb-2">Popular categories</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(0, 6).map((c) => (
                      <Link
                        key={c.slug}
                        to="/products"
                        search={{ category: c.slug }}
                        onClick={() => setOpen(false)}
                        className="border border-border px-3 py-1 text-xs hover:bg-secondary"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild aria-label="Wishlist">
            <Link to="/account" search={{ tab: "wishlist" }} className="relative">
              <Heart className="size-5" />
              {wishlist.length > 0 && <Dot>{wishlist.length}</Dot>}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Cart">
            <Link to="/cart" className="relative">
              <ShoppingBag className="size-5" />
              {cartCount > 0 && <Dot>{cartCount}</Dot>}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Account">
            <Link to="/account">
              <User className="size-5" />
            </Link>
          </Button>
          <Button asChild className="ml-2 hidden lg:inline-flex">
            <Link to="/retailers">Become a retailer</Link>
          </Button>
        </div>
      </div>

      <nav className="mx-auto hidden max-w-[1400px] items-center gap-6 px-4 pb-3 text-sm lg:flex lg:px-8">
        <CategoriesMenu />
        {navLinks.map((l) => (
          <Link
            key={l.label}
            to={l.to}
            search={l.search}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {l.label}
          </Link>
        ))}
        <span className="ml-auto text-xs text-muted-foreground">
          Tiered pricing from 10 units · VAT-free intra-EU trade
        </span>
      </nav>

      <div className="border-t border-border p-3 md:hidden">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(query);
          }}
          className="flex items-center gap-2 border border-border bg-card px-3"
        >
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, categories, brands..."
            aria-label="Search"
            className="h-10 w-full bg-transparent text-sm outline-none"
          />
        </form>
      </div>
    </header>
  );
}

function Dot({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-clay px-1 text-[10px] leading-4 text-clay-foreground">
      {children}
    </span>
  );
}

function CategoriesMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className={cn("flex items-center gap-2 font-medium", open && "text-clay")}
      >
        <Menu className="size-4" /> Categories
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 grid w-[640px] grid-cols-2 gap-6 border border-border bg-popover p-6 shadow-lift">
          <div>
            <p className="eyebrow pb-3">Shop by category</p>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/products"
                    search={{ category: c.slug }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow pb-3">Collections</p>
            <ul className="space-y-2 text-sm">
              {collections.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/products"
                    search={{ collection: c.slug }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
