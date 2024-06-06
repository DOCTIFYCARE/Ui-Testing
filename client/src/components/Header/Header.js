import React, { useState, useEffect } from "react";
import './Header.css'


function Header() {
    const [currentTime, setCurrentTime] = useState(new Date());


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return(
        <div className="Header">
            <div className="right-corner-text">
               <p>  {currentTime.toDateString()} |<br/> {currentTime.toLocaleTimeString()}</p>
            </div>
        </div>
    )
}
 
export default Header;