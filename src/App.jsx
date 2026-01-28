import { useMemo, useState } from "react";
import { orders as rawOrders } from "./data/orders";
import { withRevenue, computeKpis, groupRevenueByDate } from "./utils/analytics";
import { pln } from "./utils/format";

import KpiCard from "./components/KpiCard";
import FiltersBar from "./components/FiltersBar";
import SalesLineChart from "./components/SalesLineChart";
import OrdersTable from "./components/OrdersTable";

export default function App() {
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState("all");
  const [status, setStatus] = useState("all");

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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs text-slate-400">NovaCup</div>
              <h1 className="text-2xl font-semibold">Sales Dashboard UI</h1>
              <p className="mt-1 text-sm text-slate-500">Data-driven UI: KPIs, chart, and sortable orders table.</p>
            </div>
            <div className="rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1 text-xs text-slate-300">
              React + Tailwind + TanStack Table
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        <FiltersBar
          query={query}
          setQuery={setQuery}
          channel={channel}
          setChannel={setChannel}
          status={status}
          setStatus={setStatus}
        />

        <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <KpiCard label="Revenue" value={pln(kpis.revenue)} sub="Paid orders only" />
          <KpiCard label="Orders" value={String(kpis.orders)} sub="Paid orders count" />
          <KpiCard label="Items sold" value={String(kpis.items)} sub="Total quantity" />
          <KpiCard label="Avg order value" value={pln(kpis.aov)} sub="Revenue / orders" />
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SalesLineChart data={chartData} />
          <OrdersTable rows={filtered} />
        </section>

        <footer className="py-6 text-xs text-slate-600">
          UI-first project with a data mindset — ready for API integration.
        </footer>
      </main>
    </div>
  );
}