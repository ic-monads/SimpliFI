"use client";

import React from "react";
import mapboxgl from "mapbox-gl";
import type { Map } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Feature, FeatureCollection } from "geojson";
import centroid from "@turf/centroid";


mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

export default function ParcelMap({ feature }: { feature: Feature }) {
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
      map.current!.addSource("parcel", {
        type: "geojson",
        data: feature
      });

      map.current!.addLayer({
        id: "parcel-boundary",
        type: "fill",
        source: "parcel",
        paint: {
          "fill-color": "blue",
          "fill-opacity": 0.5
        }
      });

      const target = {
        center: centroid(feature).geometry.coordinates as [number, number],
        zoom: 14,
        pitch: 0,
        bearing: 0
      }
      map.current!.flyTo({
        ...target,
        duration: 2000,
        essential: true
      });
      // map.current!.fitBounds([[feature.bbox![0], feature.bbox![1]], [feature.bbox![2], feature.bbox![3]]]);
    });
  }, []); 

  return (
    <div>
      <div ref={mapContainer} style={{ height: "400px" }} />
    </div>
  );
}