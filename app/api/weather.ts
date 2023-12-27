"use server"
import axios, { AxiosResponse } from 'axios';

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

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  try {
    const response: AxiosResponse<WeatherData> = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`);
    return response.data;
  } catch (error) {
    throw new Error(`Not able to fetch weather data : ${error}`);
  }
}
