import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeEuro,
  Boxes,
  Headphones,
  RefreshCw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, collections, heroImage, products } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Cadre — Wholesale Photo Frames & Home Décor for Retailers" },
      {
        name: "description",
        content:
          "Buy photo frames, mirrors, posters and wall décor at wholesale prices. Low minimum order quantities, tiered pricing and fast European delivery for trade buyers.",
      },
      { property: "og:title", content: "Maison Cadre — Wholesale Photo Frames & Home Décor" },
      {
        property: "og:description",
        content:
          "Trade-only marketplace for frames, mirrors and wall décor. Wholesale pricing with low minimums.",
      },
    ],
  }),
  component: Home,
});

const benefits = [
  { icon: BadgeEuro, title: "Wholesale pricing", copy: "Tiered trade prices with margins up to 68%." },
  { icon: Boxes, title: "Low minimums", copy: "Start from 4–12 units per reference." },
  { icon: Truck, title: "Fast delivery", copy: "Dispatched within 48h from Rotterdam." },
  { icon: Headphones, title: "Dedicated support", copy: "A named account manager per region." },
  { icon: RefreshCw, title: "One-click reordering", copy: "Repeat any previous order in seconds." },
  { icon: ShieldCheck, title: "Secure payments", copy: "Card, SEPA transfer and 30-day terms." },
];

function Home() {
  const featured = products.slice(0, 8);
  const bestSellers = products.filter((p) => p.bestSeller);
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
          <div className="space-y-7">
            <p className="eyebrow">Trade only · Since 2009</p>
            <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Beautiful frames.
              <br />
              Better margins.
            </h1>
            <p className="max-w-md text-base text-muted-foreground">
              Discover stylish photo frames and home décor products designed for modern retailers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/products">Shop wholesale</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/collections">Explore collections</Link>
              </Button>
            </div>
            <dl className="grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6 text-sm">
              <div>
                <dt className="eyebrow">References</dt>
                <dd className="font-display text-xl">1,240</dd>
              </div>
              <div>
                <dt className="eyebrow">Trade partners</dt>
                <dd className="font-display text-xl">3,800</dd>
              </div>
              <div>
                <dt className="eyebrow">Countries</dt>
                <dd className="font-display text-xl">21</dd>
              </div>
            </dl>
          </div>
          <div className="media-frame">
            <img
              src={heroImage}
              alt="Gallery wall of oak and black photo frames in a bright interior"
              width={1600}
              height={1100}
              className="size-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <Section title="Shop by category" href="/products" linkLabel="View all products">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/products"
              search={{ category: c.slug }}
              className="group border border-border bg-card transition-shadow hover:shadow-card"
            >
              <div className="media-frame aspect-[4/5]">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={900}
                  height={900}
                  className="size-full object-cover"
                />
              </div>
              <p className="flex items-center justify-between p-3 text-sm">
                {c.name}
                <ArrowRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Featured */}
      <Section title="Featured products" href="/products" linkLabel="Browse catalogue">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      {/* Best sellers carousel */}
      <Section title="Best sellers" href="/products" linkLabel="See all bestsellers">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-3">
            {[...bestSellers, ...products.slice(3, 8)].map((p, i) => (
              <CarouselItem key={`${p.id}-${i}`} className="basis-1/2 pl-3 lg:basis-1/4">
                <ProductCard product={p} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-3 hidden md:flex" />
          <CarouselNext className="-right-3 hidden md:flex" />
        </Carousel>
      </Section>

      {/* New arrivals */}
      <Section title="New arrivals" href="/products" linkLabel="All new arrivals">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      {/* Collections */}
      <Section title="Collections" href="/collections" linkLabel="All collections">
        <div className="grid gap-3 md:grid-cols-3">
          {collections.map((c, i) => (
            <Link
              key={c.slug}
              to="/collections"
              className={`group relative overflow-hidden border border-border ${
                i === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="media-frame aspect-[16/10]">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={1400}
                  height={900}
                  className="size-full object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5">
                <p className="font-display text-xl text-primary-foreground">{c.name}</p>
                <p className="max-w-sm text-sm text-primary-foreground/80">{c.copy}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <section className="mt-20 border-y border-border bg-secondary/50 py-16">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <h2 className="font-display text-3xl">Why buy from us</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-4 border-t border-border pt-5">
                <b.icon className="size-5 shrink-0 text-clay" />
                <div>
                  <p className="font-display text-base">{b.title}</p>
                  <p className="text-sm text-muted-foreground">{b.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 text-center lg:px-8">
        <h2 className="font-display text-3xl sm:text-4xl">Ready to grow your collection?</h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Open a trade account in minutes and unlock wholesale pricing, tiered discounts and
          net-30 terms.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/retailers">Create a professional account</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/products">Browse products</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function Section({
  title,
  href,
  linkLabel,
  children,
}: {
  title: string;
  href: "/products" | "/collections";
  linkLabel: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-14 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="font-display text-2xl sm:text-3xl">{title}</h2>
        <Link
          to={href}
          className="hidden items-center gap-1 text-sm text-muted-foreground hover:text-foreground sm:flex"
        >
          {linkLabel} <ArrowRight className="size-3.5" />
        </Link>
      </div>
      {children}
    </section>
  );
}
