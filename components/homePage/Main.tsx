"use client";
import * as React from "react";
import Image from "next/image";

import ParallaxSection from "../image/ParallaxSection";


export default function Main() {
  return (
    <ParallaxSection
      src="/main2.jpg"
      id="main_parralax"
      overlay={true}
      priority
      minHeight={500}
      strength={0.25}
      focalY={0.75}
    >
      <div className="flex flex-col gap-2 ">
        <h1 className="text-primary text-4xl md:text-5xl font-black tracking-[-0.033em]">
          Donnez un sens à chaque foulée.
        </h1>
        <h2 className="max-w-xl text-xl mx-auto text-white">
          Importez vos données de course et découvrez des analyses approfondies pour progresser plus vite et éviter les blessures.
        </h2>
      </div>

      <button className="flex min-w-[84px] items-center justify-center rounded-lg h-12 px-5 bg-secondary text-white text-base font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40">
        Commencer l'analyse
      </button>
    </ParallaxSection>
  );
}
