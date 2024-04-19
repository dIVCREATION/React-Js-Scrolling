
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './scroll.css';

export default function ScrollIndicator ({url}){
    const [data, setData] = useState([])
    const [error, setError] = useState(" ");
    const [scrollPercentage, setScrollPercentage] = useState()

 async function fatchData(getUrl) {
    try{
        const response = await fetch(getUrl);
        const data = await response.json();
        if(data && data.products && data.products.length > 0){
            setData(data.products)
        }
        console.log(data)
    }
   
    catch(e){
console.log(e)
setError(e.message)
    }
    };

    useEffect(()=>{
        fatchData(url)

    },[url]);

    function handelScrolPercentage(){
        console.log(
            document.body.scrollTop,
            document.documentElement.scrollTop,
            document.documentElement.scrollHeight,
            document.documentElement.clientHeight
        );
        const howmuchScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    setScrollPercentage((howmuchScroll / height) * 100);
    }
  
    useEffect(()=>{
window.addEventListener('scroll' , handelScrolPercentage)
return () =>{
    window.removeEventListener('scroll', () =>{})
}
 },[])

 console.log(data, scrollPercentage);
// if(error){
//     return <div>error come !{error}</div>
// }
    return(
        <>
        <div className='container'>
        <h1>Scroll Data Indicator</h1>
        <div className='scrollPrgress'>
            < div className="currentProgress" style= {{width: `${scrollPercentage}%`}}>

            </div>
        </div>
        </div>
        <div className="data">
            {
               (data && data.length > 0) ? 
                data.map((item) => <p>{item.title}</p>)
                : null
            }
        </div>
        </>
    )
}
