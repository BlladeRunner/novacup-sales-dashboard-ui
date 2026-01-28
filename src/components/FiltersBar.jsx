export default function FiltersBar({ query, setQuery, channel, setChannel, status, setStatus }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-1 flex-col gap-2 md:flex-row">
        <div className="flex-1">
          <label className="text-xs text-slate-400">Search</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="customer / product / id…"
            className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-700"
          />
        </div>

        <div className="md:w-44">
          <label className="text-xs text-slate-400">Channel</label>
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-700"
          >
            <option value="all">All</option>
            <option value="web">Web</option>
            <option value="app">App</option>
          </select>
        </div>

        <div className="md:w-44">
          <label className="text-xs text-slate-400">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-700"
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      <div className="text-xs text-slate-500">NovaCup • Sales Dashboard UI</div>
    </div>
  );
}