import { FaExclamationTriangle } from "react-icons/fa";

import Modal from "../Modal/Modal";
import Button from "../Button/Button";

import "./ConfirmDialog.css";

export default function ConfirmDialog({

  isOpen,

  onClose,

  onConfirm,

  title = "Confirm Action",

  message = "Are you sure you want to continue?",

  confirmText = "Confirm",

  cancelText = "Cancel",

  danger = false,

}) {

  return (

    <Modal

      isOpen={isOpen}

      onClose={onClose}

      title={title}

      size="sm"

      footer={

        <>

          <Button

            variant="secondary"

            onClick={onClose}

          >

            {cancelText}

          </Button>

          <Button

            variant={danger ? "danger" : "primary"}

            onClick={() => {

              onConfirm();

              onClose();

            }}

          >

            {confirmText}

          </Button>

        </>

      }

    >

      <div className="af-confirm-dialog">

        <div className="af-confirm-icon">

          <FaExclamationTriangle />

        </div>

        <p>

          {message}

        </p>

      </div>

    </Modal>

  );

}