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
    paid: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    refunded: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    pending: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  };

  const cls = map[v] || "bg-slate-500/15 text-slate-300 border-slate-500/30";

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
          <span className="font-medium text-slate-100">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: (info) => (
          <span className="text-slate-200">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "customer",
        header: "Customer",
        cell: (info) => (
          <span className="text-slate-200">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "channel",
        header: "Channel",
        cell: (info) => (
          <span className="uppercase tracking-wide text-slate-300 text-xs">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "product",
        header: "Product",
        cell: (info) => (
          <span className="text-slate-200">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "qty",
        header: () => <div className="text-right">Qty</div>,
        cell: (info) => <div className="text-right text-slate-200">{info.getValue()}</div>,
      },
      {
        accessorKey: "revenue",
        header: () => <div className="text-right">Revenue</div>,
        cell: (info) => (
          <div className="text-right font-medium text-slate-100">
            {pln(info.getValue())}
          </div>
        ),
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
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <div className="text-sm font-semibold text-slate-100">Orders</div>
          <div className="text-xs text-slate-500">Click row to open details</div>
        </div>
        <div className="text-xs text-slate-500">
          Rows: <span className="text-slate-200">{rows.length}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-t border-slate-800">
                {hg.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      className={[
                        "px-4 py-3 text-left text-xs font-semibold text-slate-300",
                        "border-b border-slate-800",
                        canSort ? "cursor-pointer select-none hover:text-slate-100" : "",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sortDir === "asc" && <span className="text-slate-500">↑</span>}
                        {sortDir === "desc" && <span className="text-slate-500">↓</span>}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row.original)}
                className="border-b border-slate-800/70 hover:bg-slate-950/40 transition cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td className="px-4 py-10 text-center text-sm text-slate-500" colSpan={columns.length}>
                  No results for current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 text-[11px] text-slate-500">
        Tip: click a row to open the order drawer.
      </div>
    </div>
  );
}