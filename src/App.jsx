import React, { useEffect, useRef } from 'react';
import './App.css';
import panoramaImage from './unswtest.jpg'; // Import the image

function App() {
  const pannellumContainer = useRef(null);
  const pannellumViewer = useRef(null);
  const mapViewer = useRef(null);

  useEffect(() => {
    if (window.pannellum && pannellumContainer.current) {
      pannellumViewer.current = pannellum.viewer(pannellumContainer.current, {
        type: "equirectangular",
        panorama: panoramaImage, // Relative path to your panorama image in the public directory
        autoLoad: true,
      });
    }
  }, []);
  var marker;
  useEffect(() => {
        mapViewer.current = new Mazemap.Map({
          container: "map-container",
          campuses: 111,
          center: {lng: 151.23140898946815, lat: 	-33.91702431505671},
          zoom: 14,
          zLevel: 0
        });

        mapViewer.current.on('click', (e) => {
          const lngLat = e.lngLat;
          console.log(lngLat);
          
          if (marker) {
            marker.remove()
          }
          marker = new Mazemap.MazeMarker( {
            color: "#988926",
            size: 20,
            zLevel: 0 // The floor zLevel coordinate is given here
        } )
        .setLngLat( lngLat ) // Set the LngLat coordinates here
        .addTo(mapViewer.current); // Now add to the map
        });

  }, []);


  return (
    <div className="App">
      
      <div id="3d-view-container">
        <div
          id="map"
          ref={pannellumContainer}
          style={{ width: "90vw", height: "90vh" }}
        >
      </div>

      </div>
      <div id="map-overlay">
        <div ref={mapViewer} id="map-container" style={{width: "450px", height: "300px", borderRadius: "5px"}}></div>
      </div>

        <div>
        <button onClick={() => pannellumViewer.current.toggleFullscreen()}>click me for full screen</button>
        </div>

    </div>
  );
}

export default App;