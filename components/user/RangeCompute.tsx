import React from "react";
import type { UiZone } from "@/lib/zones";
import { ZoneRibbon } from "./ZoneRibbon";

export function ZonesPanel({ zones }: { zones: UiZone[] }) {
    return (
        <section className="w-full flex flex-col gap-6">
            <section className="grid grid-cols-1 gap-4">
                <ZoneRibbon zones={zones} />
                {/* …tes cards Z1..Z6 inchangées */}
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {zones.slice(0, 2).map((z) => <ZoneCard key={z.id} z={z} />)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {zones.slice(2, 4).map((z) => <ZoneCard key={z.id} z={z} />)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {zones.slice(4).map((z) => <ZoneCard key={z.id} z={z} />)}
            </div>
        </section>
    );
}


function ZoneCard({ z }: { z: UiZone }) {
    return (
        <div className="rounded-xl border border-white/10 bg-[#0f1624] text-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: z.color }} />
                <h3 className="font-semibold text-sm">{z.title}</h3>
                <span className="ml-auto text-[10px] px-2 py-[2px] rounded-full bg-white/10 border border-white/10 uppercase tracking-wide">
                    {z.metric}
                </span>
            </div>

            <div className="text-3xl font-extrabold tracking-tight">{z.rangeLabel}</div>
            <div className="text-sm text-white/70 mt-1">{z.subLabel}</div>
            {z.paceLabel && <div className="text-sm text-white/70 mt-1">Allure : {z.paceLabel}</div>}
            {z.speedLabel && <div className="text-sm text-white/70 mt-1">Vitesse : {z.speedLabel}</div>}
        </div>
    );
}