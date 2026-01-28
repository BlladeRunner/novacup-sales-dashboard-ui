export default function FiltersBar({
  query,
  setQuery,
  channel,
  setChannel,
  status,
  setStatus,
}) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {/* Search */}
      <div className="md:col-span-1">
        <label className="block text-xs font-medium text-slate-300">Search</label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Customer / product / order id..."
          className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-slate-600"
        />
      </div>

      {/* Channel */}
      <div className="md:col-span-1">
        <label className="block text-xs font-medium text-slate-300">Channel</label>
        <select
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-600"
        >
          <option value="all">All</option>
          <option value="web">web</option>
          <option value="app">app</option>
        </select>
      </div>

      {/* Status */}
      <div className="md:col-span-1">
        <label className="block text-xs font-medium text-slate-300">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-600"
        >
          <option value="all">All</option>
          <option value="paid">paid</option>
          <option value="refunded">refunded</option>
        </select>
      </div>
    </div>
  );
}