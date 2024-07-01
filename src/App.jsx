import React, { useEffect, useRef } from 'react';
import './App.css';
import panoramaImage from './unswtest.jpg'; // Import the image

function App() {
  const pannellumContainer = useRef(null);

  useEffect(() => {
    if (window.pannellum && pannellumContainer.current) {
      window.pannellum.viewer(pannellumContainer.current, {
        type: "equirectangular",
        panorama: panoramaImage, // Relative path to your panorama image in the public directory
        autoLoad: true,
      });
    }
  }, []);

  return (
    <div className="App">
      <h1>Panorama Viewer with Pannellum</h1>
      <div
        ref={pannellumContainer}
        style={{ width: "100%", height: "100vh" }}
      ></div>
    </div>
  );
}

export default App;
