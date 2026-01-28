export default function KpiCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/70 to-slate-900/30 p-5 shadow-sm">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-100">
        {value}
      </div>
      {sub ? <div className="mt-2 text-xs text-slate-500">{sub}</div> : null}
    </div>
  );
}