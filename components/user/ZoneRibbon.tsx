import * as React from "react";
import type { UiZone } from "@/lib/zones";

const WEIGHTS: Record<UiZone["id"], number> = {
  Z1: 60, Z2: 10, Z3: 10, Z4: 8, Z5: 5, Z6: 10,
};
export function ZoneRibbon({ zones }: { zones: UiZone[] }) {
  // Ordonner Z1..Z6 et ne garder que celles présentes
  const order = ["Z1", "Z2", "Z3", "Z4", "Z5", "Z6"] as UiZone["id"][];
  const items = order.map(id => zones.find(z => z.id === id)).filter(Boolean) as UiZone[];
  const total = 115;

  // gabarit grid en "fr" pour respecter les ratios
  const cols = items.map(z => WEIGHTS[z.id]).join("fr ") + "fr";

  return (
    <div className="relative overflow-visible">
      <div
        className="mx-auto h-10 overflow-visible"

      >
        <div
          className="overflow-visible grid"
          style={{
            gridTemplateColumns: cols,
          }}
        >
          {items.map((z, i) => {
            const isFirst = i === 0;
            const isLast = i === items.length - 1;
            return (
              <div
                key={z.id}
                className={[
                  "h-10 flex items-center justify-center",
                  isFirst && "rounded-l-md",
                  isLast && "rounded-r-md",
                ].filter(Boolean).join(" ")}
                style={{ backgroundColor: z.color }}
                title={`${z.id} • ${(WEIGHTS[z.id] / total * 100).toFixed(1)}%`}
              >
                <span className="text-sm font-semibold text-white/90 leading-none whitespace-nowrap">
                  {z.id}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}