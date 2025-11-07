// utils/zones.ts
export type BackendZones = {
    enduranceZones: Array<{
        id: "Z1" | "Z2" | "Z3";
        metric: "HRR";
        percHRR: { from: number; to: number };
        bpm: { from: number; to: number };
        kph: { from: number; to: number };
        pace?: { from: string; to: string };
    }>;
    qualityZones: Array<{
        id: "Z4" | "Z5";
        metric: "VMA";
        label: string; // "Seuil" | "VO2" (peut varier)
        percVMA: { from: number; to: number };
        kph: { from: number; to: number };
        pace?: { from: string; to: string };
    }>;
    vmaBands?: Array<{
        name: string; // "Sprint", "VO2", etc.
        percVMA: { from: number; to: number };
        kph: { from: number; to: number };
        pace?: { from: string; to: string };
    }>;
};

export type UiZone = {
    id: "Z1" | "Z2" | "Z3" | "Z4" | "Z5" | "Z6";
    title: string;
    color: string;
    rangeLabel: string;      // "113 – 132 bpm" ou "11.2 – 12.3 km/h"
    subLabel: string;        // "60–70% HRR" ou "80–88% VMA"
    paceLabel?: string;      // "4:17 – 4:31 /km"
    speedLabel?: string;      // "4:17 – 4:31 /km"
    metric: "HRR" | "VMA";
};

const COLORS: Record<UiZone["id"], string> = {
    Z1: "#4FA3FF",
    Z2: "#4FD18B",
    Z3: "#FFD75B",
    Z4: "#FF8A00",
    Z5: "#E63838",
    Z6: "#8B5CF6",
};

const TITLES: Record<UiZone["id"], string> = {
    Z1: "Échauffement",
    Z2: "Endurance fondamentale",
    Z3: "Seuil aérobie",
    Z4: "Seuil (anaérobie)",
    Z5: "PMA / VO₂",
    Z6: "Sprint",
};

const pct = (x: number) => Math.round(x * 100);
const round1 = (n: number) => Math.round(n * 10) / 10;

export function mapBackendToUiZones(data: BackendZones): UiZone[] {
    const zEnd = data.enduranceZones
        .sort((a, b) => a.id.localeCompare(b.id))
        .map<UiZone>((z) => ({
            id: z.id,
            title: `Z${z.id.slice(1)} : ${TITLES[z.id]}`,
            color: COLORS[z.id],
            rangeLabel: `${z.bpm.from} – ${z.bpm.to} bpm`,
            subLabel: `${pct(z.percHRR.from)}–${pct(z.percHRR.to)}% HRR`,
            paceLabel: z.pace ? `${z.pace.from} – ${z.pace.to} /km` : undefined,
            speedLabel: z.kph ? `${z.kph.from} – ${z.kph.to} /km` : undefined,
            metric: "HRR",
        }));

    const zQual = data.qualityZones
        .sort((a, b) => a.id.localeCompare(b.id))
        .map<UiZone>((z) => ({
            id: z.id,
            title: `Z${z.id.slice(1)} : ${TITLES[z.id]}`,
            color: COLORS[z.id],
            rangeLabel: `${round1(z.kph.from)} – ${round1(z.kph.to)} km/h`,
            subLabel: `${pct(z.percVMA.from)}–${pct(z.percVMA.to)}% VMA`,
            paceLabel: z.pace ? `${z.pace.from} – ${z.pace.to} /km` : undefined,
            speedLabel: z.kph ? `${z.kph.from} – ${z.kph.to} /km` : undefined,
            metric: "VMA",
        }));

    // Z6 depuis vmaBands: name === "Sprint"
    const sprintBand = data.vmaBands?.find((b) => b.name.toLowerCase() === "sprint");
    const z6: UiZone[] = sprintBand
        ? [{
            id: "Z6",
            title: `Z6 : ${TITLES.Z6}`,
            color: COLORS.Z6,
            rangeLabel: `${round1(sprintBand.kph.from)} – ${round1(sprintBand.kph.to)} km/h`,
            subLabel: `${pct(sprintBand.percVMA.from)}–${pct(sprintBand.percVMA.to)}% VMA`,
            paceLabel: sprintBand.pace ? `${sprintBand.pace.from} – ${sprintBand.pace.to} /km` : undefined,
            speedLabel: sprintBand.kph ? `${sprintBand.kph.from} – ${sprintBand.kph.to} /km` : undefined,
            metric: "VMA",
        }]
        : [];

    return [...zEnd, ...zQual, ...z6];
}
