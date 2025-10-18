export function Stat({ label, value, trend }: { label: string; value: string; trend?: 'up' | 'down' | 'flat' }) {
    const color = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-muted';
    const arrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•';
    return (
        <div className="rounded-xl border p-4">
            <div className="text-sm text-muted">{label}</div>
            <div className="mt-1 flex items-baseline gap-2">
                <div className="text-2xl font-semibold text-ink">{value}</div>
                {trend && <div className={`text-sm ${color}`}>{arrow}</div>}
            </div>
        </div>
    );
}
