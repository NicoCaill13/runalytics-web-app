export interface InfoColProps {
    top: string | number;
    bottom?: string;
}

export const InfoCol: React.FC<InfoColProps> = ({
    top, bottom
}) => {
    return (
        <div className="group relative flex flex-1 flex-col items-center gap-y-1.5 text-custom-gray-900 uppercase dark:text-black">
            <div className="text-sm font-bold sm:text-xl/tight md:text-2xl/tight lg:text-[1.75rem]/tight">{top}</div>
            <div className="text-2xs/tight">{bottom}</div>
            <div className="absolute inset-y-2 end-0 hidden w-px bg-custom-gray-200 group-last:hidden md:block dark:bg-custom-gray-600"></div>
        </div>
    );
}