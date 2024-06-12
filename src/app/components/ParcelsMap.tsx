"use client";

import React from "react";
import Map, { Source, Layer, type FillLayer, MapEvent, Popup, MapLayerMouseEvent } from "react-map-gl";
import { Feature } from "geojson";
import centroid from "@turf/centroid";
import { featureCollection } from "@turf/helpers";
import type { LandParcel } from "@prisma/client";
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function ParcelMap({ parcels }: { parcels: LandParcel[] }) {
  const parcelFeatures = parcels.map((p) => { return {
    feature: p.feature as unknown as Feature,
    center: centroid(p.feature as unknown as Feature).geometry.coordinates as [number, number],
    id: p.id,
    name: p.name,
    sbi: p.sbi
  }});

  const center = centroid(featureCollection(parcelFeatures.map((p) => p.feature))).geometry.coordinates as [number, number];
  const [showPopups, setShowPopups] = React.useState<boolean[]>(Array(parcelFeatures.length).fill(false));
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
      const id = e.features[0].layer.id.split("-")[0];
      const i = parcelFeatures.findIndex((p) => p.id == id);
      console.log(i);
      console.log(showPopups);
      setShowPopups((curr) => {
        curr[i] = true;
        return curr;
      });
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
      interactiveLayerIds={parcelFeatures.map((p) => `${p.id}-layer`)}
    >
      { parcelFeatures.map((p, index) => {
        return (

          <Source key={p.id} id={p.id} type="geojson" data={p.feature as unknown as Feature}>
            <Layer id={`${p.id}-layer`} type="fill" paint={{"fill-color": "blue", "fill-opacity": 0.5 }} />
            {showPopups[index] && 
              <Popup
                longitude={p.center[0]}
                latitude={p.center[1]}
                anchor="center"
                onClose={() => setShowPopups((curr) => {
                  curr[index] = false;
                  return curr;
                })}
              >
                Hi
              </Popup>
            }
          </Source>
        )
      })}
      
    </Map> 
  )
}