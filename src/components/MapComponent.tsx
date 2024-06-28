import React from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";

import { treepoint } from "../assets";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "YOUR_API_KEY";

type Marker = {
  id: string;
  position: { lat: number; lng: number };
  timestamp: any;
};

type Props = {
  markers: Marker[];
  handleMapClick: (event: MapMouseEvent) => void;
};

const MapComponent: React.FC<Props> = ({ markers, handleMapClick }) => {
  return (
    <APIProvider apiKey={API_KEY}>
        <Map
          className="map"
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId={"5b5163a5c3c8d926"}
          onClick={handleMapClick}
        >
          {markers.map((marker, index) => (
            <AdvancedMarker key={marker.id} position={marker.position}>
              <img src={treepoint} width={32} height={32} alt="tree-img" />
            </AdvancedMarker>
          ))}
        </Map>
    </APIProvider>
  );
};

export default MapComponent;
