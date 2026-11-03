import "./StatsCard.css";

export default function StatsCard({

  title,

  value,

  icon,

  color = "primary",

  change,

  subtitle,

}) {

  return (

    <div className="af-stats-card">

      <div className="af-stats-header">

        <div className={`af-stats-icon ${color}`}>

          {icon}

        </div>

      </div>

      <div className="af-stats-body">

        <h4>

          {title}

        </h4>

        <h2>

          {value}

        </h2>

        {

          subtitle && (

            <p className="af-stats-subtitle">

              {subtitle}

            </p>

          )

        }

        {

          change && (

            <span

              className={`af-stats-change ${

                change.startsWith("-")

                  ? "negative"

                  : "positive"

              }`}

            >

              {change}

            </span>

          )

        }

      </div>

    </div>

  );

}