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
      pannellumViewer.current = pannellum.viewer(pannellumContainer.current, {
        "hfov": 100.0,
        "type": "multires",
        "multiRes": {
            "basePath": "multires",
            "path": "/%l/%s%y_%x",
            "fallbackPath": "/fallback/%s",
            "extension": "jpg",
            "tileResolution": 512,
            "maxLevel": 4,
            "cubeResolution": 2440
        },
        autoLoad: true
      });
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
            zLevel: mapViewer.current.zlevel // The floor zLevel coordinate is given here
        } )
        .setLngLat( lngLat ) // Set the LngLat coordinates here
        .addTo(mapViewer.current); // Now add to the map

        Mazemap.Data.getPoiAt(lngLat, mapViewer.current.zLevel, 111).then(poi => {
          console.log(poi);
        })

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
          console.log(mapViewer.current.getStyle());
          
            let style = mapViewer.current.getStyle();
            // hidden mode
            // style.layers = style.layers.filter(layer => layer.type !== 'symbol');
            // layer 143 room names
            // layer 144 building names

            let layer143 = style.layers[143];
            let layer144 = style.layers[144];
            let layer146 = style.layers[146];

            layer143.layout = {
                "text-field": "{text}",
                "text-font": [
                    "Open Sans Semibold",
                    "Arial Unicode MS Bold"
                ],
                "text-padding": 7,
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            17,
                            10
                        ],
                        [
                            20,
                            16
                        ],
                        [
                            20.9,
                            22
                        ]
                    ]
                },
                "text-anchor": "center",
          };
          layer144.layout = {
            "text-field": "{text}",
            "text-allow-overlap": false,
            "symbol-avoid-edges": false,
            "text-size": {
                "base": 1,
                "stops": [
                    [
                        13,
                        10
                    ],
                    [
                        16,
                        12
                    ],
                    [
                        17,
                        14
                    ],
                    [
                        20,
                        20
                    ]
                ]
            },
            "text-font": {
                "base": 1,
                "stops": [
                    [
                        10,
                        [
                            "Open Sans Regular"
                        ]
                    ],
                    [
                        17,
                        [
                            "Open Sans Bold"
                        ]
                    ]
                ]
            },
            "text-letter-spacing": 0.05,
            "text-padding": 10.75
        };

        layer146.layout = {
          "symbol-avoid-edges": false,
          "text-field": "University of New South Wales",
          "text-font": {
              "base": 1,
              "stops": [
                  [
                      4,
                      [
                          "DIN Offc Pro Bold"
                      ]
                  ],
                  [
                      5,
                      [
                          "DIN Offc Pro Bold"
                      ]
                  ],
                  [
                      17,
                      [
                          "DIN Offc Pro Regular"
                      ]
                  ]
              ]
          },
          "text-size": {
              "base": 1,
              "stops": [
                  [
                      4,
                      10
                  ],
                  [
                      16,
                      15
                  ]
              ]
          },
          "text-transform": {
              "base": 1,
              "stops": [
                  [
                      13,
                      "none"
                  ],
                  [
                      14,
                      "uppercase"
                  ]
              ]
          },
          "text-anchor": {
              "base": 1,
              "stops": [
                  [
                      13,
                      "top"
                  ],
                  [
                      14,
                      "center"
                  ]
              ]
          },
          "text-padding": 4,
          "text-offset": {
              "base": 1,
              "stops": [
                  [
                      13,
                      [
                          0,
                          0.5
                      ]
                  ],
                  [
                      14,
                      [
                          0,
                          0
                      ]
                  ]
              ]
          },
          "text-letter-spacing": 0.05
          };
          
          Mazemap.Data.getPoi(1001053280).then(poi => {
            poi.properties.title = "Matthews 163"
            console.log(poi);
          });

        mapViewer.current.setStyle(style);
            console.log(style);
          
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