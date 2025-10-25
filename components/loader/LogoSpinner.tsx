'use client';

import Image from 'next/image';
import React from 'react';

type Props = {
    size?: number;          // taille en px
    speedMs?: number;       // vitesse d’un tour en ms
    unoptimized?: boolean;  // si besoin, selon ton setup
    className?: string;
    alt?: string;
};

export default function LogoSpinner({
    size = 96,
    speedMs = 1200,
    unoptimized = false,
    className = '',
    alt = 'Runalytics loading…',
}: Props) {
    return (
        <Image
            src="/runalytics.png"
            alt={alt}
            width={size}
            height={size}
            className={`logo-spin ${className}`}
            style={{ animationDuration: `${speedMs}ms` }}
            priority
            unoptimized={unoptimized}
        />
    );
}
