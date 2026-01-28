export function withRevenue(rows) {
  return rows.map((r) => ({ ...r, revenue: Number((r.price * r.quantity).toFixed(2)) }));
}

export function computeKpis(rows) {
  const paid = rows.filter((r) => r.status === "paid");
  const revenue = paid.reduce((s, r) => s + r.revenue, 0);
  const orders = paid.length;
  const items = paid.reduce((s, r) => s + r.quantity, 0);
  const aov = orders ? revenue / orders : 0;
  return { revenue, orders, items, aov };
}

export function groupRevenueByDate(rows) {
  const paid = rows.filter((r) => r.status === "paid");
  const map = new Map();
  for (const r of paid) map.set(r.date, (map.get(r.date) ?? 0) + r.revenue);

  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, revenue]) => ({ date, revenue: Number(revenue.toFixed(2)) }));
}