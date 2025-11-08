import ParallaxSection from "../image/ParallaxSection";

export default function Cta() {
    return (

        <ParallaxSection
            src="/footer.jpg"
            id="footer_parralax"
            overlay={true}
            priority
            minHeight={300}
            strength={0.25}
            focalY={0.75}
        >
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-white">Prêt à analyser votre course ?</h2>
                <p className="text-base max-w-lg mx-auto text-slate-300">
                    Créez un compte gratuit et découvrez ce que vos données de course ont à vous dire.
                </p>
            </div>

            <button className="flex min-w-[84px] items-center justify-center rounded-lg h-12 px-5 bg-secondary text-white text-base font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40">
                Commencer l'analyse
            </button>
        </ParallaxSection>
    )
}