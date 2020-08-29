
import {
    DAILY_FORCAST_REQUEST,
    DAILY_FORCAST_FAILURE,
    DAILY_FORCAST_SUCCESS,
    HOURLY_FORCAST_REQUEST,
    HOURLY_FORCAST_FAILURE,
    HOURLY_FORCAST_SUCCESS } from "../actions/types";
import moment from "moment"; 
   

const initialState = {
    dailyFocast:{
        loading : true,
        data : []
    },
    hourlyFocast : {
        loading : true,
        data : {}
    }
};


const getHourlyForcast = (dailyFocast,hourlyFocast) => {
    const days = dailyFocast.map(day=>moment.unix(day.dt).format("DD/MM/yyyy"));
    return hourlyFocast.reduce((acc,curr)=>{
        if(days.includes(moment(curr.dt_txt).format("DD/MM/yyyy"))){
            const date = moment(curr.dt_txt).format("DD/MM/yyyy");
            if(acc[date] == null)
                acc[date] = [{
                    hour : moment(curr.dt_txt).hours() + ":00",
                    temp : Math.round(curr.main.temp)
                }];
            else
                acc[date].push({
                    hour : moment(curr.dt_txt).hours()+ ":00",
                    temp : Math.round(curr.main.temp)
            })
        };
        return acc;
    },{});
}


const rootReducer = (state = initialState,action) => {
    switch(action.type){
        case DAILY_FORCAST_REQUEST:
            return {
                ...state,
                dailyFocast : {
                    ...state.dailyFocast,
                    loading : true,
                }
            };
        case DAILY_FORCAST_SUCCESS:
            return {
                 ...state,
                dailyFocast : {
                    data : action.payload.daily,
                    loading : false
                }
            }; 
        case DAILY_FORCAST_FAILURE:
                return {
                    ...state,
                dailyFocast : {
                    ...state.dailyFocast,
                    loading : false,
                }
            }; 
        case HOURLY_FORCAST_REQUEST:
            return {
                ...state,
                hourlyFocast : {
                    ...state.hourlyFocast,
                    loading : true
                }
        };
        case HOURLY_FORCAST_SUCCESS:
            return {
                    ...state,
                    hourlyFocast : {
                        loading : false,
                        data : getHourlyForcast(state.dailyFocast.data,action.payload.list)
                    }
            }; 
        case HOURLY_FORCAST_FAILURE:
            return  {
                    ...state,
                    hourlyFocast : {
                        ...state.hourlyFocast,
                        loading : false,
                    }
                };                         
        default:
            return state;
    }
}

export default rootReducer;