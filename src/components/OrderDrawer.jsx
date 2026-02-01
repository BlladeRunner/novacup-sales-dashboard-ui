import { pln } from "../utils/format";

export default function OrderDrawer({ open, order, onClose }) {
  if (!open || !order) return null;

  const statusCls =
    order.status === "paid"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
      : "border-rose-500/30 bg-rose-500/10 text-rose-700";

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <button aria-label="Close drawer" onClick={onClose} className="absolute inset-0 bg-black/6" />

      {/* panel */}
      <aside className="absolute right-0 top-0 h-full w-full max-w-md border-l border-slate-200 bg-white p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-slate-400">Order details</div>
            <div className="mt-1 font-mono text-sm text-slate-200">{order.id}</div>
          </div>

          <button onClick={onClose} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 hover:bg-slate-50">Close</button>
        </div>

        <div className="mt-5 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-xs text-slate-500">Customer</div>
            <div className="mt-1 text-base text-slate-900">{order.customer}</div>
            <div className="mt-2 text-xs text-slate-500">Date: {order.date}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-xs text-slate-500">Channel</div>
              <div className="mt-1 text-sm text-slate-900">{order.channel}</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-xs text-slate-500">Status</div>
              <div className="mt-1">
                <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs ${statusCls}`}>{order.status}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-xs text-slate-500">Product</div>
            <div className="mt-1 text-base text-slate-900">{order.product}</div>
            <div className="mt-2 text-xs text-slate-500">Category: {order.category}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-xs text-slate-500">Quantity</div>
              <div className="mt-1 text-sm text-slate-900">{order.quantity}</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-xs text-slate-500">Revenue</div>
              <div className="mt-1 text-sm text-slate-900">{pln(order.revenue)}</div>
              <div className="mt-1 text-xs text-slate-500">Price: {pln(order.price)} × {order.quantity}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-xs text-slate-600">
          Tip: press <span className="text-slate-400">ESC</span> to close.
        </div>
      </aside>
    </div>
  );
}