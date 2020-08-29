import {
    DAILY_FORCAST_REQUEST,
    DAILY_FORCAST_FAILURE,
    DAILY_FORCAST_SUCCESS,
    HOURLY_FORCAST_REQUEST,
    HOURLY_FORCAST_FAILURE,
    HOURLY_FORCAST_SUCCESS } from "./types";
import WeatherService from "./sercives";


export const fetchDailyForcast = (latitude,longitude) => {
    return dispatch =>{
        dispatch({type:DAILY_FORCAST_REQUEST});
        WeatherService.getDailyForcast(latitude,longitude).then(res=>{
            dispatch({type:DAILY_FORCAST_SUCCESS,payload:res.data});
        },err=>{
            dispatch({type:DAILY_FORCAST_FAILURE,error:err.data.error});
        });
    }
}

export const fetchHourlyForcast = (latitude,longitude) => {
    return dispatch =>{
        dispatch({type:HOURLY_FORCAST_REQUEST});
        WeatherService.getDailyForcast(latitude,longitude).then(res=>{
            dispatch({type:DAILY_FORCAST_SUCCESS,payload:res.data});
            WeatherService.getHourlyForcast(latitude,longitude).then(res=>{
                dispatch({type:HOURLY_FORCAST_SUCCESS,payload:res.data});
            },err=>{
                dispatch({type:HOURLY_FORCAST_FAILURE,error:err.data.error});
            });

        },err=>{
            dispatch({type:DAILY_FORCAST_FAILURE,error:err.data.error});
        });
        
    }
}


