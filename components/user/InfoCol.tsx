export interface InfoColProps {
    top: string | number;
    bottom?: string;
}

export const InfoCol: React.FC<InfoColProps> = ({
    top, bottom
}) => {
    return (
        <div className="flex flex-col items-center">
            <div className="text-[25px] font-semibold text-neutral-900 leading-none">
                {top}
            </div>
            <div className="text-[10px] uppercase tracking-wide text-neutral-500 font-medium mt-1">
                {bottom}
            </div>
        </div>
    );
}