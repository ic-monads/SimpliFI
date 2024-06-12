"use client";

import React from "react";
import Map, { Source, Layer, type FillLayer, MapEvent, Popup, MapLayerMouseEvent } from "react-map-gl";
import { Feature } from "geojson";
import centroid from "@turf/centroid";
import { featureCollection } from "@turf/helpers";
import type { LandParcel } from "@prisma/client";

const layerStyle: FillLayer = {
  id: 'parcel-boundary',
  type: 'fill',
  paint: {
    'fill-color': 'blue',
    'fill-opacity': 0.5
  }
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function ParcelMap({ parcels }: { parcels: LandParcel[] }) {
  const center = centroid(centroid(featureCollection(parcels.map((p) => p.feature as unknown as Feature)))).geometry.coordinates as [number, number];
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const flyOnLoad = (event: MapEvent) => {
    const map = event.target;
    map.flyTo( {
      center: center,
      zoom: 15,
      essential: true
    })
  }

  const mapClick = (e: MapLayerMouseEvent) => {
    e.preventDefault();
    if (e.features) {
      setShowPopup(true);
    }
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
      onClick={mapClick}
      interactiveLayerIds={["parcel-boundary"]}
    >

      <Source id="my-data" type="geojson" data={parcels[0].feature as unknown as Feature}>
        <Layer {...layerStyle} />
        {showPopup && 
          <Popup longitude={center[0]} latitude={center[1]}
            anchor="center"
            onClose={() => setShowPopup(false)}
          >
            Hi
          </Popup>
        }
      </Source>
    </Map> 
  )
}