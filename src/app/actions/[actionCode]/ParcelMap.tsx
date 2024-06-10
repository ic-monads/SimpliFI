"use client";

import React from 'react';
import {useState, useEffect } from 'react';
import Map, { Source, Layer, GeolocateControl, NavigationControl } from 'react-map-gl';
import { FeatureCollection, Feature } from 'geojson';
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN; // Set your mapbox token here

function mapFeature(feat: Feature): Feature {
  return {
    type: feat.type,
    geometry: feat.geometry,
    properties: feat.properties
  };
}

export default function ParcelMap({ sbi }: { sbi: string }) {
  const [data, setData] = useState<FeatureCollection | undefined>(undefined);
  useEffect(() => {
    /* global fetch */
    const fc = fetch(
      `/api/map?sbi=${sbi}`
    )
      .then((resp) => resp.json())
      .then((geojson) => ({
        type: 'FeatureCollection',
        features: geojson.features.map(mapFeature) as Feature[]
      }))
      .then((geojson) => {setData(geojson as FeatureCollection); console.log(geojson)})
      .catch(err => console.error('Could not load data', err)); // eslint-disable-line
    }, [sbi]);
  console.log(data);
  return (
    <>
      <Map
        initialViewState={{
          latitude: 52.57,
          longitude: -0.25,
          zoom: 10
        }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <GeolocateControl position="top-left" />
			  <NavigationControl position="top-left" />
        {data && (
          <>
            <Source id="parcels" type="geojson" data={data}>
              <Layer id="parcel-fill" type="fill" paint={{"fill-color": "green", "fill-opacity": 0.5}} />
            </Source>
          </>
        )}
      </Map>
    </>
  );
}