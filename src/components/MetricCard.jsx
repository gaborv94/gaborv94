export default function MetricCard({ title, value, subtitle, icon }) {
  return (
    <article className="card metric h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between gap-3">
          <span className="text-uppercase small text-orange">{title}</span>
          <span aria-hidden="true">{icon}</span>
        </div>
        <h3 className="mt-2 mb-1">{value}</h3>
        <p className="text-secondary mb-0">{subtitle}</p>
      </div>
    </article>
  );
}
