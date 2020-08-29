import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5", 
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  params : {
    appid : "c555be7ec734ffa43c0602a6d7639c3e"
  }
});

axiosInstance.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => {
    console.log("axiosInstance");
    // Do something with response data
    return response;
  },
  error => {
    switch (error.response.status) {
      case 401:
        break;
      default:
        break;
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;