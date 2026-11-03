import "./Pagination.css";

import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function Pagination({

  currentPage,

  totalPages,

  onPageChange,

}) {

  if (totalPages <= 1) return null;

  return (

    <div className="ui-pagination">

      <button

        className="page-btn"

        disabled={currentPage === 1}

        onClick={() =>
          onPageChange(currentPage - 1)
        }

      >

        <FaChevronLeft />

      </button>

      {Array.from(

        { length: totalPages },

        (_, index) => (

          <button

            key={index}

            className={`page-btn ${
              currentPage === index + 1
                ? "active"
                : ""
            }`}

            onClick={() =>
              onPageChange(index + 1)
            }

          >

            {index + 1}

          </button>

        )

      )}

      <button

        className="page-btn"

        disabled={
          currentPage === totalPages
        }

        onClick={() =>
          onPageChange(currentPage + 1)
        }

      >

        <FaChevronRight />

      </button>

    </div>

  );

}