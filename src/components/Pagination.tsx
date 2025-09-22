import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 0) return null;

  // Generate page numbers with dots logic
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l: number | null = null;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l !== null) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const pages = getPageNumbers();

  return (
    <nav
      className="inline-flex items-center justify-center space-x-1 mt-6"
      aria-label="Pagination Navigation"
    >
      {/* Left Arrow (Prev) */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
        }`}
        aria-label="Previous Page"
      >
        {/* Left Arrow */}
        <svg
          className="h-5 w-5 inline-block"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Page Numbers */}
      {pages.map((page, idx) =>
        page === "..." ? (
          <span
            key={`dots-${idx}`}
            className="px-3 py-2 select-none text-gray-500"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(Number(page))}
            aria-current={currentPage === page ? "page" : undefined}
            className={`px-4 py-2 rounded-md border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              currentPage === page
                ? "bg-blue-600 border-blue-600 text-white cursor-default"
                : "border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Right Arrow (Next) */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
        }`}
        aria-label="Next Page"
      >
        {/* Right Arrow */}
        <svg
          className="h-5 w-5 inline-block"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;
