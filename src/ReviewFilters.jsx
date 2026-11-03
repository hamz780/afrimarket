import { FaSearch, FaFilter } from "react-icons/fa";

import { useReviews } from "../../context/ReviewContext";

import "./ReviewFilters.css";

export default function ReviewFilters() {
  const {
    search,
    setSearch,

    ratingFilter,
    setRatingFilter,

    statusFilter,
    setStatusFilter,
  } = useReviews();

  return (
    <div className="review-filters">

      <div className="review-search">

        <FaSearch />

        <input
          type="text"
          placeholder="Search reviews..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <div className="review-select">

        <FaFilter />

        <select
          value={ratingFilter}
          onChange={(e) =>
            setRatingFilter(e.target.value)
          }
        >
          <option value="All">All Ratings</option>
          <option value="5">★★★★★</option>
          <option value="4">★★★★☆</option>
          <option value="3">★★★☆☆</option>
          <option value="2">★★☆☆☆</option>
          <option value="1">★☆☆☆☆</option>
        </select>

      </div>

      <div className="review-select">

        <FaFilter />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="Published">Published</option>
          <option value="Reported">Reported</option>
        </select>

      </div>

    </div>
  );
}