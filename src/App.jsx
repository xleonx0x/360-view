import React, { useEffect, useRef } from 'react';
import './App.css';
import panoramaImage from './unswtest.jpg'; // Import the image

function App() {
  const pannellumContainer = useRef(null);
  const pannellumViewer = useRef(null);

  useEffect(() => {
    if (window.pannellum && pannellumContainer.current) {
      pannellumViewer.current = pannellum.viewer(pannellumContainer.current, {
        type: "equirectangular",
        panorama: panoramaImage, // Relative path to your panorama image in the public directory
        autoLoad: true,
      });
    }
  }, []);

  return (
    <div className="App">
      <div
        ref={pannellumContainer}
        style={{ width: "750px", height: "750px" }}
      >
      </div>
        <button onClick={() => pannellumViewer.current.toggleFullscreen()}>click me for full screen</button>
    </div>
  );
}

export default App;