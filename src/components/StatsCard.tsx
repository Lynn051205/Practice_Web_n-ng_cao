type StatsCardProps = {
  title: string;
  value: string;
  accent: string;
  helper: string;
};

export function StatsCard({ title, value, accent, helper }: StatsCardProps) {
  return (
    <article className="stats-card" style={{ borderTopColor: accent }}>
      <div className="stats-card__header">
        <span className="stats-card__title">{title}</span>
        <span className="stats-card__dot" style={{ backgroundColor: accent }} />
      </div>
      <div className="stats-card__value">{value}</div>
      <div className="stats-card__helper">{helper}</div>
    </article>
  );
}
