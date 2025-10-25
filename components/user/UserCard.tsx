import { IdentityHeader } from "./IdentityHeader"
import { InfoCol } from "./InfoCol"
import { RangeCompute } from "./RangeCompute"

import { RangeComputeProps } from "./RangeCompute"
import { IdentityHeaderProps } from "./IdentityHeader"
import { InfoColProps } from "./InfoCol"

export type PanelKey = "profile" | "zones" | "trainingLoad" | "goals";

interface UserCardProp extends RangeComputeProps, IdentityHeaderProps, InfoColProps {
    onSelect: (key: PanelKey) => void;
}

export const UserCard: React.FC<UserCardProp> = ({
    firstName,
    lastName,
    age,
    profile,
    vma,
    hrMax,
    hrRest,
    onSelect
}) => {
    return (
        <section className="rounded-3xl bg-white text-neutral-900 shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden border border-neutral-800/10 relative">
            <div className="relative bg-gradient-to-br from-[#FFD400] via-[#FF8A00] to-[#FF3D00] text-white p-6 md:p-8">
                <IdentityHeader firstName={firstName} lastName={lastName} age={age} profile={profile} />
                <div className="mt-6 md:absolute md:right-8 md:bottom-[-60px] w-full md:w-auto">
                    <RangeCompute vma={vma} hrMax={hrMax} hrRest={hrRest} />
                </div>
            </div>
            <div className="bg-white text-neutral-900 border-t border-neutral-200 pt-25 pb-6 px-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-6">
                    <InfoCol top={vma || '—'} bottom="VMA (km/h)" />
                    <InfoCol top={hrMax || '—'} bottom="FC Max (bpm)" />
                    <InfoCol top={hrRest || '—'} bottom="FC Repos (bpm)" />
                </div>
            </div>


            <nav className="flex flex-col border-t border-neutral-700/60 divide-y divide-neutral-800/40">
                <UserCardActionRow
                    label="Profil & calibration"
                    desc="Âge, VMA, fréquences cardiaques"
                    onClick={() => onSelect("profile")}
                />

                <UserCardActionRow
                    label="Objectifs"
                    desc="10 km, semi, marathon…"
                    onClick={() => onSelect("goals")}
                />

                <UserCardActionRow
                    label="Charge hebdo"
                    desc="Volume km, ratio EF/Qualité, fatigue"
                    onClick={() => onSelect("trainingLoad")}
                />

                <UserCardActionRow
                    label="Zones & allures"
                    desc="Z2 endurance, Z3 tempo, seuil"
                    onClick={() => onSelect("zones")}
                />
            </nav>

            <div className="bg-white text-neutral-900 border-t border-neutral-200 pt-10 pb-6 px-8">
                <div className="mt-6 text-[11px] text-neutral-500 text-center">
                    Ces valeurs servent à calibrer tes allures et ta charge d’entraînement.
                </div>
            </div>
        </section>
    )
}

function UserCardActionRow({
    label,
    desc,
    onClick,
}: {
    label: string;
    desc: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="flex items-start justify-between w-full text-left px-6 py-4 hover:bg-neutral-800/30 transition"
        >
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-neutral-100 leading-tight">
                    {label}
                </span>
                <span className="text-[11px] text-neutral-400 leading-tight">
                    {desc}
                </span>
            </div>

            <div className="text-neutral-500 text-xs font-semibold pl-4">
                ▶
            </div>
        </button>
    );
}
