import "./StatsCard.css";

export default function StatsCard({

  title,

  value,

  icon,

  color = "green",

  change,

  className = "",

}) {

  return (

    <div className={`ui-stats-card ${className}`}>

      <div className="stats-top">

        <div className={`stats-icon ${color}`}>

          {icon}

        </div>

        {change && (

          <span className="stats-change">

            {change}

          </span>

        )}

      </div>

      <div className="stats-content">

        <h4>{title}</h4>

        <h2>{value}</h2>

      </div>

    </div>

  );

}