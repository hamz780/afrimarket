import "./Badge.css";

export default function Badge({

  children,

  variant = "primary",

  icon,

  className = "",

}) {

  return (

    <span className={`ui-badge ${variant} ${className}`}>

      {icon && (

        <span className="ui-badge-icon">

          {icon}

        </span>

      )}

      {children}

    </span>

  );

}