const initializeGoogleMap = (ref) => {
  return new window.google.maps.Map(ref, {
    center: { lat: 45.508888, lng: -73.561668 },
    zoom: 14,
    disableDefaultUI: true,
  });
};

export { initializeGoogleMap };
