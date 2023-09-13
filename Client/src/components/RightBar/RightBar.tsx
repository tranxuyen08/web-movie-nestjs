import React, { useEffect, useState } from "react";
import "./RightBar.css";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getMovieRate } from "../../redux/reducer/movieSlice";
// import { getAll } from "../../redux/reducer/movieSlice";

const RightBar: React.FC = () => {
  const dispatch = useDispatch();
  // const movies = useSelector((state: any) => state?.movies?.data);
  const [isLoad, setIsLoad] = useState(true);
  const handleGetTrending = async () => {
    try {
      // await dispatch(getMovieRate());
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
          <div className="trending">
            <h3 className="title-h3">Trending</h3>
            {/* {movies.slice(0, 2).map((movie: any) => (
              <Link
                to={`/detail/${movie._id}`}
                key={movie._id}
                className="trending-movie"
              >
                <div className="trending-img">
                  <img
                    src={
                      movie?.poster.includes("http://")
                        ? movie?.poster
                        : `https://image.tmdb.org/t/p/original${movie?.poster}`
                    }
                    alt="product"
                  />
                </div>
                <div className="trending-info">
                  <div className="trending-title">
                    <h4 className="title-h4">{movie.title}</h4>
                    <p>{movie.release_date.split("T")[0]}</p>
                    <p className="ratting">
                      {movie.vote_average}{" "}
                      <span>
                        <AiFillStar className="icon-ratting" />
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))} */}
            <Link to="/detail/64b0babccc4aa109be2b5040" className="trending-movie">
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
            <Link to="/detail/64ae75ec3ee5c660c20d3a0e" className="trending-movie">
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
            <Link to="/Explore">
              <button className="btn btn-see-more">See More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightBar;
