import React, { useEffect, useState } from 'react';
import './Pagination.css';

export default function Pagination({
  totalItems,
  currentPage,
  onPageChange,
  pageSize = 5,
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const [pageInput, setPageInput] = useState(String(currentPage));

  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  if (totalItems <= pageSize) return null;

  const goToPage = (page) => {
    const nextPage = Math.min(Math.max(1, page), totalPages);
    onPageChange(nextPage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestedPage = Number.parseInt(pageInput, 10);
    if (Number.isNaN(requestedPage)) {
      setPageInput(String(currentPage));
      return;
    }
    goToPage(requestedPage);
  };

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="pagination-btn"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span className="pagination-status">
        Page {currentPage} of {totalPages}
      </span>

      <form className="pagination-jump" onSubmit={handleSubmit}>
        <label htmlFor="pagination-page">Go to</label>
        <input
          id="pagination-page"
          type="number"
          min="1"
          max={totalPages}
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
        />
        <button type="submit" className="pagination-btn">
          Go
        </button>
      </form>

      <button
        type="button"
        className="pagination-btn"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  );
}
