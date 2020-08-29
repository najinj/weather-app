import React, { useEffect,useState } from "react";
import {useLocation,useParams} from "react-router-dom";
import {connect} from "react-redux";
import {fetchHourlyForcast} from "../../actions/action";
import moment from "moment";
import Home from "../Home";
import DailyHoursGraph from '../DailyHoursGraph';
import "./style.css";



const mapDispatchToProps = (dispatch) => {
    return {
        fetchHourlyForcast : (latitude,longitude) => dispatch(fetchHourlyForcast(latitude,longitude)),
    }
}

const mapStateToProps = state =>{
    return {
        hourlyFocast : state.hourlyFocast.data,
        loading : state.hourlyFocast.loading
    }
}

const Details = ({hourlyFocast,fetchHourlyForcast,loading}) => {
    const [dayKey,setdayKey] = useState(null);
    const [graphData,setGraphData] = useState([]);
    const location = useLocation();
    const {day} = useParams();



    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=> {
            const {latitude,longitude} = position.coords; 
            console.log(position.coords);
            fetchHourlyForcast(latitude,longitude);
          },err=>{
              console.log(err);
              window.location.href= "/";
          });
    },[]);

    useEffect(()=>{
        const weekDays = getWeekDays();
        if(location.state == undefined){
            if(weekDays[day] == undefined)
             setdayKey(null);
            else 
             setdayKey(weekDays[day]);
        }
        else
           setdayKey(location.state.date);
    },[location.state])

    useEffect(()=>{
        const data = [{
            id:"hourlyGraph",
            color:"hsl(129, 70%, 50%)",
            data : (hourlyFocast[dayKey] || [] ).map(c=>{
                return {
                    x:c.hour,
                    y:c.temp
                }
            })
        }];
        setGraphData(data);

    },[hourlyFocast,dayKey]);

    const RenderGraph = () =>{
        if(dayKey == null)
           return <h1>Please select a valid day</h1>;
        if(loading)
           return <h1>Loading ...</h1>;
        if(graphData.length == 0 || graphData[0].data.length == 0)  
           return <h1>No Hourly forcast to display</h1>;
        return  <DailyHoursGraph data={graphData}/>;
    }

    
    return (
        <>
          <Home/>
          <div className="hourlyView">
              Details - {dayKey}
              <div style={{height:400}}>
                <RenderGraph/>
              </div>
          </div>
        </>
    )
}

const getWeekDays = () => {
    let days = {};
    for(let i = 0; i< 7 ;i++){
        const dayName = moment().add(i,"days").format("dddd");
        const date = moment().add(i,"days").format("DD/MM/YYYY");
        if(days[dayName] == undefined){
            days[dayName] = date;  
        }
    }
    return days;
}


const ConnectedDetails = connect(mapStateToProps,mapDispatchToProps)(Details);


export default ConnectedDetails;