import React, { useState } from "react";
import "./index.css";
import { BiDownArrow, BiRightArrow } from "react-icons/bi";
import { BsArrowClockwise } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { addSort } from "../../redux/reducer/sortSlice";
// import { getMovieSort } from "../../redux/reducer/sortSlice";

const SortMovie: React.FC = () => {
  const [openBox, setOpenBox] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const movieData = useSelector((state: RootState) => Number(state?.sortData));
  const dispatch = useDispatch();
  const handleSort = async (event: { target: { value: any } }) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption)
    // await dispatch(getMovieSort(selectedOption) as any).unwrap();
    dispatch(addSort(selectedOption))
  };

  const resetSort = async () => {
    setSortOption(""); // Đặt lại giá trị sort option thành rỗng
    // await dispatch(getMovieSort(sortOption) as any).unwrap();
    dispatch(addSort(""))
  };
  return (
    <div className="wrapper-sort">
      <div className={openBox ? "sort-header none" : "sort-header"}>
        <h3>Sort</h3>
        {openBox ? (
          <BiRightArrow className="icons" onClick={() => setOpenBox(false)} />
        ) : (
          <BiDownArrow className="icons" onClick={() => setOpenBox(true)} />
        )}
      </div>
      <div className={openBox ? "sort-body none" : "sort-body"}>
        <h4 className="title-sort-body">Sort results by</h4>
        <div className="wrapper-select">
          <select
            className="select-sort"
            onChange={handleSort}
            value={sortOption}
          >
            <option value=" ">---Select---</option>
            <option value="vote_average">Most rating</option>
            <option value="popularity">Most popular</option>
          </select>
          <button onClick={resetSort}>
            <BsArrowClockwise />
          </button>{" "}
          {/* Thêm nút reset */}
        </div>
      </div>
    </div>
  );
};

export default SortMovie;
