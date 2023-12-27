"use client"
import { useEffect,useState } from "react" ;
import { getWeatherByCity } from "@/app/api/weather";
import styling from './WeatherWidget..module.css';

const errorMsg = "Cannot Fetch IP";
const errorMsgCity = 'Cannot get city';

interface Weather {
    description: string;
}

interface Main {
    temp: number;
}

interface WeatherData {
    weather: Weather[];
    main: Main;
}

function WeatherWidget() {
    async function getIP() : Promise<string> {
        try {
          const response = await fetch('https://api.ipify.org?format=json');
          const data = await response.json();
          return data.ip;
        } catch (error) {
          return errorMsg;
        }
    }
    async function getCityByIP(ip : string) {
        try {
            const response = await fetch(`https://api.ipapi.is/?q=${ip}`);
            const data = await response.json();
            return data.location.city;
        } catch (error) {
            return errorMsgCity;
        }
    }
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    useEffect(()=>{
        async function fetchWeather() {
            const ip = await getIP();
                if (ip !== errorMsg) {
                    const city = await getCityByIP(ip);
                    if (city !== errorMsgCity) {
                        const weather = await getWeatherByCity(city);
                        setWeatherData(weather);
                    }
                }
            }
            if(!weatherData) fetchWeather();            
    },[getIP, getCityByIP,setWeatherData,weatherData]);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }, []);    
    return(
        <div className={styling.weatherDiv}>
            {weatherData ? (
                    <div>
                        <h2>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</h2>
                        <h2>{(weatherData.main.temp-273.15).toPrecision(3)}°C</h2>
                        <h3>{weatherData.weather[0]?.description.split(' ').map((line : string)=>(
                            `${line[0].toUpperCase()}${line.slice(1)} `
                        ))}</h3>                        
                    </div>
                ) : (
                    <p>Loading...</p>
            )}
        </div>
    )
}
export default WeatherWidget;