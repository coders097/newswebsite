import React, { useEffect, useState } from 'react';
import Pic from '../assets/pic.jpg';

import cool from '../assets/weatherIcons/cool.png';
import sun from '../assets/weatherIcons/sun.png';
import sunny from '../assets/weatherIcons/suuny-clouds.png';
import snow from '../assets/weatherIcons/snowflake.png';

const Weather = () => {

    let [temp,setTemp]=useState<any>(null);

    
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((e)=>{
            fetch(`http://localhost:3001/weather/?lat=${e.coords.latitude}&lon=${e.coords.longitude}`)
                .then(res=>res.json())
                .then(data=>setTemp(data))
                .catch(err=>console.log(err));
        });
    },[]);


    let getPic=(num:number)=>{
        if(num<15){
            return snow;
        }else if(num<26){
            return cool;
        }
        return sun;
    }

    return (
        <div className="WeatherView">
            <div className="maincast">
                <img src={getPic(parseInt(((temp?.main?.temp-273.15)*100)+"")/100)} alt="mood"/>
                <h1>{temp?.main?.temp?(parseInt(((temp?.main?.temp-273.15)*100)+"")/100):"loading"}&#176;  C</h1>
                <p>{temp?.weather[0]?.main}</p>
                <h2>{temp?.name}, {temp?.sys?.country}</h2>
            </div>
            {/* <div className="forcasts">
                {[...new Array(7)].map(()=><div className="forcast">
                    <p>FRI</p>
                    <img src={Pic} alt="mood"/>
                    <h2 className="upper">25 C</h2>
                    <h2 className="lower">16 C</h2>
                </div>)}
            </div> */}
        </div>
    );
};

export default Weather;