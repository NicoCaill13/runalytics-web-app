import { FormField } from "../form/FormField";
import { FormFieldProps } from "../form/FormField";

interface ProfilePageProps extends FormFieldProps {
    err: string | null;
    vma: string;
    vmaEstimate: string;
    setVma: (v: string) => void;
    age: string;
    setAge: (v: string) => void;
    birthDay: string;
    setBirthDay: (v: string) => void;
    hrMax: string;
    setHrMax: (v: string) => void;
    hrRest: string;
    setHrRest: (v: string) => void;
    submitting: boolean;
    handleSubmit: (e: React.FormEvent) => void;
    isDisabled: boolean
}

export const ProfilePanel: React.FC<ProfilePageProps> = ({
    err,
    vma,
    setVma,
    vmaEstimate,
    birthDay,
    setBirthDay,
    hrMax,
    setHrMax,
    hrRest,
    setHrRest,
    submitting,
    handleSubmit,
    isDisabled
}) => {
    const onClick = () => setVma(vmaEstimate)
    const disabled = !!vma;
    return (
        <>
            <header className="mb-4">
                <h2 className="text-white text-base font-semibold tracking-[-0.03em] flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-br from-[#FFD400] via-[#FF8A00] to-[#FF3D00] shadow-[0_0_20px_rgba(255,138,0,0.7)]" />
                    Profil & calibration
                </h2>
                <p className="text-[12px] text-neutral-400 leading-relaxed mt-1">
                    Dis-nous où tu en es physiquement. On s’occupe du reste.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                        label="VMA"
                        helper="Ta vitesse max aérobie actuelle"
                        value={vma}
                        onChange={setVma}
                        placeholder="16.2"
                        unit="km/h"
                        required
                        inputMode="decimal"
                    />

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col leading-tight">
                            <label className="text-[13px] text-neutral-100 font-semibold tracking-[-0.03em] flex items-baseline gap-1">
                                Estimation VMA
                            </label>
                            <span className="text-[11px] text-neutral-500 font-normal">
                                On peut estimer ta VMA grace à ton activité
                            </span>
                        </div>
                        <button
                            disabled={disabled}
                            onClick={onClick}
                            className="bg-gradient-to-br from-[#FFD400] via-[#FF8A00] to-[#FF3D00] text-white font-bold py-2 px-4 rounded-xl 
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none">
                            Estimer ma VMA
                        </button>
                    </div>

                </div>

                <FormField
                    label="Date de naissance"
                    helper="Pour estimer les zones cardiaques"
                    value={birthDay}
                    onChange={setBirthDay}
                    placeholder={birthDay}
                    unit=""
                    required
                    inputMode="none"
                    type="date"
                    isDisabled={isDisabled}

                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                        label="FC Max"
                        helper="Pic max en effort total"
                        value={hrMax}
                        onChange={setHrMax}
                        placeholder="190"
                        unit="bpm"
                        required
                        inputMode="numeric"
                    />
                    <FormField
                        label="FC Repos"
                        helper="Au calme, le matin"
                        value={hrRest}
                        onChange={setHrRest}
                        placeholder="52"
                        unit="bpm"
                        required
                        inputMode="numeric"
                    />
                </div>

                {err && (
                    <p className="text-red-400 text-[12px] leading-snug border border-red-500/30 bg-red-500/10 rounded-lg px-3 py-2">
                        {err}
                    </p>
                )}

                <div className="mt-auto flex flex-col gap-4">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex justify-center items-center rounded-xl text-sm font-semibold px-4 py-3
              bg-gradient-to-br from-[#FFD400] via-[#FF8A00] to-[#FF3D00]
              text-white shadow-[0_20px_60px_rgba(255,138,0,0.4)]
              active:scale-[0.99]
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all"
                    >
                        {submitting ? "Enregistrement…" : "Valider et continuer →"}
                    </button>

                    <p className="text-[11px] text-neutral-500 leading-relaxed text-center">
                        Tu pourras ajuster ces valeurs ensuite dans ton profil.
                    </p>
                </div>
            </form>
        </>
    );
}


