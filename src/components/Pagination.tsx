interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  onItemsPerPageChange: (size: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage, onItemsPerPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="py-6">
      {/* All controls in one row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: Results count and page size selector */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-slate-400">
            Showing {startIndex}-{endIndex} of {totalItems} creators
          </span>
          
          {/* Page size selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-slate-400">Per page:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="px-3 py-2 rounded-lg bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 shadow-sm hover:shadow-lg text-slate-900 dark:text-white text-sm font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
            </select>
          </div>
        </div>

        {/* Right: Pagination controls */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 shadow-sm hover:shadow-lg text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <i className="ph ph-caret-left"></i>
            Previous
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                currentPage === page
                  ? 'bg-white/90 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/40 text-slate-900 dark:text-white shadow-sm'
                  : 'bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 shadow-sm hover:shadow-lg text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-white/20'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 shadow-sm hover:shadow-lg text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            Next
            <i className="ph ph-caret-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

