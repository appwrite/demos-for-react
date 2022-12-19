import React, {useState, useEffect} from "react";
import {response} from "../config/index";
const YourInfo = () => {
  const [info, setInfo] = useState({});
  const [weather, setWeather] = useState({});

  // Promise to get the location details from the Locale API.
  response.then(
    function (res) {
      console.log(res);
      setInfo(res);
    },
    function (error) {
      console.error(error.message);
    }
  );
  const {ip} = info; //Extracting IP from JSON
  const {countryCode} = info; //Extracting countryCode from JSON
  const {country} = info; //Extracting country from JSON
  const {continent} = info; //Extracting continent from JSON
  const {currency} = info; //Extracting currency from JSON
  //Displaying Info
  return (
    <div className="info">
      <h1>Here are you Location Details!</h1>
      <p>
        <strong>Your IP Address</strong>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ip}
      </p>
      <p>
        <strong>Your Country</strong>: &nbsp;&nbsp;&nbsp;{country}
      </p>
      <p>
        <strong>Your Country Code</strong>: &nbsp;&nbsp;&nbsp;{countryCode}
      </p>
      <p>
        <strong>Your Continent</strong>: &nbsp;&nbsp;&nbsp;{continent}
      </p>
      <p>
        <strong>Your Currency</strong>: &nbsp;&nbsp;&nbsp;{currency}
      </p>
    </div>
  );
};
export default YourInfo;
