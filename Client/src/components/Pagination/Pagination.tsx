import React, { useState } from "react";
import "./Pagination.css";

interface PaginationProps {
  pagination: {
    _limit: number;
    _page: number;
    _totalMovie: number;
  };
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const { pagination, onPageChange } = props;
  const { _limit, _page, _totalMovie } = pagination;
  const [selectedPage, setSelectedPage] = useState<number>(_page);

  const totalPage = Math.ceil(Number(_totalMovie) / Number(_limit));
  const handleClick = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);

      // Cập nhật selectedPage khi người dùng chọn một trang mới
      setSelectedPage(newPage);
    }
  };

  return (
    <div className="pagination">
      <button
        className="btn btn-action"
        disabled={_page <= 1}
        onClick={() => handleClick(_page - 1)}
      >
        prev
      </button>
      {Array.from({ length: totalPage }).map((_, index) => (
        <p
          key={index}
          className={selectedPage === index + 1 ? "active" : ""}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </p>
      ))}
      <button
        className="btn btn-action"
        disabled={_page >= totalPage}
        onClick={() => handleClick(_page + 1)}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
