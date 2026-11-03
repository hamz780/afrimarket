import "./Select.css";

export default function Select({

  label,

  error,

  children,

  className = "",

  ...props

}) {

  return (

    <div className="ui-select-group">

      {label && (

        <label className="ui-select-label">

          {label}

        </label>

      )}

      <select

        className={`ui-select ${className}`}

        {...props}

      >

        {children}

      </select>

      {error && (

        <small className="ui-select-error">

          {error}

        </small>

      )}

    </div>

  );

}