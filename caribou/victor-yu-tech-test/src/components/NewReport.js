import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/NewReport.scss";

export default function NewReport() {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const [level, setLevel] = useState("");
  const token = localStorage.getItem("authentication-token");
  const lat = userData.lat;
  const lng = userData.lng;

  useEffect(() => {
    if (!token || !lat || !lng) {
      history.push("/");
    }
  }, [token, history, lat, lng]);

  const submitReport = (e) => {
    const socket = io("http://localhost:5000");
    e.preventDefault();
    // check that the level is between 1 and 10
    const range = (level - 0) * (level - 11) < 0;
    if (!range || Number.isNaN(level)) {
      alert("Please enter a trash level between 1 and 10!");
    } else {
      axios
        .post(
          "http://localhost:5000/reports/addReport",
          {
            lat,
            lng,
            level,
          },
          {
            headers: {
              "Authentication-Token": token,
            },
          }
        )
        // allows real-time mapping of reports
        .then(() => socket.emit("newReport"))
        .catch((err) => console.log(err));
      history.push("/");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/newreportmap");
  };

  return (
    <>
      <Header />
      <div className="reportWrapper">
        <h1>Confirmed human spotting at:</h1>
        <h2>latitude: {lat}</h2>
        <h2>longitude: {lng}</h2>
        <h3>Please provide a trash level (1-10)</h3>
        <form autoComplete="off" onSubmit={submitReport}>
          <input
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? submitReport(e) : null)}
          />
          <button type="submit">Submit Report</button>
          <button onClick={handleCancel}>Cancel</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
