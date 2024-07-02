import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import panoramaImage from './unswtest.jpg'; // Import the image
import exifr from 'exifr';
import { getDistance } from 'geolib';



function App() {
  const pannellumContainer = useRef(null);
  const pannellumViewer = useRef(null);
  const mapViewer = useRef(null);
  const [distance, setDistance] = useState(0);

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
          zoom: 14.5,
          zLevel: 0,
          zLevelUpdater: true,
          zLevelControl: false,
          maxBounds: [[151.217893555, -33.9242064802], [151.244924424,-33.9126716815]]
        });
        // -33.9089390808443, 151.21999843192907
        // -33.92837944238415, 151.24530676962988
        mapViewer.current.on('click', (e) => {
          const existingLayer = mapViewer.current.getLayer("line1");
          const existingSource = mapViewer.current.getSource("line1");
          if (existingLayer && existingSource) {
            mapViewer.current.removeLayer("line1")
            mapViewer.current.removeSource("line1");
          }
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

        mapViewer.current.addLayer({
          id: "line1",
          type: "line",
          source: {
            type: 'geojson',
            data: {
              type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [lngLat.lng, lngLat.lat], 
                    [151.23208631753192, -33.918142847260945]
                  ]
                },
                },
              },
                layout: {
                  "line-join": "round",
                  "line-cap": "round",
                },
                paint: {
                  "line-color": "#FF9B00",
                  "line-width": 3,
                },
          
        })
        
        let cool = getDistance(
          {latitude: lngLat.lat, longitude: lngLat.lng},
          {latitude: "-33.918142847260945", longitude: "151.23208631753192"}
        )
        setDistance(cool)
        });
        mapViewer.current.on('load', function(){
          // Add zoom and rotation controls to the map.

          var floorBar = new Mazemap.ZLevelBarControl( {
              autoUpdate: true,
              maxHeight: 200 // Can also set initial maxHeight if no need for auto resize
          } );
          mapViewer.current.addControl( floorBar, 'bottom-left' );
        })
        console.log(exifr.parse(panoramaImage));
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
        <p>You are {distance} metres away</p>
        </div>
    </div>
  );
}

export default App;