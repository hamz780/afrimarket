import { FaBoxOpen } from "react-icons/fa";

import Button from "../Button/Button";

import "./EmptyState.css";

export default function EmptyState({

  icon = <FaBoxOpen />,

  title = "Nothing here",

  description = "There is no data available.",

  buttonText,

  onButtonClick,

}) {

  return (

    <div className="af-empty-state">

      <div className="af-empty-icon">

        {icon}

      </div>

      <h2>

        {title}

      </h2>

      <p>

        {description}

      </p>

      {

        buttonText && (

          <Button

            onClick={onButtonClick}

          >

            {buttonText}

          </Button>

        )

      }

    </div>

  );

}