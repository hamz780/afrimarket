import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import useSearch from "./useSearch";
import SearchResults from "./SearchResults";

import "./Search.css";

export default function SearchBar() {

  const [query, setQuery] = useState("");

  const results = useSearch(query);


  return (
    <div className="search-wrapper">

      <div className="search-box">

        <input
          type="text"
          placeholder="Search products, brands, categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button>
          <FaSearch />
        </button>

      </div>


      {query && (
        <SearchResults
          results={results}
        />
      )}

    </div>
  );
}