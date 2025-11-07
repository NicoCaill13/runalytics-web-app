import { IdentityPicture } from "./IdentityPicture";

export interface IdentityHeaderProps {
    firstName: string;
    lastName: string;
}


export const IdentityHeader: React.FC<IdentityHeaderProps> = ({
    firstName,
    lastName,
}) => {
    return (
        <div className="mb-4 flex flex-col items-center text-xl font-extrabold tracking-tighter text-white md:items-start lg:text-2xl xl:text-[2.5rem]/none">
            <span>{firstName}</span>
            <span className="-mt-2 text-5xl tracking-[-0.06em] lg:text-6xl xl:text-[5.125rem]/none">{lastName}</span>
        </div>
    );
}
