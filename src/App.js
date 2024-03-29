// import { BrowserRouter, Routes, Route } from 'react-router-dom';

import React, { useState } from 'react';
// import Search from "./Components/Search/Search";

import { useEffect } from "react";
// import "./index.css";
import "./styles.css";

import axios from "axios";
import {
  IoMdSunny,
  IoIosSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";
import "tailwindcss/tailwind.css";
//set your api key from openweathermap website after sign in
const APIkey = " api key";

export default function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Bucharest");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  console.log(data, "data");

  const handleInput = (e) => {
    setInputValue(e.target.value);
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    console.log(inputValue);
    //if input value is not empty
    if (inputValue !== "") {
      //set location
      setLocation(inputValue);
    }
    //select input
    const input = document.querySelector("input");

    //if input value is empty
    if (input.value === "") {
      console.log("input is empty");
      //set animate to true
      setAnimate(true);
      //after 500 ms set animate to false
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    //clear input
    input.value = "";

    //prevent
    e.preventDefault();
  };
  //fetch the data

  useEffect(() => {
    //set loading to true
    setLoading(true);

 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}&units=metric`;
 

    axios
      .get(url)
      .then((res) => {
        //set data after 1500ms
        setTimeout(() => {
          setData(res.data);
          //set loading to false
          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    //clear timer
    return () => clearTimeout(timer);
  }, [errorMsg]);
 let backgroundColorW;
  //if data is false show loader
  if (!data) {
    return (
      <div className={`${backgroundColorW} w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col
      justify-center items-center  `}>
      {/* <div className='w-full h-screen'> */}
        <div>
          <ImSpinner8 className="text-5xl animate-spin text-white " />
        </div>
      </div>
    );
  }

  let icon;
 
  // switch ('Snow') {
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy className='text-[#31cafb]'/>;
      backgroundColorW =
        "bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100";
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill className='text-[#31cafb]'/>;
      backgroundColorW = "bg-gradient-to-r from-slate-300 to-slate-500";
      break;
    case "Clear":
      icon = <IoIosSunny className='text-[#ffde33]' />;
      backgroundColorW = "bg-gradient-to-r from-amber-200 to-yellow-500";
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className='text-[#31cafb]'/>;
      backgroundColorW = "bg-gradient-to-r from-slate-500 to-slate-800";
      break;
    case "Snow":
      icon = <IoMdSnow className='text-[#31cafb]' />;
      backgroundColorW = "bg-gradient-to-r from-rose-100 to-teal-100";
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm className='text-[#2155cf]' />;
      backgroundColorW =
        "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900";
      break;
    case "Rain":
      icon = <IoMdRainy className='text-[#2155cf]' />;
      backgroundColorW = "bg-gradient-to-r from-slate-500 to-slate-800";
      break;
  }

  const date = new Date();
  return (
    <div
      className={`${backgroundColorW} w-full h-screen 
      bg-no-repeat bg-cover bg-center flex
    flex-col items-center justify-center px-4 lg:px-0 transition delay-150`}
    >
      {errorMsg && <div className='w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-2 
      lg:top-10 p-4 capitalize rounded-md z-40'>{`${errorMsg.response.data.message}`}</div>}
      {/* form */}
      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } h-16 bg-black/30 w-full max-w-[450px] 
      rounded-full backdrop-blur-[32px] mb-8`}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            onChange={(e) => handleInput(e)}
            className="flex-1 bg-transparent outline-none
         placeholder:text-white text-white text-[15px] 
         font-light pl-16 h-full"
            type="text"
            placeholder="Search by city or country"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 
         h-12 rounded-full flex justify-center items-center transition"
          >
            <IoMdSearch />
          </button>
        </div>
      </form>
      {/* card */}
      <div
        className="w-full max-w-[450px] bg-black/20
      min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6"
      >
        {loading ? (
          <div
            className="w-full h-full flex justify-center 
        items-center"
          >
            <ImSpinner8 className="text-white text-5xl animate-spin" />
          </div>
        ) : (
          <div>
            {/* card top */}
            <div className="flex items-center gap-x-5">
              {/* <div> */}
              {/* icon  */}
              <div className="text-[87px]">{icon}</div>
              {/* country name */}
              <div>
                <div className="text-2xl font-semibold">
                  {data.name},{data.sys.country}
                </div>
                {/* date */}
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>
            {/* card body */}
            <div className="my-20">
              <div className="flex justify-center items-center">
                {/* card temp */}
                <div className="text-[144px] leading-none font-light">
                  {parseInt(data.main.temp)}
                </div>
                {/* celsios icon */}
                <div>
                  <TbTemperatureCelsius className="text-4xl" />
                </div>
              </div>
              {/* weather description */}
              <div className="capitalize text-center">
                {data.weather[0].description}
              </div>
            </div>

            {/* card bottom */}
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Visibility {""}
                    <span className="ml-2">{data.visibility / 1000} km </span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Feels like
                    <div className="flex ml-2">
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Humidity
                    <span className="ml-2">{data.main.humidity} % </span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div>
                    Wind<span className="ml-2">{data.wind.speed}m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

