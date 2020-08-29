import React,{useEffect,useState} from "react";
import {connect} from "react-redux";
import {fetchDailyForcast} from "../../actions/action";
import WeatherCard from "../WeatherIcon";
import "./style.css";

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDailyForcast : (latitude,longitude) => dispatch(fetchDailyForcast(latitude,longitude)),
    }
}

const mapStateToProps = state =>{
    return {
        dailyFocast : state.dailyFocast.data
    }
}

const Home = ({fetchDailyForcast,dailyFocast}) =>{
    const [userPermisionDenied,setUserPermissionDenied] = useState(false);

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition((position)=> {
            const {latitude,longitude} = position.coords; 
            fetchDailyForcast(latitude,longitude);
        },err=>{
            console.log(err);
            setUserPermissionDenied(true);
        });
    },[]);

    return(
        <div className="wrapper">
            <div className="weather-weekly-container">
            {userPermisionDenied && <h2>We use your location to display weather forcast please enable location sharing </h2>}
            {!userPermisionDenied && dailyFocast.map(day=>
                <WeatherCard 
                  key = {day.dt}
                  day = {day.dt}
                  minTemp = {day.temp.min}
                  maxTemp = {day.temp.max}
                  iconCode = {day.weather[0].icon}
                />
            )
            }
            </div>
        </div>
    );
}




const connectedHome = connect(mapStateToProps,mapDispatchToProps)(Home);

export default connectedHome;