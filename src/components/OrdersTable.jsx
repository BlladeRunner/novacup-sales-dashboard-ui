import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { pln } from "../utils/format";

function StatusPill({ value }) {
  const isPaid = String(value).toLowerCase() === "paid";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        isPaid
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
          : "border-amber-500/30 bg-amber-500/10 text-amber-200",
      ].join(" ")}
    >
      {String(value)}
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
          <span className="font-mono text-xs text-slate-200">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: (info) => (
          <span className="text-sm text-slate-200">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "customer",
        header: "Customer",
        cell: (info) => (
          <span className="text-sm text-slate-100">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "channel",
        header: "Channel",
        cell: (info) => (
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "product",
        header: "Product",
        cell: (info) => (
          <span className="text-sm text-slate-100">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "qty",
        header: "Qty",
        cell: (info) => (
          <span className="text-sm text-slate-200">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "revenue",
        header: "Revenue",
        cell: (info) => (
          <span className="text-sm text-slate-200">{pln(info.getValue())}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => <StatusPill value={info.getValue()} />,
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
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <div className="text-sm font-semibold text-slate-100">Orders</div>
          <div className="text-xs text-slate-500">
            Click column headers to sort
          </div>
        </div>

        <div className="text-xs text-slate-500">
          Rows: <span className="text-slate-200">{rows.length}</span>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="min-w-[920px] w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-slate-800">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted(); // false | 'asc' | 'desc'

                  return (
                    <th
                      key={header.id}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      className={[
                        "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300",
                        canSort ? "cursor-pointer select-none hover:text-slate-100" : "",
                      ].join(" ")}
                      title={canSort ? "Sort" : undefined}
                    >
                      <div className="inline-flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {sorted ? (
                          <span className="text-[10px] text-slate-400">
                            {sorted === "asc" ? "▲" : "▼"}
                          </span>
                        ) : null}
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
                className="border-b border-slate-800/70 hover:bg-slate-800/20 cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  No orders match current filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 text-xs text-slate-500">
        Tip: click a row to open the order drawer.
      </div>
    </div>
  );
}