import oak from "@/assets/p-oak-frame.jpg";
import blackMetal from "@/assets/p-black-metal-frame.jpg";
import gallerySet from "@/assets/p-gallery-set.jpg";
import gold from "@/assets/p-gold-frame.jpg";
import white from "@/assets/p-white-frame.jpg";
import rustic from "@/assets/p-rustic-frame.jpg";
import magnetic from "@/assets/p-magnetic-poster.jpg";
import doubleFrame from "@/assets/p-double-frame.jpg";
import mirror from "@/assets/p-round-mirror.jpg";
import posterSet from "@/assets/p-poster-set.jpg";
import heroWall from "@/assets/hero-gallery-wall.jpg";
import colScandi from "@/assets/col-scandinavian.jpg";
import colBw from "@/assets/col-blackwhite.jpg";
import colWood from "@/assets/col-natural-wood.jpg";

export const heroImage = heroWall;

export type PriceTier = { min: number; max: number | null; price: number };

export type Product = {
  id: string;
  slug: string;
  name: string;
  ref: string;
  brand: string;
  category: string;
  categorySlug: string;
  images: string[];
  wholesale: number;
  rrp: number;
  moq: number;
  rating: number;
  reviews: number;
  material: string;
  color: string;
  size: string;
  style: string;
  stock: number;
  isNew?: boolean;
  bestSeller?: boolean;
  collections: string[];
  description: string;
  packaging: string;
  tiers: PriceTier[];
};

const tiers = (base: number): PriceTier[] => [
  { min: 1, max: 9, price: base },
  { min: 10, max: 49, price: +(base * 0.92).toFixed(2) },
  { min: 50, max: 99, price: +(base * 0.85).toFixed(2) },
  { min: 100, max: null, price: +(base * 0.78).toFixed(2) },
];

export const categories = [
  { name: "Photo Frames", slug: "photo-frames", image: oak },
  { name: "Wall Frames", slug: "wall-frames", image: blackMetal },
  { name: "Collage Frames", slug: "collage-frames", image: gallerySet },
  { name: "Wooden Frames", slug: "wooden-frames", image: rustic },
  { name: "Metal Frames", slug: "metal-frames", image: gold },
  { name: "Table Frames", slug: "table-frames", image: doubleFrame },
  { name: "Mirrors", slug: "mirrors", image: mirror },
  { name: "Posters & Prints", slug: "posters-prints", image: posterSet },
  { name: "Wall Décor", slug: "wall-decor", image: magnetic },
  { name: "New Arrivals", slug: "new-arrivals", image: white },
];

export const collections = [
  {
    name: "Scandinavian Collection",
    slug: "scandinavian",
    image: colScandi,
    copy: "Pale oak, linen tones and calm proportions for northern interiors.",
    items: 42,
  },
  {
    name: "Black & White Collection",
    slug: "black-white",
    image: colBw,
    copy: "Graphic contrast for galleries, concept stores and hotel corridors.",
    items: 36,
  },
  {
    name: "Natural Wood Collection",
    slug: "natural-wood",
    image: colWood,
    copy: "FSC walnut, ash and oak profiles with a hand-finished edge.",
    items: 51,
  },
  {
    name: "Minimalist Collection",
    slug: "minimalist",
    image: white,
    copy: "Slim profiles, deep mounts, nothing superfluous.",
    items: 28,
  },
  {
    name: "Premium Collection",
    slug: "premium",
    image: gold,
    copy: "Museum glass, gilded mouldings and made-to-order sizes.",
    items: 19,
  },
  {
    name: "Christmas Collection",
    slug: "christmas",
    image: rustic,
    copy: "Seasonal gifting assortments with retail-ready packaging.",
    items: 24,
  },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "natural-oak-photo-frame-20x30",
    name: "Natural Oak Photo Frame 20×30",
    ref: "MC-OAK-2030",
    brand: "Maison Cadre Studio",
    category: "Wooden Frames",
    categorySlug: "wooden-frames",
    images: [oak, colWood, colScandi],
    wholesale: 7.4,
    rrp: 19.95,
    moq: 12,
    rating: 4.8,
    reviews: 126,
    material: "Solid oak",
    color: "Natural",
    size: "20×30 cm",
    style: "Scandinavian",
    stock: 1840,
    bestSeller: true,
    collections: ["scandinavian", "natural-wood"],
    description:
      "A solid FSC-certified oak profile with a soft matt lacquer, mitred corners and a deep rebate that suits both prints and passe-partout mounting. A perennial bestseller across Northern European retail.",
    packaging: "Individually shrink-wrapped with kraft corner protectors, 12 pcs per master carton.",
    tiers: tiers(7.4),
  },
  {
    id: "2",
    slug: "black-metal-frame-30x40",
    name: "Black Metal Frame 30×40",
    ref: "MC-MET-3040",
    brand: "Atelier Nord",
    category: "Metal Frames",
    categorySlug: "metal-frames",
    images: [blackMetal, colBw, heroWall],
    wholesale: 9.1,
    rrp: 24.95,
    moq: 10,
    rating: 4.7,
    reviews: 208,
    material: "Powder-coated aluminium",
    color: "Black",
    size: "30×40 cm",
    style: "Minimalist",
    stock: 940,
    bestSeller: true,
    collections: ["black-white", "minimalist"],
    description:
      "A 7 mm anodised aluminium profile in deep matt black with anti-reflective acrylic glazing. Light enough for gallery walls, robust enough for hospitality projects.",
    packaging: "Flat-packed in printed sleeve, 10 pcs per carton.",
    tiers: tiers(9.1),
  },
  {
    id: "3",
    slug: "gallery-wall-set-6-frames",
    name: "Gallery Wall Set – 6 Frames",
    ref: "MC-SET-006",
    brand: "Maison Cadre Studio",
    category: "Collage Frames",
    categorySlug: "collage-frames",
    images: [gallerySet, heroWall, colScandi],
    wholesale: 32.5,
    rrp: 89.0,
    moq: 4,
    rating: 4.9,
    reviews: 87,
    material: "Oak veneer & MDF",
    color: "Mixed",
    size: "Set of 6",
    style: "Editorial",
    stock: 420,
    bestSeller: true,
    collections: ["scandinavian", "minimalist"],
    description:
      "Six coordinated frames with a printed hanging template — a complete gallery wall proposition that lifts basket value and merchandises beautifully on a single shelf.",
    packaging: "Retail-ready gift box with hanging kit, 4 sets per carton.",
    tiers: tiers(32.5),
  },
  {
    id: "4",
    slug: "gold-classic-frame-40x50",
    name: "Gold Classic Frame 40×50",
    ref: "MC-GLD-4050",
    brand: "Casa Lumina",
    category: "Wall Frames",
    categorySlug: "wall-frames",
    images: [gold, colBw, heroWall],
    wholesale: 18.9,
    rrp: 49.95,
    moq: 6,
    rating: 4.6,
    reviews: 54,
    material: "Hand-gilded resin on wood",
    color: "Gold",
    size: "40×50 cm",
    style: "Classic",
    stock: 260,
    collections: ["premium"],
    description:
      "An ornate moulding finished by hand in warm gold leaf effect. Pairs with museum-grade glazing for interior design projects and hotel commissions.",
    packaging: "Foam-corner protected, 6 pcs per carton.",
    tiers: tiers(18.9),
  },
  {
    id: "5",
    slug: "minimalist-white-frame-21x30",
    name: "Minimalist White Frame 21×30",
    ref: "MC-WHT-2130",
    brand: "Atelier Nord",
    category: "Photo Frames",
    categorySlug: "photo-frames",
    images: [white, colScandi, heroWall],
    wholesale: 5.8,
    rrp: 15.95,
    moq: 12,
    rating: 4.5,
    reviews: 143,
    material: "Lacquered MDF",
    color: "White",
    size: "21×30 cm (A4)",
    style: "Minimalist",
    stock: 3200,
    isNew: true,
    collections: ["minimalist", "black-white"],
    description:
      "A crisp white profile sized for A4 prints, with a removable mount for a gallery finish. High rotation, low MOQ — ideal for entry price points.",
    packaging: "Shrink-wrapped, 12 pcs per carton.",
    tiers: tiers(5.8),
  },
  {
    id: "6",
    slug: "rustic-wooden-frame-15x15",
    name: "Rustic Wooden Frame 15×15",
    ref: "MC-RST-1515",
    brand: "Bois & Terre",
    category: "Wooden Frames",
    categorySlug: "wooden-frames",
    images: [rustic, colWood, colScandi],
    wholesale: 6.2,
    rrp: 17.5,
    moq: 12,
    rating: 4.4,
    reviews: 61,
    material: "Reclaimed pine",
    color: "Walnut",
    size: "15×15 cm",
    style: "Rustic",
    stock: 780,
    collections: ["natural-wood", "christmas"],
    description:
      "Reclaimed pine with a wire-brushed grain and wax finish. Each piece carries a slightly different tone, which merchandises well in stacked baskets.",
    packaging: "Bulk-packed with tissue interleaves, 24 pcs per carton.",
    tiers: tiers(6.2),
  },
  {
    id: "7",
    slug: "magnetic-poster-frame-50x70",
    name: "Magnetic Poster Frame 50×70",
    ref: "MC-MAG-5070",
    brand: "Atelier Nord",
    category: "Wall Décor",
    categorySlug: "wall-decor",
    images: [magnetic, colScandi, heroWall],
    wholesale: 11.4,
    rrp: 29.95,
    moq: 8,
    rating: 4.7,
    reviews: 74,
    material: "Ash wood & leather cord",
    color: "Natural",
    size: "50×70 cm",
    style: "Scandinavian",
    stock: 510,
    isNew: true,
    collections: ["scandinavian", "minimalist"],
    description:
      "Two magnetic ash rails and a vegetable-tanned leather cord — poster changing takes seconds, which makes it a natural add-on to any print assortment.",
    packaging: "Slim retail sleeve, 8 pcs per carton.",
    tiers: tiers(11.4),
  },
  {
    id: "8",
    slug: "double-photo-frame-13x18",
    name: "Double Photo Frame 13×18",
    ref: "MC-DBL-1318",
    brand: "Casa Lumina",
    category: "Table Frames",
    categorySlug: "table-frames",
    images: [doubleFrame, colWood, colScandi],
    wholesale: 8.3,
    rrp: 22.5,
    moq: 10,
    rating: 4.3,
    reviews: 39,
    material: "Cherry wood",
    color: "Walnut",
    size: "2 × 13×18 cm",
    style: "Classic",
    stock: 340,
    collections: ["natural-wood", "christmas"],
    description:
      "A hinged twin frame on a solid base — a dependable gifting item with strong sell-through in Q4 and for wedding assortments.",
    packaging: "Printed gift carton, 10 pcs per master carton.",
    tiers: tiers(8.3),
  },
  {
    id: "9",
    slug: "round-black-wall-mirror-60",
    name: "Round Black Wall Mirror Ø60",
    ref: "MC-MIR-060",
    brand: "Bois & Terre",
    category: "Mirrors",
    categorySlug: "mirrors",
    images: [mirror, colBw, heroWall],
    wholesale: 27.5,
    rrp: 74.95,
    moq: 4,
    rating: 4.8,
    reviews: 66,
    material: "Steel & 4 mm glass",
    color: "Black",
    size: "Ø 60 cm",
    style: "Minimalist",
    stock: 190,
    bestSeller: true,
    collections: ["black-white", "minimalist"],
    description:
      "A fine steel rim and true-tone glass. Ships with a concealed French cleat for a floating installation — specified frequently by interior designers.",
    packaging: "Double-wall carton with EPS ring, 2 pcs per carton.",
    tiers: tiers(27.5),
  },
  {
    id: "10",
    slug: "abstract-print-set-of-3",
    name: "Abstract Print Set of 3 – Sand",
    ref: "MC-PRT-003",
    brand: "Maison Cadre Studio",
    category: "Posters & Prints",
    categorySlug: "posters-prints",
    images: [posterSet, colScandi, heroWall],
    wholesale: 9.9,
    rrp: 27.0,
    moq: 10,
    rating: 4.6,
    reviews: 48,
    material: "200 g matt art paper",
    color: "Sand",
    size: "3 × 30×40 cm",
    style: "Editorial",
    stock: 1120,
    isNew: true,
    collections: ["scandinavian", "premium"],
    description:
      "A curated triptych printed with pigment inks on FSC art paper. Sold unframed so it can be cross-merchandised with any frame in the range.",
    packaging: "Rigid kraft tube with retail label, 10 sets per carton.",
    tiers: tiers(9.9),
  },
  {
    id: "11",
    slug: "walnut-table-frame-10x15",
    name: "Walnut Table Frame 10×15",
    ref: "MC-WAL-1015",
    brand: "Bois & Terre",
    category: "Table Frames",
    categorySlug: "table-frames",
    images: [doubleFrame, rustic, colWood],
    wholesale: 5.4,
    rrp: 14.95,
    moq: 12,
    rating: 4.2,
    reviews: 27,
    material: "Walnut veneer",
    color: "Walnut",
    size: "10×15 cm",
    style: "Classic",
    stock: 1460,
    isNew: true,
    collections: ["natural-wood"],
    description:
      "A compact desk frame with a felt-lined easel back. Priced for impulse purchase and stackable on counter displays.",
    packaging: "Bulk-packed, 24 pcs per carton.",
    tiers: tiers(5.4),
  },
  {
    id: "12",
    slug: "charcoal-gallery-frame-50x70",
    name: "Charcoal Gallery Frame 50×70",
    ref: "MC-CHR-5070",
    brand: "Atelier Nord",
    category: "Wall Frames",
    categorySlug: "wall-frames",
    images: [blackMetal, colBw, heroWall],
    wholesale: 15.6,
    rrp: 42.0,
    moq: 6,
    rating: 4.7,
    reviews: 55,
    material: "Ash wood",
    color: "Charcoal",
    size: "50×70 cm",
    style: "Editorial",
    stock: 300,
    collections: ["black-white", "premium"],
    description:
      "Large-format ash profile stained charcoal, supplied with a 60 mm museum mount. The house standard for hotel and office commissions.",
    packaging: "Corner-protected, 6 pcs per carton.",
    tiers: tiers(15.6),
  },
];

export const brands = [...new Set(products.map((p) => p.brand))];
export const materials = [...new Set(products.map((p) => p.material))];
export const colors = [...new Set(products.map((p) => p.color))];
export const sizes = [...new Set(products.map((p) => p.size))];
export const styles = [...new Set(products.map((p) => p.style))];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);

export const tierPrice = (p: Product, qty: number) => {
  const t = p.tiers.find((t) => qty >= t.min && (t.max === null || qty <= t.max));
  return t ? t.price : p.wholesale;
};

export const eur = (n: number) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(n);

export const margin = (p: Product) => Math.round(((p.rrp - p.wholesale) / p.rrp) * 100);

export const searchProducts = (q: string) => {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return products.filter((p) =>
    [p.name, p.ref, p.brand, p.category, p.material, p.color, p.style]
      .join(" ")
      .toLowerCase()
      .includes(term),
  );
};

export type DemoOrder = {
  id: string;
  date: string;
  status: "Delivered" | "In transit" | "Processing" | "Awaiting payment";
  total: number;
  items: { slug: string; qty: number }[];
};

export const demoOrders: DemoOrder[] = [
  {
    id: "MC-24118",
    date: "2026-08-21",
    status: "Delivered",
    total: 1284.6,
    items: [
      { slug: "natural-oak-photo-frame-20x30", qty: 60 },
      { slug: "black-metal-frame-30x40", qty: 40 },
      { slug: "abstract-print-set-of-3", qty: 20 },
    ],
  },
  {
    id: "MC-24096",
    date: "2026-07-09",
    status: "Delivered",
    total: 742.15,
    items: [
      { slug: "gallery-wall-set-6-frames", qty: 12 },
      { slug: "minimalist-white-frame-21x30", qty: 48 },
    ],
  },
  {
    id: "MC-24131",
    date: "2026-08-30",
    status: "In transit",
    total: 968.4,
    items: [
      { slug: "round-black-wall-mirror-60", qty: 16 },
      { slug: "magnetic-poster-frame-50x70", qty: 24 },
    ],
  },
  {
    id: "MC-24140",
    date: "2026-09-01",
    status: "Processing",
    total: 356.8,
    items: [
      { slug: "double-photo-frame-13x18", qty: 20 },
      { slug: "walnut-table-frame-10x15", qty: 24 },
    ],
  },
];
