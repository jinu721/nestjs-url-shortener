import React from "react";
import { MoreHorizontal } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  className = ""
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 1;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    rangeWithDots.push(1);

    if (currentPage > delta + 2) {
      rangeWithDots.push("...");
    }

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      if (i !== 1 && i !== totalPages) {
        range.push(i);
      }
    }

    rangeWithDots.push(...range);

    if (currentPage < totalPages - delta - 1) {
      rangeWithDots.push("...");
    }

    if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
    >
      <div className="flex items-center space-x-2 text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-full">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <span>
          {currentPage}/{totalCount} 
        </span>
      </div>

      <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 border-r border-gray-200"
        >
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 border-l-2 border-t-2 border-gray-400 transform -translate-x-0.5"></div>
            <span className="hidden sm:inline">Prev</span>
          </div>
        </button>

        <div className="flex items-center">
          {visiblePages.map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <div className="px-3 py-2 text-gray-400">
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative ${
                    page === currentPage
                      ? "text-white bg-blue-500 shadow-lg"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  {page === currentPage && (
                    <div className="absolute inset-0 bg-blue-500 rounded-none animate-pulse opacity-75"></div>
                  )}
                  <span className="relative z-10">{page}</span>
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 border-l border-gray-200"
        >
          <div className="flex items-center space-x-1">
            <span className="hidden sm:inline">Next</span>
            <div className="w-2 h-2 border-r-2 border-t-2 border-gray-400 transform translate-x-0.5"></div>
          </div>
        </button>
      </div>

      <div className="sm:hidden flex items-center space-x-2">
        <span className="text-xs text-gray-500">Jump to:</span>
        <select
          value={currentPage}
          onChange={(e) => onPageChange(parseInt(e.target.value))}
          className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              Page {page}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default React.memo(Pagination);

