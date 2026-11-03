import "./StatsCard.css";

export default function StatsCard({
  title,
  value,
  icon,
  change,
  color = "#16a34a"
}) {

  return (

    <div className="stats-card">

      <div
        className="stats-icon"
        style={{ background: color }}
      >
        {icon}
      </div>

      <div className="stats-content">

        <span className="stats-title">
          {title}
        </span>

        <h2 className="stats-value">
          {value}
        </h2>

        <small className="stats-change">
          {change}
        </small>

      </div>

    </div>

  );

}