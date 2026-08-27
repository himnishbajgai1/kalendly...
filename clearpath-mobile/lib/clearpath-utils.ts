export function dateKey(date: Date | string) {
  return new Date(date).toLocaleDateString("en-CA");
}

export function dayCount(startedAt: string, now = new Date()) {
  const start = new Date(startedAt);
  const startMidnight = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.max(1, Math.floor((todayMidnight - startMidnight) / 86_400_000) + 1);
}

export function formatShortDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
