const CHANNEL_OPTIONS = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "app", label: "App" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "refunded", label: "Refunded" },
];

function FieldLabel({ children }) {
  return (
    <div className="text-xs font-medium text-slate-700 dark:text-slate-200">
      {children}
    </div>
  );
}

function SelectField({ value, onChange, options, ariaLabel }) {
  return (
    <div className="relative">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={[
          "w-full rounded-2xl border appearance-none pr-10",
          "border-slate-200 bg-white text-slate-900",
          "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100",
          "px-4 py-3 text-sm outline-none",
          "focus:border-slate-300 dark:focus:border-slate-600",
        ].join(" ")}
      >
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100"
          >
            {opt.label}
          </option>
        ))}
      </select>

      <svg
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default function FiltersBar({
  query,
  setQuery,
  channel,
  setChannel,
  status,
  setStatus,
}) {
  const hasFilters =
    query.trim().length > 0 || channel !== "all" || status !== "all";

  const reset = () => {
    setQuery("");
    setChannel("all");
    setStatus("all");
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-start">
        {/* Search */}
        <div className="min-w-0">
          <FieldLabel>Search</FieldLabel>

          <div className="relative group mt-2">
            <div className="pointer-events-none absolute -inset-0.5 rounded-2xl opacity-0 blur-md transition
              group-hover:opacity-40 group-focus-within:opacity-60
              bg-gradient-to-r from-blue-500/30 via-indigo-500/20 to-cyan-500/30"
            />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Customer / product / order id..."
              className={[
                "relative w-full rounded-2xl border",
                "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400",
                "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500",
                "px-4 py-3 text-sm outline-none",
                "focus:border-slate-300 dark:focus:border-slate-600",
              ].join(" ")}
            />
          </div>

          <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
            Tip: type "latte", "ORD-1001", "Adam", etc.
          </div>
        </div>

        {/* Channel */}
        <div className="min-w-0">
          <FieldLabel>Channel</FieldLabel>
          <div className="mt-2">
            <SelectField
              ariaLabel="Channel"
              value={channel}
              onChange={setChannel}
              options={CHANNEL_OPTIONS}
            />
          </div>
        </div>

        {/* Status */}
        <div className="min-w-0">
          <FieldLabel>Status</FieldLabel>
          <div className="mt-2">
            <SelectField
              ariaLabel="Status"
              value={status}
              onChange={setStatus}
              options={STATUS_OPTIONS}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-slate-600">
          {hasFilters ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
              Filters active
            </span>
          ) : (
            "No filters"
          )}
        </div>

        <button
          type="button"
          onClick={reset}
          disabled={!hasFilters}
          className={[
            "inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm transition",
            hasFilters
              ? "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
              : "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed",
          ].join(" ")}
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}