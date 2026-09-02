import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/catalog";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Décor Collections for Retailers | Maison Cadre" },
      {
        name: "description",
        content:
          "Scandinavian, minimalist, natural wood, black & white, premium and Christmas collections — curated wholesale assortments for retail buyers.",
      },
      { property: "og:title", content: "Décor Collections for Retailers | Maison Cadre" },
      {
        property: "og:description",
        content: "Curated wholesale assortments, merchandised and ready to order.",
      },
    ],
  }),
  component: Collections,
});

function Collections() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 lg:px-8">
      <div className="max-w-2xl space-y-3">
        <p className="eyebrow">Editorial assortments</p>
        <h1 className="font-display text-4xl">Collections</h1>
        <p className="text-muted-foreground">
          Every collection is merchandised as a complete shelf story — coordinated finishes, mixed
          formats and price points that work together on the floor.
        </p>
      </div>

      <div className="mt-10 space-y-4">
        {collections.map((c, i) => (
          <Link
            key={c.slug}
            to="/products"
            search={{ collection: c.slug }}
            className={`group grid items-stretch border border-border md:grid-cols-2 ${
              i % 2 ? "md:[&>div:first-child]:order-2" : ""
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
            <div className="flex flex-col justify-center gap-3 p-8 lg:p-14">
              <p className="eyebrow">{c.items} references</p>
              <h2 className="font-display text-3xl">{c.name}</h2>
              <p className="max-w-md text-muted-foreground">{c.copy}</p>
              <span className="mt-2 flex items-center gap-2 text-sm font-medium">
                Shop the collection
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
