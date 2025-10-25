import { StatCell } from "./StatCell"

export interface RangeComputeProps {
    vma: string;
    hrMax: string;
    hrRest: string;
}

export const RangeCompute: React.FC<RangeComputeProps> = ({
    vma,
    hrMax,
    hrRest
}) => {

    const vmaNum = parseFloat(vma || '0');
    const hrMaxNum = parseInt(hrMax || '0', 10);
    const hrRestNum = parseInt(hrRest || '0', 10);
    const hrr = hrMaxNum && hrRestNum ? hrMaxNum - hrRestNum : 0;

    const endurance = vmaNum ? (vmaNum * 0.7).toFixed(1) : '—';
    const seuil = vmaNum ? (vmaNum * 0.88).toFixed(1) : '—';
    const z2Low = hrr ? Math.round(hrRestNum + 0.6 * hrr) : '—';
    const z2High = hrr ? Math.round(hrRestNum + 0.7 * hrr) : '—';
    const z3Low = hrr ? Math.round(hrRestNum + 0.7 * hrr) : '—';
    const z3High = hrr ? Math.round(hrRestNum + 0.8 * hrr) : '—';


    return (
        <div className="rounded-xl bg-neutral-900 text-white shadow-xl overflow-hidden min-w-[260px]">
            <div className="bg-neutral-800 text-[11px] font-semibold uppercase tracking-wide text-center py-2">
                zones calculées
            </div>

            <div className="grid grid-cols-5 divide-x divide-neutral-800 text-center">
                <StatCell
                    value={hrr}
                    label="FC Réserve"
                    unit="bpm"
                />
                <StatCell
                    value={endurance}
                    label="Endurance"
                    unit="km/h"
                />
                <StatCell
                    value={seuil}
                    label="Seuil"
                    unit="km/h"
                />
                <StatCell
                    value={
                        z2Low === '—' || z2High === '—'
                            ? '—'
                            : `${z2Low}-${z2High}`
                    }
                    label="Z2 EF"
                    unit="bpm"
                />
                <StatCell
                    value={
                        z3Low === '—' || z3High === '—'
                            ? '—'
                            : `${z3Low}-${z3High}`
                    }
                    label="Z3 EA"
                    unit="bpm"
                />
            </div>
        </div>
    )
}