import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { pln } from "../utils/format";

function StatusBadge({ value }) {
  const v = String(value || "").toLowerCase();

  const map = {
    paid: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300",
    refunded: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300",
    pending: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300",
  };

  const cls = map[v] || "border-slate-400/30 bg-slate-500/10 text-slate-700 dark:border-slate-500/30 dark:bg-slate-500/10 dark:text-slate-300";

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] ${cls}`}>
      {v || "unknown"}
    </span>
  );
}

export default function OrdersTable({ rows, onRowClick }) {
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Order",
        cell: (info) => (
          <span className="font-medium text-slate-900">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: (info) => (
          <span className="text-slate-700">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "customer",
        header: "Customer",
        cell: (info) => (
          <span className="text-slate-700">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "channel",
        header: "Channel",
        cell: (info) => (
          <span className="uppercase tracking-wide text-slate-600 text-xs">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "product",
        header: "Product",
        cell: (info) => (
          <span className="text-slate-700">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "qty",
        header: () => <div className="text-right">Qty</div>,
        cell: (info) => <div className="text-right text-slate-700">{info.getValue()}</div>,
      },
      {
        accessorKey: "revenue",
        header: () => <div className="text-right">Revenue</div>,
        cell: (info) => <div className="text-right font-medium text-slate-900">{pln(info.getValue())}</div>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => <StatusBadge value={info.getValue()} />,
      },
    ],
    []
  );

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Orders
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Click row to open details
          </div>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Rows: <span className="text-slate-900 dark:text-slate-100">{rows.length}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur dark:bg-slate-900/80 dark:backdrop-blur">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-t border-slate-200 dark:border-slate-800">
                {hg.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      className={[
                        "px-4 py-3 text-left text-xs font-semibold",
                        "text-slate-600 dark:text-slate-400",
                        "border-b border-slate-200 dark:border-slate-800",
                        canSort ? "cursor-pointer select-none hover:text-slate-900 dark:hover:text-slate-200" : "",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sortDir === "asc" && <span className="text-slate-400 dark:text-slate-500">↑</span>}
                        {sortDir === "desc" && <span className="text-slate-400 dark:text-slate-500">↓</span>}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} onClick={() => onRowClick?.(row.original)} className="border-b border-slate-200 hover:bg-slate-50 transition cursor-pointer dark:border-slate-800 dark:hover:bg-slate-950/40">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400" colSpan={columns.length}>
                  No results for current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 text-[11px] text-slate-500 dark:text-slate-400">
        Tip: click a row to open the order drawer.
      </div>
    </div>
  );
}