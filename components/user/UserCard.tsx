import { IdentityHeader } from "./IdentityHeader"
import { InfoCol } from "./InfoCol"
import { RangeCompute } from "./RangeCompute"

import { RangeComputeProps } from "./RangeCompute"
import { IdentityHeaderProps } from "./IdentityHeader"
import { InfoColProps } from "./InfoCol"

interface UserCardProp extends RangeComputeProps, IdentityHeaderProps, InfoColProps { }

export const UserCard: React.FC<UserCardProp> = ({
    firstName,
    lastName,
    age,
    profile,
    vma,
    hrMax,
    hrRest
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
            <div className="bg-white text-neutral-900 border-t border-neutral-200 pt-10 pb-6 px-8">
                <div className="mt-6 text-[11px] text-neutral-500 text-center">
                    Ces valeurs servent à calibrer tes allures et ta charge d’entraînement.
                </div>
            </div>
        </section>
    )
}