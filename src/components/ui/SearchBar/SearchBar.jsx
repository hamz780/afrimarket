import { FaSearch, FaTimes } from "react-icons/fa";

import "./SearchBar.css";

export default function SearchBar({

  value,

  onChange,

  placeholder = "Search...",

  onClear,

}) {

  return (

    <div className="af-searchbar">

      <FaSearch className="af-search-icon" />

      <input

        type="text"

        value={value}

        placeholder={placeholder}

        onChange={(e) => onChange(e.target.value)}

      />

      {

        value && (

          <button

            type="button"

            className="af-search-clear"

            onClick={onClear}

          >

            <FaTimes />

          </button>

        )

      }

    </div>

  );

}