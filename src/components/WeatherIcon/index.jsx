import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";


const WeatherCard = ({day,iconCode,maxTemp,minTemp}) =>{
    return (
        <div className="weather-card">
            <span className="day-name">{getDayName(day,"short")}</span>
            <Link to={{
                pathname :`/${getDayName(day,"long")}`,
                state: {date:moment.unix(day).format("DD/MM/YYYY")}
                }}
            >
                <img src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`} alt="Cinque Terre"/>
            </Link>
        <div className="temp-interval">
            <span className="temp-max">{Math.round(maxTemp)}°</span>
            <span className="temp-min">{Math.round(minTemp)}°</span>
        </div>
    </div>
    );
}

const getDayName = (unixDate,mode) =>
{
    var date = new Date(unixDate * 1000);
    return date.toLocaleDateString(navigator.language, { weekday: mode });        
}

export default WeatherCard;