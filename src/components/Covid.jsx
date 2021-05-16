import React, { useEffect, useState } from "react";
import "./covid.css";
import axios from "axios";

export default function Covid() {
  const [latest, setLatest] = useState([]); // passing empty array, as data is in json format, so we want to store it in an array
  const [results, setResults] = useState([]); // to store all data of states including total
  const [searchStates, setSearchStates] = useState("");

  const getCovidData = () => {
    axios
      .get("https://api.covid19india.org/data.json")

      .then((resArr) => {
        //console.log(resArr);
        // console.log(resArr.data.statewise[0]);
        setLatest(resArr.data.statewise[0]);
        // console.log(resArr.data.statewise);
        setResults(resArr.data.statewise);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCovidData();
  }, []); // to render only once


  // to search for a state
const filterStates = results.filter((item) => {
    return searchStates !== "" ? item.state.includes(searchStates) : item;
  });

  
// render data for searched states 
  const showDataForState = filterStates.map((curElem, ind) => {
      return (
        <tr key={ind} className="states-value">
          <td>{curElem.state}</td>
          <td>{curElem.confirmed}</td>
          <td>{curElem.recovered}</td>
          <td>{curElem.deaths}</td>
          <td>{curElem.active}</td>
          <td>{curElem.lastupdatedtime}</td>
        </tr>
      );
    });
  
return (
    <>
      <div className="container">
        <h1 className="heading text-center mt-5">COVID-19 TRACKER</h1>

        <div className="card-deck mt-5">
          <div className="card bg-primary text-light">
            <div className="card-body text-center">
              <p className="card-text">
                <span>OUR</span>COUNTRY
              </p>
              <p className="card-text">INDIA</p>
            </div>
          </div>
          <div className="card bg-secondary text-light">
            <div className="card-body text-center">
              <p className="card-text">
                <span>TOTAL</span>CONFIRMED
              </p>
              <p className="card-val">{latest.confirmed}</p>
            </div>
          </div>
          <div className="card bg-success text-light">
            <div className="card-body text-center">
              <p className="card-text">
                <span>TOTAL</span>RECOVERED
              </p>
              <p className="card-val">{latest.recovered}</p>
            </div>
          </div>
        </div>
        {/* second rows data */}
        <div className="card-deck mt-5">
          <div className="card bg-danger text-light">
            <div className="card-body text-center">
              <p className="card-text">
                <span>TOTAL</span>DEATHS
              </p>
              <p className="card-val">{latest.deaths}</p>
            </div>
          </div>
          <div className="card bg-warning text-light">
            <div className="card-body text-center">
              <p className="card-text">
                <span>TOTAL</span>ACTIVE
              </p>
              <p className="card-val">{latest.active}</p>
            </div>
          </div>
          <div className="card bg-info text-light">
            <div className="card-body text-center">
              <p className="card-text">
                <span>TOTAL</span>UPDATED
              </p>
              <p className="card-val">{latest.lastupdatedtime}</p>
            </div>
          </div>
        </div>

        {/* Search */}

        <div class="form-group">
          <input
            type="text"
            onChange={(e) => setSearchStates(e.target.value)}
            className="form-control mt-5"
            id="uname"
            placeholder="Search for a state"
            name="name"
            required
          ></input>
        </div>

        {/* stateWise data */}

        <table className="container-fluid mt-5 table table-bordered table-hover table-sm">
          <thead className="thead-dark">
            <tr className="text-center">
              <th>State</th>
              <th>Confirmed</th>
              <th>Recovered</th>
              <th>Deaths</th>
              <th>Active</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody className="text-center">{showDataForState}</tbody>
        </table>
      </div>
    </>
  );
}
