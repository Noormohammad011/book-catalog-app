import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const getPageRange = () => {
    const rangeSize = 2;

    if (totalPages <= rangeSize) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= rangeSize) {
      return Array.from({ length: rangeSize }, (_, index) => index + 1);
    } else {
      return [1, 2];
    }
  };

  return (
    <div className="pagination flex items-center justify-center space-x-4 mt-8">
      {currentPage !== 1 && (
        <button
          className="page-link px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
      )}
      {getPageRange().map((pageNumber) => (
        <button
          key={pageNumber}
          className={`page-link px-4 py-2 rounded-lg ${
            pageNumber === currentPage
              ? 'bg-primary text-white'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800'
          }`}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {currentPage !== totalPages && totalPages > 2 && (
        <button
          className="page-link px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
