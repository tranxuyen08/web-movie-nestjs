import React, { useEffect, useState } from "react";
import "./RightBar.css";
import { AiFillStar } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getAll } from "../../redux/reducer/movieSlice";

const RightBar: React.FC = () => {
  // const dispatch = useDispatch();
  // const movies = useSelector((state) => state?.movie.data?.data);
  const [isLoad, setIsLoad] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [minRuntime, setMinRuntime] = useState("");
  const [maxRuntime, setMaxRuntime] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Xử lý thay đổi URL khi các giá trị filter thay đổi
  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (minRuntime) searchParams.set("minRuntime", minRuntime);
    if (maxRuntime) searchParams.set("maxRuntime", maxRuntime);
    if (sortBy) searchParams.set("sort_by", sortBy);

    navigate({ search: searchParams.toString() });
  }, [minRuntime, maxRuntime, sortBy, navigate]);

  // Lấy giá trị filter từ URL khi component được tạo
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setMinRuntime(searchParams.get("minRuntime") || "");
    setMaxRuntime(searchParams.get("maxRuntime") || "");
    setSortBy(searchParams.get("sort_by") || "");
  }, [location.search]);

  const handleGetTrending = async () => {
    try {
      // await dispatch(getAll());
      setIsLoad(false);
      // console.log(movies);
    } catch (err) {
      setIsLoad(false);
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetTrending();
  }, []);

  return (
    <section className="sect-right-bar">
      <div className="container">
        <div className="wrapper-right-bar">
          <div className="search">
            <input
              className="input-search"
              type="text"
              placeholder="Search..."
            />
          </div>
          {/* <div className="trending">
            <h3 className="title-h3">Trending</h3>
            <Link to="/trending" className="trending-movie">
              <div className="trending-img">
                <img
                  src="https://image.tmdb.org/t/p/w154/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
                  alt=""
                />
              </div>
              <div className="trending-info">
                <div className="trending-title">
                  <h4 className="title-h4">Avengers: Infinity War</h4>
                  <p>2023-04-17</p>
                  <p className="ratting">
                    8.2{" "}
                    <span>
                      <AiFillStar className="icon-ratting" />
                    </span>
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/trending" className="trending-movie">
              <div className="trending-img">
                <img
                  src="https://image.tmdb.org/t/p/w154/qW4crfED8mpNDadSmMdi7ZDzhXF.jpg"
                  alt=""
                />
              </div>
              <div className="trending-info">
                <div className="trending-title">
                  <h4 className="title-h4">Knights of the Zodiac</h4>
                  <p>2023-04-17</p>
                  <p className="ratting">
                    6.6{" "}
                    <span>
                      <AiFillStar className="icon-ratting" />
                    </span>
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/see-more">
              <button className="btn btn-see-more">See More</button>
            </Link>
          </div> */}
          <div className="filter">
            <h2>Filter</h2>
            <div>
              <label>Min Runtime:</label>
              <input
                type="text"
                value={minRuntime}
                onChange={(e) => setMinRuntime(e.target.value)}
              />
            </div>
            <div>
              <label>Max Runtime:</label>
              <input
                type="text"
                value={maxRuntime}
                onChange={(e) => setMaxRuntime(e.target.value)}
              />
            </div>
            <div>
              <label>Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="vote_average.desc">Vote Average Desc</option>
                <option value="vote_average.asc">Vote Average Asc</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightBar;
