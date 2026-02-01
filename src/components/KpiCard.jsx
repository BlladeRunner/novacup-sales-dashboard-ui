export default function KpiCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl border p-5 shadow-sm border-slate-200 bg-white/70">
      <div className="text-xs text-slate-600">{label}</div>

      <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{value}</div>

      {sub ? <div className="mt-2 text-xs text-slate-500">{sub}</div> : null}
    </div>
  );
}