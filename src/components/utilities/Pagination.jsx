import React from "react";

const getVisiblePages = (currentPage, totalPages) => {
  const pages = [];
  const delta = 1; // how many pages to show either side of the current one

  const rangeStart = Math.max(2, currentPage - delta);
  const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

  pages.push(1);

  if (rangeStart > 2) {
    pages.push("...");
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  if (rangeEnd < totalPages - 1) {
    pages.push("...");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages < 2) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-2 bg-gray-100 rounded-lg disabled:opacity-40"
      >
        {"<"}
      </button>

      {getVisiblePages(currentPage, totalPages).map((page, i) =>
        page === "..." ? (
          <span key={`gap-${i}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl font-bold ${
              currentPage === page
                ? "bg-[#FBF201] text-gray-900"
                : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-2 bg-gray-100 rounded-lg disabled:opacity-40"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
