import "./Button.css";

export default function Button({

  children,

  type = "button",

  variant = "primary",

  size = "md",

  loading = false,

  disabled = false,

  icon,

  onClick,

  className = "",

}) {

  return (

    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`ui-button ${variant} ${size} ${className}`}
    >

      {loading ? (

        <span className="button-loader"></span>

      ) : (

        <>

          {icon && (
            <span className="button-icon">
              {icon}
            </span>
          )}

          <span>{children}</span>

        </>

      )}

    </button>

  );

}