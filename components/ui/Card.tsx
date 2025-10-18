import { PropsWithChildren } from 'react';

export function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
    return <div className={`rounded-2xl bg-card p-5 shadow-sm ${className}`}>{children}</div>;
}

export function CardTitle({ children }: PropsWithChildren) {
    return <h3 className="text-base font-semibold text-ink">{children}</h3>;
}
