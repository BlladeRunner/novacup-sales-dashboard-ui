import { useMemo, useState } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { pln } from "../utils/format";

const col = createColumnHelper();

export default function OrdersTable({ rows }) {
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      col.accessor("id", { header: "Order", cell: (info) => <span className="font-mono text-xs">{info.getValue()}</span> }),
      col.accessor("date", { header: "Date" }),
      col.accessor("customer", { header: "Customer" }),
      col.accessor("channel", { header: "Channel" }),
      col.accessor("product", { header: "Product" }),
      col.accessor("quantity", { header: "Qty" }),
      col.accessor("revenue", { header: "Revenue", cell: (info) => pln(info.getValue()) }),
      col.accessor("status", {
        header: "Status",
        cell: (info) => {
          const v = info.getValue();
          const cls =
            v === "paid"
              ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
              : "bg-rose-500/10 text-rose-300 border-rose-500/20";
          return <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs ${cls}`}>{v}</span>;
        },
      }),
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
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="mb-3">
        <div className="text-sm font-semibold text-slate-100">Orders</div>
        <div className="text-xs text-slate-500">Click column headers to sort</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-400">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    onClick={h.column.getToggleSortingHandler()}
                    className="cursor-pointer select-none px-3 py-2 hover:text-slate-200"
                  >
                    {flexRender(h.column.columnDef.header, h.getContext())}
                    {h.column.getIsSorted() === "asc" ? " ▲" : ""}
                    {h.column.getIsSorted() === "desc" ? " ▼" : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-slate-800">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-950/40">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-2 text-slate-100">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 ? (
          <div className="py-10 text-center text-sm text-slate-500">No results. Try changing filters.</div>
        ) : null}
      </div>
    </div>
  );
}