import "./Modal.css";

import { FaTimes } from "react-icons/fa";

export default function Modal({

  open,

  title,

  children,

  footer,

  onClose,

}) {

  if (!open) return null;

  return (

    <div
      className="ui-modal-overlay"
      onClick={onClose}
    >

      <div
        className="ui-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="ui-modal-header">

          <h2>{title}</h2>

          <button
            className="ui-modal-close"
            onClick={onClose}
          >

            <FaTimes />

          </button>

        </div>

        <div className="ui-modal-body">

          {children}

        </div>

        {footer && (

          <div className="ui-modal-footer">

            {footer}

          </div>

        )}

      </div>

    </div>

  );

}