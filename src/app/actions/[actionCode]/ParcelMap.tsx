"use client";

import mapboxgl from "mapbox-gl";
import type { Map } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import { FeatureCollection } from "geojson";


mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

export default function ParcelMap({ sbi }: { sbi: string }) {
  const map = useRef<Map | null>(null);
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-0.25);
  const [lat, setLat] = useState(52.57);
  const [zoom, setZoom] = useState(10);

  async function fetchData(): Promise<FeatureCollection> {
    const response = await fetch(`/api/map?sbi=${sbi}`);
    const geojson = await response.json();
    console.log(geojson.data);
    return geojson.data as FeatureCollection;
  }

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on("load", async () => {
      const data = await fetchData();
      map.current!.addSource("parcels", {
        type: "geojson",
        data: data
      });

      map.current!.addLayer({
        id: "parcel-boundaries",
        type: "fill",
        source: "parcels",
        paint: {
          "fill-color": "green",
          "fill-opacity": 0.5
        }
      });
    });
  }, []); 

  return (
    <div>
      <div ref={mapContainer} style={{ height: "400px" }} />
    </div>
  );
}