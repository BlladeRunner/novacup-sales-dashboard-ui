export default function KpiCard({ label, value, sub }) {
  return (
    <div className="
      rounded-2xl border p-5 shadow-sm
      border-slate-200 bg-white
      dark:border-slate-800 dark:bg-slate-900
    ">
      <div className="text-xs text-slate-600 dark:text-slate-400">{label}</div>

      <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        {value}
      </div>

      {sub ? (
        <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">{sub}</div>
      ) : null}
    </div>
  );
}