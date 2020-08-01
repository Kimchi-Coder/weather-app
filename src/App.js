import React, { useState } from "react";

// No need to dotenv here
const api = {
  key: "8acc962fbbf197a181b671324d9db886",
  base_url: "https://api.openweathermap.org/data/2.5/",
};

const dateFormatter = (d) => {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date}, ${month} ${year}`;
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const onSearchHandler = async (e) => {
    if (e.key === "Enter") {
      const res = await fetch(
        `${api.base_url}weather?q=${query}&units=metric&APPID=${api.key}`
      );
      const result = await res.json();
      setWeather(result);
      setQuery("");
      console.log(result);
      console.log(weather);
    }
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp >= 20
            ? "App warm-bg"
            : "App"
          : "App"
      }
    >
      <main>
        <div className="search">
          <input
            type="text"
            className="search-bar"
            placeholder="Search a city"
            onChange={(e) => setQuery(e.currentTarget.value)}
            value={query}
            onKeyPress={onSearchHandler}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <>
            <div className="location">
              <h1 id="city">
                {weather.name}, {weather.sys.country}
              </h1>
              <p id="date">{dateFormatter(new Date())}</p>
            </div>
            <div className="weather">
              <h1 id="temp-box">
                <div id="temp">{Math.floor(weather.main.temp)}</div>
                <small id="temp-minmax">
                  <span>Min:{Math.floor(weather.main.temp_min)}</span>
                  {"  "}
                  <span>Max:{Math.floor(weather.main.temp_max)}</span>
                </small>
              </h1>
              <p id="weather">{weather.weather[0].main}</p>
            </div>
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
