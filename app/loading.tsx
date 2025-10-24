
export default function Loading() {
    return (
        <div
            aria-busy="true"
            aria-live="polite"
            className="fixed inset-0 grid place-items-center bg-background/60 backdrop-blur-sm"
        >
        </div>
    );
}
