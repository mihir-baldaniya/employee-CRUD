
import { Pagination as BootstrapPagination } from "react-bootstrap";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination-container">
      <BootstrapPagination>
        <BootstrapPagination.Prev
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />

        {Array.from({ length: totalPages }, (_, index) => (
          <BootstrapPagination.Item
            key={index + 1}
            active={currentPage === index + 1}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </BootstrapPagination.Item>
        ))}

        <BootstrapPagination.Next
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </BootstrapPagination>
    </div>
  );
}

export default Pagination;
