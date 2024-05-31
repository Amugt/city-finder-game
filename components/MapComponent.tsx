import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import GeoJsonData from '../data/custom.geo.json';
interface MapComponentProps {
  onPinMove: (position: [number, number]) => void;
  pinPosition: [number, number] | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ onPinMove, pinPosition }) => {
  
  const mapRef = useRef<L.Map | null>(null);
  const pinMarkerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map', {
        center: [52.370216, 4.895168],
        zoom: 4,
        maxZoom: 4, 
        minZoom:3.4,
        zoomControl: false
      });
      map.createPane('labels');
    

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors, &copy; CartoDB',
        pane: 'labels' 
      }).addTo(map);
   
        //  GeoJSON data layer
      const geojson = L.geoJson(GeoJsonData, {
        onEachFeature: (feature, layer) => {
          layer.bindPopup(feature.properties.name);
        }
      }).addTo(map);

      const pinIcon = L.icon({
        iconUrl: '/pin.png',
        iconRetinaUrl: '/pin@2x.png',
        iconAnchor: [12, 41],
        popupAnchor: [0, -41],
      
        shadowAnchor: [12, 41],
        iconSize: [25, 41],
        shadowSize: [41, 41],
      });

      const pinMarker = L.marker([52.370216, 4.895168], {
        icon: pinIcon,
        draggable: true, 
      }).addTo(map);

      pinMarkerRef.current = pinMarker;

      pinMarker.on('dragend', (e: L.LeafletEvent) => {
        const position = e.target.getLatLng();
        onPinMove([position.lat, position.lng]);
      });

      mapRef.current = map;
    }
    if (pinPosition && pinMarkerRef.current) {
      pinMarkerRef.current.setLatLng(pinPosition);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [onPinMove, pinPosition]);

  return (
    <div id="map"  style={{ height: '400px', width:"700px" }} />
  );
};

export default MapComponent;
