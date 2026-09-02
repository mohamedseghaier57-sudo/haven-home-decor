import { Link } from "@tanstack/react-router";
import { Heart, Home, LayoutGrid, ShoppingBag, User } from "lucide-react";
import { useShop } from "@/lib/store";

export function MobileTabBar() {
  const { cartCount } = useShop();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <Tab to="/" label="Home">
        <Home className="size-5" />
      </Tab>
      <Tab to="/products" label="Shop">
        <LayoutGrid className="size-5" />
      </Tab>
      <Tab to="/collections" label="Collections">
        <Heart className="size-5" />
      </Tab>
      <Tab to="/cart" label="Cart" badge={cartCount}>
        <ShoppingBag className="size-5" />
      </Tab>
      <Tab to="/account" label="Account">
        <User className="size-5" />
      </Tab>
    </nav>
  );
}

function Tab({
  to,
  label,
  children,
  badge,
}: {
  to: "/" | "/products" | "/collections" | "/cart" | "/account";
  label: string;
  children: React.ReactNode;
  badge?: number;
}) {
  return (
    <Link
      to={to}
      className="relative flex flex-col items-center gap-1 py-2.5 text-[10px] text-muted-foreground"
      activeProps={{ className: "text-foreground" }}
    >
      {children}
      {!!badge && (
        <span className="absolute right-[22%] top-1.5 grid min-w-4 place-items-center rounded-full bg-clay px-1 text-[9px] leading-4 text-clay-foreground">
          {badge}
        </span>
      )}
      {label}
    </Link>
  );
}
