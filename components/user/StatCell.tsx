interface StatCellProps {
    value: string | number;
    label: string;
    unit: string;
}

export const StatCell: React.FC<StatCellProps> = ({
    value,
    label,
    unit,
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-4 px-3">
            <div className="text-lg font-semibold text-white leading-none">
                {value}
            </div>
            <div className="text-[10px] uppercase tracking-wide text-neutral-400 font-medium flex flex-col leading-tight">
                <span>{label}</span>
                <span className="text-[9px] normal-case text-neutral-500 font-normal">
                    {unit}
                </span>
            </div>
        </div>
    );
}