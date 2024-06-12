"use client";

import Map, { Source, Layer, type FillLayer, MapEvent } from "react-map-gl";
import { Feature } from "geojson";
import centroid from "@turf/centroid";

const layerStyle: FillLayer = {
  id: 'parcel-boundary',
  type: 'fill',
  paint: {
    'fill-color': 'blue',
    'fill-opacity': 0.5
  }
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function ParcelMap2({ feature }: { feature: Feature }) {
  const center = centroid(feature).geometry.coordinates as [number, number];
  const flyOnLoad = (event: MapEvent) => {
    const map = event.target;
    map.flyTo( {
      center: center,
      zoom: 15,
      essential: true
    })
  }
  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        longitude: -0.25,
        latitude: 52.57,
        zoom: 10
      }}
      style={{width: '100%', height: '400px'}}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      onLoad={flyOnLoad}
    >
      <Source id="my-data" type="geojson" data={feature}>
        <Layer {...layerStyle} />
      </Source>
    </Map> 
  )
}