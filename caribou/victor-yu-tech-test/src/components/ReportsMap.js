import React, { useEffect, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import { initializeGoogleMap } from "../helpers/helpers.js";
import "../styles/ReportsMap.scss";
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
            content: `<h3 style="text-align:center;">Human spotted at:</h3>
            <h4 style="text-align:center;">latitude: ${report[0].lat}</h4>
            <h4 style="text-align:center;">longitude: ${report[0].lng}</h4>
            <h4 style="text-align:center;">trash level: ${report[1]}</h4>
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
    <div className="reports-map">
      <div className="reports-map-header">
        <h2>Human Sightings</h2>
        <Link className="report-link" to="/newreportmap">
          <button>Report a human</button>
        </Link>
      </div>
      <div id="reports-map" ref={googleMapRef} />
    </div>
  );
}
