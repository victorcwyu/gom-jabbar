const initializeGoogleMap = (ref) => {
  return new window.google.maps.Map(ref, {
    center: { lat: 43.6560811, lng: -79.3823601 },
    zoom: 14,
    disableDefaultUI: true,
  });
};
