"use client";

import Map, { Source, Layer, NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Feature, FeatureCollection } from "geojson";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN; // Set your mapbox token here

export default function MaineMap() {

  const maine: Feature = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-67.13734, 45.13745],
          [-66.96466, 44.8097],
          [-68.03252, 44.3252],
          [-69.06, 43.98],
          [-70.11617, 43.68405],
          [-70.64573, 43.09008],
          [-70.75102, 43.08003],
          [-70.79761, 43.21973],
          [-70.98176, 43.36789],
          [-70.94416, 43.46633],
          [-71.08482, 45.30524],
          [-70.66002, 45.46022],
          [-70.30495, 45.91479],
          [-70.00014, 46.69317],
          [-69.23708, 47.44777],
          [-68.90478, 47.18479],
          [-68.2343, 47.35462],
          [-67.79035, 47.06624],
          [-67.79141, 45.70258],
          [-67.13734, 45.13745],
        ],
      ],
    },
    properties: {
      name: "Maine"
    }
  };
  const colorado: Feature = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [
            -109.0283203125,
            37.020098201368114
          ],
          [
            -102.06298828125,
            37.020098201368114
          ],
          [
            -102.06298828125,
            40.9964840143779
          ],
          [
            -109.0283203125,
            40.9964840143779
          ],
          [
            -109.0283203125,
            37.020098201368114
          ]
        ]
      ]
    },
    properties: {
      name: "Colorado"
    }
  }
  const collection: FeatureCollection = {
    type: 'FeatureCollection',
    features: [ maine, colorado ]
  }

  return (
    <Map
      style={{ width: "100%", height: "400px" }}
      mapStyle="mapbox://styles/mapbox/light-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Source id="states" type="geojson" data={collection}>
        <Layer
          id="state-layer"
          type="fill"
          paint={{
            "fill-color": "green",
            "fill-opacity": 0.5,
          }}
        />
      </Source>
      <GeolocateControl position="top-left" />
			<NavigationControl position="top-left" />
    </Map>
  );
}