"use client";

import Map, { Source, Layer, MapEvent, Popup, MapLayerMouseEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { LandParcel } from "@prisma/client";
import { featureCollection } from "@turf/helpers";
import { useState } from "react";
import Link from "next/link";
import { MAPBOX_TOKEN, centerOfFeature, type MapParcel, makeMapParcel } from "../lib/maps";




export default function ParcelsMap({ parcels }: { parcels: LandParcel[]}) {
  const [popupParcel, setPopupParcel] = useState<MapParcel | null>(null);
  const parcelFeatures: MapParcel[] = parcels.map(makeMapParcel);
  const featureLayerId = (feat: MapParcel) => `${feat.id}-layer`
  const farm = featureCollection(parcelFeatures.map((p) => p.feature));
  const farmCentre = centerOfFeature(farm);

  const flyOnLoad = (event: MapEvent) => {
    const map = event.target;
    map.flyTo({
      center: farmCentre,
      zoom: 13,
      essential: true
    })
  }

  const handleParcelClick = (event: MapLayerMouseEvent) => {
    if (event.features && event.features.length > 0) {
      const clickedId = event.features[0].layer.id;
      const parcel = parcelFeatures.find(p => featureLayerId(p) == clickedId);
      if (parcel) {
        setPopupParcel(parcel);
      }
    }
  }

  return (
    <div className="my-4 rounded-lg overflow-hidden">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: -1.615,
          latitude: 52.6297,
          zoom: 6
        }}
        style={{width: '100%', height: '400px'}}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        onLoad={flyOnLoad}
        interactiveLayerIds={parcelFeatures.map(featureLayerId)}
        onClick={handleParcelClick}
      >
       {parcelFeatures.map((p) => (
        <div key={p.id}>
          <Source  id={`${p.id}-source`} type="geojson" data={p.feature}>
            <Layer 
              id={featureLayerId(p)}
              type="fill"
              paint={{
                "fill-color": "#FEEA00",
                "fill-opacity": 0.5
              }}
            />
          </Source>
        </div>
       ))} 
       { popupParcel && (
        <Popup
          longitude={popupParcel.center[0]}
          latitude={popupParcel.center[1]}
          closeOnClick={false}
          onClose={() => setPopupParcel(null)}
        >
          <div className="p-4">
            <h2 className="font-semibold text-sm pb-2">{popupParcel.name}</h2>
            <Link href={`/${popupParcel.sbi}/parcels/${popupParcel.id}`} className="btn btn-sm">Inspect</Link>
          </div>
        </Popup>
       )}
      </Map>
    </div>
  )

}