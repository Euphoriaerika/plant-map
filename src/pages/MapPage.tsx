import React, { useState, useEffect } from "react";
import { MapMouseEvent } from "@vis.gl/react-google-maps";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  writeBatch,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

import DeleteButton from "../components/DeleteButton";
import MapComponent from "../components/MapComponent";

type Marker = {
  id: string;
  position: { lat: number; lng: number };
  timestamp: any;
};

const MapPage = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      const markersCollection = collection(db, "quests");
      const markersSnapshot = await getDocs(
        query(markersCollection, orderBy("timestamp"))
      );

      const fetchedMarkers: Marker[] = [];
      markersSnapshot.forEach((doc) => {
        const markerData = doc.data();
        const marker: Marker = {
          id: doc.id,
          position: markerData.position,
          timestamp: markerData.timestamp,
        };
        fetchedMarkers.push(marker);
      });

      setMarkers(fetchedMarkers);
    };

    fetchMarkers();
  }, []);

  const handleMapClick = async (event: MapMouseEvent) => {
    const { latLng } = event.detail;
    if (!latLng) return;

    const newMarker: Marker = {
      id: "",
      position: { lat: latLng.lat, lng: latLng.lng },
      timestamp: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(collection(db, "quests"), newMarker);
      const newMarkers = [...markers, { ...newMarker, id: docRef.id }];
      setMarkers(newMarkers);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleDeleteMarkers = async () => {
    try {
      const batch = writeBatch(db);
      markers.forEach((marker) => {
        const docRef = doc(db, "quests", marker.id);
        batch.delete(docRef);
      });
      await batch.commit();
      setMarkers([]);
    } catch (error) {
      console.error("Error deleting markers:", error);
    }
  };

  return (
    <div>
      <MapComponent markers={markers} handleMapClick={handleMapClick} />
      <DeleteButton handleDeleteMarkers={handleDeleteMarkers} />
    </div>
  );
};

export default MapPage;
