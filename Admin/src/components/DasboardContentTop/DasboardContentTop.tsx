import React, { useEffect, useState } from 'react'
import BaseAxios from '../../api/axiosInstance';
import { BiMovie, BiMoviePlay, BiUserCheck, BiUserPlus } from 'react-icons/bi';
import '../UserDashboard/UserDashboard.css'

const DasboardContentTop : React.FC = () => {
  const [managerLengthUsers, setManagerLengthUsers] = useState(0);
  const [userPaymentedLenght, setUserPaymentedLength] = useState(0);
  const [movieLength, setMovieLength] = useState(0)
  const [movieHasFee, setMovieHasFee] = useState(0);
  const handleManagerUsers = async () => {

    try {
      const resepone = await BaseAxios.get("/api/v1/users");
      const totalUsers = resepone.data.length;
      let userPaymented = resepone.data.filter((item:any)=> {
        return item.role_subscription == 2
      })

      setUserPaymentedLength(userPaymented.length)
      setManagerLengthUsers(totalUsers);
    } catch (error) {
      console.error(error);
    }
  };
  const handleManagerProducts = async () =>{
    try {
      const resepone = await BaseAxios.get("/api/v1/movie?_limit=0&_page=0");
      const totalProducts = resepone.data.data.length;
      let productHasFee = resepone.data.data.filter((item:any)=> {
        return item.role_movie == 2
      })
      setMovieHasFee(productHasFee.length)
      setMovieLength(totalProducts);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    handleManagerUsers();
    handleManagerProducts()
  }, []);
  return (
    <div>
      <div className="top-section">
          <h4 className="top-section-title">Welcome!</h4>
          <div className="wrapper-card">
            <div className="card-dashboard-item">
              <div className="card-dashboard-item-1 box-1">
                <span>MY USERS</span>
                <span>{managerLengthUsers}</span>
              </div>
              <div className="card-dashboard-item-2 box-2">
                <BiUserCheck className="card-icons" />
              </div>
            </div>
            <div className="card-dashboard-item">
              <div className="card-dashboard-item-1 box-3">
                <span>PAID USERS</span>
                <span>{userPaymentedLenght}</span>
              </div>
              <div className="card-dashboard-item-2 box-4">
                <BiUserPlus className="card-icons" />
              </div>
            </div>
            <div className="card-dashboard-item">
              <div className="card-dashboard-item-1 box-5">
                <span>MOVIES</span>
                <span>{movieLength}</span>
              </div>
              <div className="card-dashboard-item-2 box-6">
                <BiMoviePlay className="card-icons" />
              </div>
            </div>
            <div className="card-dashboard-item">
              <div className="card-dashboard-item-1 box-7">
                <span>PAID MOVIES</span>
                <span>{movieHasFee}</span>
              </div>
              <div className="card-dashboard-item-2 box-8">
                <BiMovie className="card-icons" />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default DasboardContentTop