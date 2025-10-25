import Image from "next/image";

export interface IdentityHeaderProps {
    firstName: string;
    lastName: string;
    age: string;
    profile: string;
}

export const IdentityHeader: React.FC<IdentityHeaderProps> = ({
    firstName,
    lastName,
    age,
    profile
}) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8">
            <div className="flex-1 flex flex-col">
                <div>
                    <span className='block text-3xl font-bold'>{firstName}</span>
                    <span className='block uppercase text-5xl font-extrabold'>{lastName}</span>
                </div>

                <div className="inline-flex w-fit items-center mt-3 text-[11px] font-semibold uppercase tracking-wide text-neutral-900 bg-white rounded-full px-3 py-1 shadow-sm">
                    Calibration • {age || 'Âge ?'} ans
                </div>
            </div>


            <div className="relative shrink-0 flex items-end justify-center">
                <div className="w-32 h-32 rounded-2xl bg-neutral-900/10 ring-4 ring-white/20 flex items-center justify-center overflow-hidden">
                    <Image
                        src={profile}
                        width={120}
                        height={120}
                        alt="Runalytics"
                        className="rounded-2xl aspect-square object-cover"
                    />
                </div>
            </div>
        </div>
    );
}