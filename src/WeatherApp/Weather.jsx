import React, { useEffect, useState } from "react";
// import clear_img from "../assets/img/clear.png";
import cloud_img from "../assets/img/cloud.png";
// import drizzle_img from "../assets/img/drizzle.png";
import humidity_img from "../assets/img/humidity.png";
// import rain_img from "../assets/img/rain.png";
import search_img from "../assets/img/search.png";
// import snow_img from "../assets/img/snow.png";
import wind_img from "../assets/img/wind.png";
import "../assets/css/style.css";
import axios from "axios";


const Weather = () => {
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("London");
  const [error, setError] = useState(null);

  const fetchApi = async () => {
    try {
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&cnt=7&appid=4065513e0536bf5bce07a31270c66168`;
      const response = await axios.get(api); // Use axios consistently
      const resJson = response.data; // Axios response data is directly available
      setCity(resJson);
      console.log(resJson);
      setLoading(false);
    } catch (error) {
      setError("Error fetching weather data"); // User-friendly error message
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="conatainer">
      <div className="search">
        <div className="search-engine">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <label htmlFor="search-icon" onClick={fetchApi}>
            <img src={search_img} alt="" />
          </label>
        </div>
      </div>
      {loading ? (
        <p style={{ color: "white" }}>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : !city ? (
        <p>No Data Found</p>
      ) : (
        <div>
          <div className="cloud">
            <img src={cloud_img} alt="" />
          </div>
          <div className="weadther-degree">
            <h1>{Math.round(city.main.temp)}°C</h1>
            <div className="today">
              <h3>
                Today
                <span>{Math.round(city.main.temp_min)} </span>/
                <span>{Math.round(city.main.temp_max)}°C</span>
              </h3>
            </div>
            <h2>{city.name}</h2>
          </div>
          <div className="weather-h-wind-s">
            {/* Add content here if needed */}
          </div>
          <div className="weather-h-wind-s">
            <div className="weather-h">
              <div className="per">
                <img src={humidity_img} alt="" />
                <div className="flex">
                  <span>{city.main.humidity}%</span>
                  <span>Humidity</span>
                </div>
              </div>
            </div>
            <div className="weather-s">
              <div className="per">
                <img src={wind_img} alt="" />
                <div className="flex">
                  <span>{city.wind.speed} km/h</span>
                  <span>wind speed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
