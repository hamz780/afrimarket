import "./SearchBar.css";

import { FaSearch, FaTimes } from "react-icons/fa";

export default function SearchBar({

  value,

  onChange,

  placeholder = "Search...",

  className = "",

}) {

  return (

    <div className={`ui-search ${className}`}>

      <FaSearch className="ui-search-icon" />

      <input

        type="text"

        value={value}

        onChange={onChange}

        placeholder={placeholder}

        className="ui-search-input"

      />

      {value && (

        <button

          type="button"

          className="ui-search-clear"

          onClick={() =>

            onChange({

              target: {

                value: "",

              },

            })

          }

        >

          <FaTimes />

        </button>

      )}

    </div>

  );

}