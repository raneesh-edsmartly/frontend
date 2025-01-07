import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-8">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`mx-1 px-4 py-2 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;