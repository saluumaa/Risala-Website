import React from "react";
import { ReactComponent as Moon } from "./Moon.svg";
import { ReactComponent as Sun } from "./Sun.svg";
import "./DarkMode.css";

const DarkMode = () => {
    const setDarkMode = () => {
        document.querySelector("body").setAttribute("data-theme", "dark");
        localStorage.setItem("selectedtheme", "dark");
    }
    const setLightMode = () => {
        document.querySelector("body").setAttribute("data-theme", "light");
        localStorage.setItem("selectedtheme", "light");
    }

    const selectedtheme = localStorage.getItem("selectedtheme");
    
    if (selectedtheme) {
        document.querySelector("body").setAttribute("data-theme", selectedtheme);
    }

    const toggletheme = e => {
        if (e.target.checked) {
            setLightMode();
        } else {
            setDarkMode();
        }
    }
    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggletheme}
                defaultChecked={selectedtheme === 'light'}
            />
            <label className='dark_mode_label' for='darkmode-toggle'>
            <img src="/sun.png" className='sun' alt="sun" />
                <img src="/moon.png" className='moon' alt="moon" />
                
            </label>
        </div>
    );
};

export default DarkMode;
