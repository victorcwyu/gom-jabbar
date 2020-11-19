import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function NewReport() {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const [level, setLevel] = useState("");
  const token = localStorage.getItem("authentication-token");
  const lat = userData.lat;
  const lng = userData.lng;

  useEffect(() => {
    if (!token) {
      history.push("/");
    }
  }, [token, history]);

  const submitReport = (e) => {
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
        .catch((err) => console.log(err));
      history.push("/");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/newreportmap");
  };

  return (
    <div>
      <h1>
        New human sighting at coordinates: {lat}, {lng}
      </h1>
      <h2>Trash Level / 10</h2>
      <input
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? submitReport(e) : null)}
      />
      <button onClick={submitReport}>Submit Report</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}
