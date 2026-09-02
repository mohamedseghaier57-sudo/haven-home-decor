import { Link } from "@tanstack/react-router";
import { categories, collections } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <p className="font-display text-lg font-semibold">MAISON CADRE</p>
          <p className="max-w-xs text-sm text-muted-foreground">
            European wholesale for photo frames, mirrors and wall décor. Trade accounts only.
          </p>
        </div>
        <div>
          <p className="eyebrow pb-3">Catalogue</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link to="/products" search={{ category: c.slug }} className="hover:text-foreground">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow pb-3">Collections</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {collections.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link to="/collections" className="hover:text-foreground">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow pb-3">Trade</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/retailers" className="hover:text-foreground">
                Become a retailer
              </Link>
            </li>
            <li>
              <Link to="/account" className="hover:text-foreground">
                Retailer dashboard
              </Link>
            </li>
            <li>
              <Link to="/account" search={{ tab: "invoices" }} className="hover:text-foreground">
                Invoices
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-foreground">
                Admin panel
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground lg:px-8">
        © {new Date().getFullYear()} Maison Cadre BV · Wholesale terms · VAT NL·8213·B01
      </div>
    </footer>
  );
}
