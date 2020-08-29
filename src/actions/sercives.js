import axiosInstance from "../config";


const getDailyForcast = (latitude,longitude) => 
    axiosInstance.get(`/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,current,minutely&units=metric`);


const getHourlyForcast = (latitude,longitude) => 
    axiosInstance.get(`/forecast?lat=${latitude}&lon=${longitude}&units=metric`);


const WeatherService = {
    getDailyForcast,
    getHourlyForcast
}

export default WeatherService;