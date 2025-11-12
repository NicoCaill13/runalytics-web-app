// components/ui/SegmentedToggle.tsx
"use client";

import * as React from "react";

type Option = {
    value: string;
    label: string;
    icon?: React.ReactNode;
};

type Props = {
    value: string;
    onChange: (next: string) => void;
    options: [Option, Option];
    disabled?: boolean;
    loading?: boolean;
    className?: string;
};

export default function SegmentedToggle({
    value,
    onChange,
    options,
    disabled,
    loading,
    className = "",
}: Props) {
    const [left, right] = options;
    const isLeft = value === left.value;

    return (
        <div
            className={`inline-flex items-center rounded-2xl bg-gray-50 border border-gray-200 p-1 shadow-inner ${className}`}
            role="group"
            aria-label="segmented toggle"
        >
            <button
                type="button"
                aria-pressed={isLeft}
                onClick={() => !disabled && !loading && onChange(left.value)}
                disabled={disabled || loading}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition
          ${isLeft ? "bg-secondary text-white shadow-sm" : "text-gray-600 hover:text-gray-800"}
          disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                {loading ? (
                    <Spinner />
                ) : (
                    left.icon ?? <span className="material-symbols-outlined">light_mode</span>
                )}
                <span>{left.label}</span>
            </button>

            <button
                type="button"
                aria-pressed={!isLeft}
                onClick={() => !disabled && !loading && onChange(right.value)}
                disabled={disabled || loading}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition
          ${!isLeft ? "bg-secondary text-white shadow-sm" : "text-gray-600 hover:text-gray-800"}
          disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                {loading ? (
                    <Spinner />
                ) : (
                    right.icon ?? <span className="material-symbols-outlined">dark_mode</span>
                )}
                <span>{right.label}</span>
            </button>
        </div>
    );
}

function Spinner() {
    return (
        <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
        </svg>
    );
}
