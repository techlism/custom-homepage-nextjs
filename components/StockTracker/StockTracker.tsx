import {fetchSnP,fetchSensexData,SensexData} from "@/app/api/stock";
import { useEffect, useState } from "react";
import styling from './StockTracker.module.css';

interface SNP {
    response : {
        regularMarketPrice: number;
        chartPreviousClose: number;
        change_percentage : string;
      };
}

const StockTracker = () =>{
    const [MData,setMData] = useState<SNP|null>(null);
    const [sensexData,setSensexData] = useState<SensexData|null>(null);
    useEffect(()=>{
        const fetch = async () => {            
            if(MData===null){
                const response = await fetchSnP();
                setMData({response});
            }
            if(sensexData===null){
                const response = await fetchSensexData();
                setSensexData(response);
            }
        }
        fetch();
    },[MData,setMData])
    return(
        <div className={styling.StockTrackerDiv}>
            <div className={styling.usData}>
                <p>S&P 500</p>
                <p>{MData?.response?.regularMarketPrice}</p>
                <p>{MData?.response?.change_percentage}%</p>
            </div>
            <div>
                <p>Sensex</p>
                <p>{sensexData?.current_value}</p>
                <p>{sensexData?.change_percentage}%</p>                
            </div>
        </div>       
    )
}
export default StockTracker;