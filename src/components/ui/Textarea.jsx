import "./Textarea.css";

export default function Textarea({

  label,

  error,

  className = "",

  rows = 5,

  ...props

}) {

  return (

    <div className="ui-textarea-group">

      {label && (

        <label className="ui-textarea-label">

          {label}

        </label>

      )}

      <textarea

        rows={rows}

        className={`ui-textarea ${className}`}

        {...props}

      />

      {error && (

        <small className="ui-textarea-error">

          {error}

        </small>

      )}

    </div>

  );

}