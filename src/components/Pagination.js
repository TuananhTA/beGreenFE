const Pagination = ({ currentPage, totalPages, currentSize, onPageChange, onPageSizeChange }) => {
    const maxPageNumbers = 5; // Số trang tối đa hiển thị
    let pages = [];

    if (totalPages <= maxPageNumbers) {
        // Hiển thị toàn bộ nếu số trang nhỏ
        pages = [...Array(totalPages).keys()].map(i => i + 1);
    } else {
        // Hiển thị trang đầu, cuối và một số trang gần currentPage
        if (currentPage <= 2) {
            pages = [1, 2, 3, "...", totalPages];
        } else if (currentPage >= totalPages - 1) {
            pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
        } else {
            pages = [1, "...", currentPage, currentPage + 1, "...", totalPages];
        }
    }

    return (
        <div className="d-flex align-items-center">
            <button
                className="btn btn-outline-secondary btn-sm me-2"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <i className="fas fa-chevron-left"></i>
            </button>

            {pages.map((page, index) =>
                page === "..." ? (
                    <span key={index} className="mx-1 text-muted small">...</span>
                ) : (
                    <button
                        key={index}
                        className={`btn btn-sm ${page === currentPage ? "btn-primary" : "btn-outline-secondary"}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            )}
            <button
                className="btn btn-outline-secondary btn-sm ms-2"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <i className="fas fa-chevron-right"></i>
            </button>
            <select
                className="form-select form-select-sm ms-3"
                style={{width: "auto"}}
                value={currentSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
                {[10, 20, 50, 100].map(size => (
                    <option key={size} value={size}>
                        {size} /Page
                    </option>
                ))}
            </select>
        </div>
    );
};
export default Pagination;
