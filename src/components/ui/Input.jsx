import "./Input.css";

export default function Input({

  label,

  error,

  className = "",

  ...props

}) {

  return (

    <div className="ui-input-group">

      {label && (

        <label className="ui-input-label">

          {label}

        </label>

      )}

      <input

        className={`ui-input ${className}`}

        {...props}

      />

      {error && (

        <small className="ui-input-error">

          {error}

        </small>

      )}

    </div>

  );

}