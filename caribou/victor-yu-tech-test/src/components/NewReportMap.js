import React, { useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import { initializeGoogleMap } from "../helpers/helpers.js";
import "../styles/NewReportMap.css";

const noDisplay = {
  display: "none",
};

export default function NewReportMap() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const googleMapRef = useRef(null);
  const token = localStorage.getItem("authentication-token");

  useEffect(() => {
    if (!token) {
      history.push("/");
    } else {
      const createNewReportMap = () => {
        // Initialize Google Maps
        const map = initializeGoogleMap(googleMapRef.current);
        // Initialize infoWindow
        const pinInfoWindow = new window.google.maps.InfoWindow({
          content: document.getElementById("info-content"),
        });
        // drops pin on map
        const dropPin = (event) => {
          const pin = new window.google.maps.Marker({
            draggable: true,
            position: event.latLng,
            map: map,
          });
          getLatLong(pin);
          // adds listener to open InfoWindow when pin is clicked
          pin.addListener("click", function () {
            getLatLong(pin);
          });
          // close InfoWindow until dragged to new position
          pin.addListener("drag", function () {
            pinInfoWindow.close();
          });
          // add an end of drag listener
          pin.addListener("dragend", function () {
            getLatLong(pin);
          });
          // remove listener so that the user can only drop one pin
          window.google.maps.event.removeListener(pinListener);
        };
        // adds listener to drop pin when map is clicked
        const pinListener = window.google.maps.event.addListener(
          map,
          "click",
          dropPin
        );
        // retrieves latitude and longitude
        function getLatLong(pin) {
          let lat = pin.getPosition().lat();
          let lng = pin.getPosition().lng();
          // let latLong = pin.getPosition().lat() + "," + pin.getPosition().lng();
          pinInfoWindow.open(map, pin);
          buildIWContent(lat, lng);
        }
        // Load the pin information into the HTML elements used by the InfoWindow.
        function buildIWContent(lat, lng) {
          document.getElementById("iw-lat").textContent = lat;
          document.getElementById("iw-lng").textContent = lng;
        }
      };
      createNewReportMap();
    }
  }, [token, history]);

  // redirect to reports
  const submitReport = (e) => {
    e.preventDefault();
    let lat = document.getElementById("iw-lat").textContent;
    let lng = document.getElementById("iw-lng").textContent;
    setUserData({ ...userData, lat, lng });
    history.push("/newreport");
  };

  return (
    <>
      <h1>NEW REPORT MAP</h1>
      <div id="homeMap" ref={googleMapRef} />
      <div style={noDisplay}>
        <div id="info-content">
          <h2>Human spotting at:</h2>
          <table>
            <tbody>
              <tr id="lat-row">
                <td id="iw-lat"></td>
              </tr>
              <tr id="long-row">
                <td id="iw-lng"></td>
              </tr>
              <tr>
                <td>
                  <button onClick={submitReport}>Submit Report</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
