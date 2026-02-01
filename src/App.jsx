import { useEffect, useMemo, useState } from "react";
import { orders as rawOrders } from "./data/orders";
import { withRevenue, computeKpis, groupRevenueByDate } from "./utils/analytics";
import { pln } from "./utils/format";

import KpiCard from "./components/KpiCard";
import FiltersBar from "./components/FiltersBar";
import SalesLineChart from "./components/SalesLineChart";
import OrdersTable from "./components/OrdersTable";
import OrderDrawer from "./components/OrderDrawer";

export default function App() {
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState("all");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState(null);

  // Theme removed: light-only app

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const orders = useMemo(() => withRevenue(rawOrders), []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return orders.filter((r) => {
      const matchQ =
        !q ||
        r.id.toLowerCase().includes(q) ||
        r.customer.toLowerCase().includes(q) ||
        r.product.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);

      const matchChannel = channel === "all" ? true : r.channel === channel;
      const matchStatus = status === "all" ? true : r.status === status;

      return matchQ && matchChannel && matchStatus;
    });
  }, [orders, query, channel, status]);

  const kpis = useMemo(() => computeKpis(filtered), [filtered]);
  const chartData = useMemo(() => groupRevenueByDate(filtered), [filtered]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 space-y-12">
        {/* Header */}
        <header
          className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 text-slate-900 backdrop-blur supports-[backdrop-filter]:bg-white/50"
        >
          <div className="mx-auto w-full max-w-6xl px-6 py-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs text-slate-500">
                  NovaCup
                </div>
                <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                  Sales Dashboard UI
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-600">
                  Data-driven UI: KPIs, chart, and sortable orders table.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs text-slate-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                React • Tailwind • TanStack • Recharts
              </div>

              {/* theme toggle removed */}
            </div>
 
          </div>
        </header>

        {/* Filters */}
        <section className="rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-sm">
          <div className="mb-3">
            <div className="text-sm font-semibold">Filters</div>
            <div className="text-xs text-slate-600">Search and refine results</div>
          </div>

          <FiltersBar
            query={query}
            setQuery={setQuery}
            channel={channel}
            setChannel={setChannel}
            status={status}
            setStatus={setStatus}
          />
        </section>

        {/* KPIs */}
        <section className="space-y-3">
            <div>
              <div className="text-sm font-semibold">Overview</div>
              <div className="text-xs text-slate-600">Key metrics based on current filters</div>
            </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <KpiCard label="Revenue" value={pln(kpis.revenue)} sub="Paid orders only" />
            <KpiCard label="Orders" value={String(kpis.orders)} sub="Paid orders count" />
            <KpiCard label="Items sold" value={String(kpis.items)} sub="Total quantity" />
            <KpiCard label="Avg order value" value={pln(kpis.aov)} sub="Revenue / orders" />
          </div>
        </section>

        {/* Chart + Table */}
        <section className="space-y-3">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-semibold">Performance</div>
              <div className="text-xs text-slate-600">Revenue trend and order list</div>
            </div>
            <div className="text-xs text-slate-600">
              Showing{" "}
              <span className="text-slate-900">
                {filtered.length}
              </span>{" "}
              rows
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SalesLineChart data={chartData} />
            <OrdersTable rows={filtered} onRowClick={setSelected} />
          </div>
        </section>

        {selected && <OrderDrawer order={selected} onClose={() => setSelected(null)} />}

        <footer className="pt-4 text-xs text-slate-500">
          UI-first project with a data mindset — ready for API integration.
        </footer>
      </div>
    </div>
  );
}