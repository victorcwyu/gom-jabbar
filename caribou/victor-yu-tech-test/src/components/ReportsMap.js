import React, { useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import { initializeGoogleMap, reportsCoordinates } from "../helpers/helpers.js";
import "../styles/ReportsMap.css";
import axios from "axios";

const markers = [];
const infowindows = [];

export default function NewReportMap() {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const googleMapRef = useRef(null);
  const token = localStorage.getItem("authentication-token");

  useEffect(() => {
    if (!userData.user) {
      history.push("/");
    }
  }, [userData.user, history]);

  useEffect(() => {
    createReportsMap();
  });

  const getReportsData = async () => {
    const res = await axios.get("http://localhost:5000/reports/getReports", {
      headers: { "Authentication-Token": token },
    });
    const reports = res.data.retrievedReports;
    if (reports === null || reports[0] === undefined) {
      return [];
    } else if (reports[0] !== undefined) {
      return reportsCoordinates(reports);
    }
  };

  const createReportsMap = async () => {
    const reportsCoordinates = await getReportsData();
    const map = initializeGoogleMap(googleMapRef.current);

    // map through reportsCoordinates array and add marker for each place
    reportsCoordinates.forEach((report, i) => {
      markers[i] = new window.google.maps.Marker({
        position: report[0],
        map: map,
      });
      infowindows[i] = new window.google.maps.InfoWindow({
        content: `<b>Sighting at: ${report[0].lat}, ${report[0].lng}</b>
          <br>
          trash level: ${report[1]}
        `,
      });
      // open an infowindow when the marker is clicked
      markers[i].addListener("click", function () {
        infowindows[i].open(map, markers[i]);
      });
    });
  };

  return (
    <>
      <h1>HUMAN SIGHTINGS</h1>
      <div id="reports-map" ref={googleMapRef} />
    </>
  );
}
