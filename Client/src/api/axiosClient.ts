// Import các thư viện cần thiết và khai báo interface DecodedToken

import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import jwtDecode from "jwt-decode";
// Khai báo một kiểu giải mã token
interface DecodedToken {
  exp: number;
}

// Khởi tạo Axios instance
const BaseAxios: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axios.defaults.withCredentials = true;
BaseAxios.defaults.withCredentials = true;
const refreshToken = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/users/refresh-token",
      { withCredentials: true }
    );
    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data.accessToken;
  } catch (error) {
    console.error(error);
  }
};

BaseAxios.interceptors.request.use(
  async (config) => {
    let token: string | null = null;
    token = localStorage.getItem("accessToken");
    try {
      const date = new Date(); //Tạo ngày giờ hiện tại kiểm tra
      if (token) {
        const decodedToken: DecodedToken = await jwtDecode(token); //giải mã token
        if (decodedToken.exp < date.getTime() / 1000) {
          await refreshToken().then((data)=>{
            token = data
          });
        }
      }
    } catch (e) {
      console.error(e);
    }

    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// after sending a request
BaseAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default BaseAxios;
