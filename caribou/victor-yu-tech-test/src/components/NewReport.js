import React, { useContext, useState } from "react";
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

  const submitReport = (e) => {
    e.preventDefault();
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
    </div>
  );
}
