import React, { useEffect, useState } from "react";
import { BiDownArrow, BiRightArrow } from "react-icons/bi";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { processMovie } from "../../redux/reducer/filterRuntimeSlice";
import { genresMovie } from "../../redux/reducer/filterGenresMoviesSlice";

const typeMovie: string[] = [
  "Action",
  "Anime",
  "Drama",
  "Family",
  "Comedy",
  "Documentary",
  "Horror",
  "Ecchi",
  "Music",
];

const FilterMovie: React.FC = () => {
  const [openBox, setOpenBox] = useState(false);
  const [dataFilter, setDataFilter] = useState<string[]>([]);
  const [valueProgress, setValueProgress] = useState<number>(0);
  const dispatch = useDispatch();
  useEffect(() => {
    // runtimeMovie
    setTimeout(() => {
      dispatch(processMovie(valueProgress));
      // if (dataFilter) {
        dispatch(genresMovie(dataFilter));
      // }
    }, 1000);
  }, [valueProgress,dataFilter]);
  return (
    <div className="wrapper-filter">
      <div className={openBox ? "sort-header none" : "sort-header"}>
        <h3>Filter</h3>
        {openBox ? (
          <BiRightArrow className="icons" onClick={() => setOpenBox(false)} />
        ) : (
          <BiDownArrow className="icons" onClick={() => setOpenBox(true)} />
        )}
      </div>
      <div className={openBox ? "sort-body none" : "sort-body"}>
        <h4 className="title-sort-body">Genres</h4>
        <div className="group-filter">
          {typeMovie.map((item: string, index: number) => {
            return (
              <div
                onClick={() => {
                  if (dataFilter.includes(item)) {
                    const data = dataFilter.filter((i) => i != item);
                    setDataFilter([...data]);
                  } else {
                    setDataFilter((prev) => [...prev, item]);
                  }
                }}
                key={index}
                className={
                  dataFilter.includes(item) ? "tag-filter check" : "tag-filter"
                }
              >
                <span>{item}</span>
              </div>
            );
          })}
        </div>
        <h4 className="title-sort-body">Runtime</h4>
        <div className="group-progress">
          <span>From 0 min</span>
          <span>To {valueProgress} min</span>
        </div>
        <input
          className="progress-bar"
          value={valueProgress}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = parseInt(e.target.value);
            setValueProgress(newValue);
          }}
          type="range"
          min={0}
          max={200}
          id=""
        />
      </div>
    </div>
  );
};

export default FilterMovie;
