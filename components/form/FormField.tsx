interface FormFieldProps {
    label: string;
    helper?: string;
    value: string;
    onChange: (v: string) => void;
    required?: boolean;
    placeholder?: string;
    unit?: string;
    inputMode?: 'decimal' | 'numeric';
}

export const FormField: React.FC<FormFieldProps> = ({
    label,
    helper,
    value,
    onChange,
    required,
    placeholder,
    unit,
    inputMode
}) => {

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col leading-tight">
                <label className="text-[13px] text-neutral-100 font-semibold tracking-[-0.03em] flex items-baseline gap-1">
                    {label}
                    {required && (
                        <span className="text-[#FF8A00] text-[10px] font-normal">*</span>
                    )}
                </label>
                {helper && (
                    <span className="text-[11px] text-neutral-500 font-normal">
                        {helper}
                    </span>
                )}
            </div>

            <div
                className="group relative flex items-center rounded-xl border border-neutral-700 bg-[#1b2333]
                   focus-within:border-[#FF8A00] focus-within:shadow-[0_0_20px_rgba(255,138,0,0.4)]
                   transition-all"
            >
                <input
                    required={required}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    inputMode={inputMode}
                    className="w-full bg-transparent text-white placeholder-neutral-500 text-sm px-3 py-2.5 outline-none rounded-xl"
                />
                {unit && (
                    <div className="pr-3 text-[11px] text-neutral-500 select-none">
                        {unit}
                    </div>
                )}
            </div>
        </div>
    );
}   