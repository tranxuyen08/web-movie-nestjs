import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Filter = () => {
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
          {/* <ul className="list-hagtag">
            <li className="item-hagtag">
              <Link to="/drama">
                <span>Drama</span>
              </Link>
            </li>
            <li className="item-hagtag">
              <Link to="/trending">
                <span>Trending</span>
              </Link>
            </li>
            <li className="item-hagtag">
              <Link to="/drama">
                <span>Family</span>
              </Link>
            </li>
            <li className="item-hagtag">
              <Link to="/drama">
                <span>Familyzzzz</span>
              </Link>
            </li>
          </ul> */}
          <div className="trending">
            <h3 className="title-h3">Trending</h3>


          </div>
        </div>
      </div>
    </section>
    // <section className="sect-right-bar">
    //   <div className="container">
    //     <div className="wrapper-right-bar">
    //       <div className="filter">
    //         <h2>Filter</h2>
    //         <div>
    //           <label>Min Runtime:</label>
    //           <input
    //             type="text"
    //             value={minRuntime}
    //             onChange={(e) => setMinRuntime(e.target.value)}
    //           />
    //         </div>
    //         <div>
    //           <label>Max Runtime:</label>
    //           <input
    //             type="text"
    //             value={maxRuntime}
    //             onChange={(e) => setMaxRuntime(e.target.value)}
    //           />
    //         </div>
    //         <div>
    //           <label>Sort By:</label>
    //           <select
    //             value={sortBy}
    //             onChange={(e) => setSortBy(e.target.value)}
    //           >
    //             <option value="">-- Select --</option>
    //             <option value="vote_average.desc">Vote Average Desc</option>
    //             <option value="vote_average.asc">Vote Average Asc</option>
    //           </select>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default Filter;
