"use client";

import React from "react";
import mapboxgl from "mapbox-gl";
import type { Map } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Feature, FeatureCollection } from "geojson";
import { LandParcel } from "@prisma/client";
import centroid from "@turf/centroid";
import { featureCollection } from "@turf/helpers";
import { createRoot } from "react-dom/client";
import Link from "next/link";


mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

export default function ParcelsMap({ parcels }: { parcels: LandParcel[] }) {
  const map = useRef<Map | null>(null);
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-0.25);
  const [lat, setLat] = useState(52.57);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on("load", async () => {
      for (const parcel of parcels) {
        map.current!.addSource(`parcel-${parcel.id}`, {
          type: "geojson",
          data: parcel.feature as unknown as Feature
        });
  
        map.current!.addLayer({
          id: `parcel-${parcel.id}-boundary`,
          type: "fill",
          source: `parcel-${parcel.id}`,
          paint: {
            "fill-color": "#FEEA00",
            "fill-opacity": 0.5
          }
        });

        map.current!.on("click", `parcel-${parcel.id}-boundary`, (e) => {
          const content = (
            <div className="p-4">
              <h2 className="font-semibold text-sm pb-2">{parcel.name}</h2>
              <Link href={`/${parcel.sbi}/parcels/${parcel.id}`} className="btn btn-sm">Inspect</Link>
            </div>
          );
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<div id="popup-${parcel.id}"></div>`)
            .addTo(map.current!);

          createRoot(document.getElementById(`popup-${parcel.id}`)!).render(content);
        });
      }

      const target = {
        center: centroid(featureCollection(parcels.map((p) => p.feature as unknown as Feature))).geometry.coordinates as [number, number],
        zoom: 12,
        pitch: 0,
        bearing: 0
      }
      map.current!.flyTo({
        ...target,
        duration: 2000,
        essential: true
      });
    });
  }, []); 

  return (
    <div className="my-4 rounded-lg overflow-hidden">
      <div ref={mapContainer} style={{ height: "400px" }} />
    </div>
  );
}
