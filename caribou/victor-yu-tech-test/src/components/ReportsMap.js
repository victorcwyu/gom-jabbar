import React, { useEffect, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import { initializeGoogleMap } from "../helpers/helpers.js";
import "../styles/ReportsMap.css";
import axios from "axios";
import io from "socket.io-client";

const markers = [];
const infowindows = [];

export default function ReportsMap() {
  const history = useHistory();
  const googleMapRef = useRef(null);
  const token = localStorage.getItem("authentication-token");

  const reportsCoordinates = function (reportsArr) {
    const coordinates = reportsArr.map((report) => {
      return [
        {
          lat: report.lat,
          lng: report.lng,
        },
        report.level,
      ];
    });
    return coordinates;
  };

  useEffect(() => {
    const socket = io("http://localhost:5000");

    if (!token) {
      history.push("/");
    } else {
      const getReportsData = async () => {
        const res = await axios.get(
          "http://localhost:5000/reports/getReports",
          {
            headers: { "Authentication-Token": token },
          }
        );
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
      createReportsMap();
      // when a new report is submited, the reports map is re-rendered
      socket.on("reportsUpdated", () => {
        createReportsMap();
      });
    }
    return () => socket.disconnect();
  }, [token, history]);

  return (
    <>
      <h1>HUMAN SIGHTINGS</h1>
      <Link to="/newreportmap">REPORT A HUMAN</Link>
      <div id="reports-map" ref={googleMapRef} />
    </>
  );
}
