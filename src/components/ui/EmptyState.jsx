import "./EmptyState.css";

import { FaBoxOpen } from "react-icons/fa";

export default function EmptyState({

  icon = <FaBoxOpen />,

  title = "Nothing Here",

  message = "No data available.",

  action,

}) {

  return (

    <div className="ui-empty-state">

      <div className="empty-icon">

        {icon}

      </div>

      <h2>

        {title}

      </h2>

      <p>

        {message}

      </p>

      {action && (

        <div className="empty-action">

          {action}

        </div>

      )}

    </div>

  );

}