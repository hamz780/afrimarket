import "./Pagination.css";

export default function Pagination({

  currentPage,

  totalPages,

  onPageChange,

}) {

  if (totalPages <= 1) return null;

  const pages = [];

  for (

    let page = 1;

    page <= totalPages;

    page++

  ) {

    pages.push(page);

  }

  return (

    <div className="af-pagination">

      <button

        className="af-page-btn"

        disabled={currentPage === 1}

        onClick={() =>

          onPageChange(currentPage - 1)

        }

      >

        Previous

      </button>

      {pages.map((page) => (

        <button

          key={page}

          className={`af-page-btn ${
            currentPage === page
              ? "active"
              : ""
          }`}

          onClick={() =>

            onPageChange(page)

          }

        >

          {page}

        </button>

      ))}

      <button

        className="af-page-btn"

        disabled={

          currentPage === totalPages

        }

        onClick={() =>

          onPageChange(currentPage + 1)

        }

      >

        Next

      </button>

    </div>

  );

}