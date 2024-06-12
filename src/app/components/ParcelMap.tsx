"use client";

import Map, { Source, Layer, type FillLayer, MapEvent } from "react-map-gl";
import { Feature } from "geojson";
import 'mapbox-gl/dist/mapbox-gl.css';
import { centerOfFeature, MAPBOX_TOKEN } from "@/app/lib/maps";

const layerStyle: FillLayer = {
  id: 'parcel-boundary',
  type: 'fill',
  paint: {
    'fill-color': '#FEEA00',
    'fill-opacity': 0.5
  }
}

export default function ParcelMap({ feature }: { feature: Feature }) {
  const [long, lat] = centerOfFeature(feature);
  return (
    <div className="my-4 rounded-lg overflow-hidden">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: long,
          latitude: lat,
          zoom: 15
        }}
        style={{width: '100%', height: '400px'}}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      >
        <Source id="my-data" type="geojson" data={feature}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </div>
  )
}