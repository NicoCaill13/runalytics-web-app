import { IdentityHeader } from "./IdentityHeader"

import { IdentityHeaderProps } from "./IdentityHeader"
import { InfoColProps } from "./InfoCol"
import { IdentityPicture } from "./IdentityPicture"


interface UserCardProp extends IdentityHeaderProps, InfoColProps {
    onSelect: (key: PanelKey) => void;
    selectedPanel?: PanelKey
}
export type PanelKey = "profile" | "zones" | "trainingLoad" | "goals";


export const UserCard: React.FC<UserCardProp> = ({
    firstName,
    lastName,
    onSelect,
    selectedPanel
}) => {
    return (

        <div className="grid min-h-[340px] gap-y-12 px-6 py-8 md:grid-cols-2 md:gap-x-6 md:py-0 md:ps-0 md:pe-5 lg:gap-x-0">

            <IdentityPicture />
            <div className="order-1 mx-auto md:order-none md:mx-0 md:py-12">
                <IdentityHeader firstName={firstName} lastName={lastName} />
                <div className="mb-5 flex items-start justify-center gap-1.5 md:mb-10 md:justify-start">
                    <div className="mt-6 flex flex-wrap justify-center items-center gap-3 text-[11px] font-semibold uppercase tracking-wide">
                        <HeaderActionButton
                            active={selectedPanel === "profile"}
                            label="Profil"
                            onClick={() => onSelect("profile")}
                        />
                        <HeaderActionButton
                            active={selectedPanel === "zones"}
                            label="Zones"
                            onClick={() => onSelect("zones")}
                        />
                        <HeaderActionButton
                            active={selectedPanel === "goals"}
                            label="Objectifs"
                            onClick={() => onSelect("goals")}
                        />
                        <HeaderActionButton
                            active={selectedPanel === "trainingLoad"}
                            label="Charge"
                            onClick={() => onSelect("trainingLoad")}
                        />

                    </div>
                </div>
            </div>
        </div >

    );

}
function HeaderActionButton({
    label,
    onClick,
    active,
}: {
    label: string;
    onClick: () => void;
    active?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={[
                "px-3 py-2 rounded-2xl border text-left shadow-[0_12px_30px_rgba(0,0,0,0.4)] backdrop-blur-[2px] transition",
                active
                    ? "bg-white/30 border-white/60 text-white"
                    : "bg-white/10 hover:bg-white/20 active:bg-white/30 border-white/20 text-white",
            ].join(" ")}
        >
            <div className="text-[11px] leading-none font-bold text-white tracking-wide">
                {label}
            </div>
        </button>
    );
}

