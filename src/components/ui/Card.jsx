import "./Card.css";

export default function Card({

  title,

  subtitle,

  children,

  className = "",

  headerAction,

}) {

  return (

    <div className={`ui-card ${className}`}>

      {(title || subtitle || headerAction) && (

        <div className="ui-card-header">

          <div>

            {title && (

              <h3 className="ui-card-title">

                {title}

              </h3>

            )}

            {subtitle && (

              <p className="ui-card-subtitle">

                {subtitle}

              </p>

            )}

          </div>

          {headerAction && (

            <div>

              {headerAction}

            </div>

          )}

        </div>

      )}

      <div className="ui-card-body">

        {children}

      </div>

    </div>

  );

}