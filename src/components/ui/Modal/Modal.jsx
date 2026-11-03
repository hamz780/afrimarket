import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

import "./Modal.css";

export default function Modal({

  isOpen,

  onClose,

  title,

  children,

  size = "md",

  footer,

  closeOnOverlay = true,

}) {

  useEffect(() => {

    function handleEscape(e) {

      if (e.key === "Escape") {

        onClose();

      }

    }

    if (isOpen) {

      document.addEventListener(

        "keydown",

        handleEscape

      );

      document.body.style.overflow = "hidden";

    }

    return () => {

      document.removeEventListener(

        "keydown",

        handleEscape

      );

      document.body.style.overflow = "";

    };

  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (

    <div

      className="af-modal-overlay"

      onClick={() => {

        if (closeOnOverlay) onClose();

      }}

    >

      <div

        className={`af-modal ${size}`}

        onClick={(e) => e.stopPropagation()}

      >

        <div className="af-modal-header">

          <h2>{title}</h2>

          <button

            className="af-modal-close"

            onClick={onClose}

          >

            <FaTimes />

          </button>

        </div>

        <div className="af-modal-body">

          {children}

        </div>

        {

          footer && (

            <div className="af-modal-footer">

              {footer}

            </div>

          )

        }

      </div>

    </div>

  );

}