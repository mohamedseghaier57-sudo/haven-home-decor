import { Minus, Plus } from "lucide-react";

export function QtyStepper({
  value,
  onChange,
  step = 1,
  min = 1,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
  label?: string;
}) {
  return (
    <div className="space-y-1.5">
      {label && <p className="eyebrow">{label}</p>}
      <div className="inline-flex items-center border border-border">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => onChange(Math.max(min, value - step))}
          className="grid size-10 place-items-center transition-colors hover:bg-secondary"
        >
          <Minus className="size-4" />
        </button>
        <input
          value={value}
          onChange={(e) => onChange(Math.max(min, Number(e.target.value.replace(/\D/g, "")) || min))}
          inputMode="numeric"
          aria-label="Quantity"
          className="w-16 border-x border-border bg-transparent py-2 text-center text-sm outline-none focus:bg-secondary/60"
        />
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => onChange(value + step)}
          className="grid size-10 place-items-center transition-colors hover:bg-secondary"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
