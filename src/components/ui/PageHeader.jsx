import "./PageHeader.css";

export default function PageHeader({

  title,

  subtitle,

  action,

}) {

  return (

    <div className="ui-page-header">

      <div className="ui-page-header-content">

        <h1>

          {title}

        </h1>

        {subtitle && (

          <p>

            {subtitle}

          </p>

        )}

      </div>

      {action && (

        <div className="ui-page-header-action">

          {action}

        </div>

      )}

    </div>

  );

}