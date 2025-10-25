import { FormField } from "../form/FormField";
import { FormFieldProps } from "../form/FormField";

interface ProfilePageProps extends FormFieldProps {
    err: string | null;
    vma: string;
    setVma: (v: string) => void;
    age: string;
    setAge: (v: string) => void;
    hrMax: string;
    setHrMax: (v: string) => void;
    hrRest: string;
    setHrRest: (v: string) => void;
    submitting: boolean;
    handleSubmit: (e: React.FormEvent) => void;
}

export const ProfilePanel: React.FC<ProfilePageProps> = ({
    err,
    vma,
    setVma,
    age,
    setAge,
    hrMax,
    setHrMax,
    hrRest,
    setHrRest,
    submitting,
    handleSubmit,
}) => {
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

                <FormField
                    label="Âge"
                    helper="Pour estimer les zones cardiaques"
                    value={age}
                    onChange={setAge}
                    placeholder="32"
                    unit="ans"
                    required
                    inputMode="numeric"
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
              text-neutral-900 shadow-[0_20px_60px_rgba(255,138,0,0.4)]
              hover:shadow-[0_30px_80px_rgba(255,138,0,0.55)]
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