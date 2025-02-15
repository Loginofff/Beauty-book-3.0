import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { Search, MapPin } from "lucide-react";

export default function Map() {
  const [query, setQuery] = useState("");
  const [allMarkers, setAllMarkers] = useState([
    { lat: 52.4458238, lng: 13.6244508, label: "MASSAGE", name: "Alexa Do", address: "Spreetunnel, 12587 Berlin", index: "12587" },
    { lat: 52.553813, lng: 13.3734081, label: "MASSAGE", name: "Nina Schulze", address: "Exerzierstraße, 21, 13357 Berlin", index: "13357" },
    { lat: 52.4966583, lng: 13.291546, label: "MAKEUP", name: "Emma Wagner", address: "Johann-Sigismund-Straße, 16, 10369 Berlin", index: "12587" },
    { lat: 52.5233322, lng: 13.3827204, label: "HAARENVERFUNG", name: "Marie Braun", address: "Reinhardt str., 15, 10117 Berlin", index: "10117" },
    { lat: 52.4458238, lng: 13.6244508, label: "KOSMETIK", name: "Julia Koch", address: "Mariendorfer Damm, 45, 12109 Berlin", index: "12109" },
    { lat: 52.4487041, lng: 13.3828721, label: "NÄGEL", name: "Hanna Schulz", address: "Ernststraße, 64, 13509 Berlin", index: "13509" },
    { lat: 52.4448419, lng: 13.5747239, label: "FRISEUR", name: "Lena Schmidt", address: "Kietzer Straße, 13, 12555 Berlin", index: "12555" },
    { lat: 52.5167983, lng: 13.3034053, label: "FRISEUR", name: "Sophie Weber", address: "Behaimstraße, 4, 10585 Berlin", index: "10585" },
  ]);
  
  const [markers, setMarkers] = useState(allMarkers);
  const [center, setCenter] = useState([52.520008, 13.404954]); // Берлин по умолчанию

  const searchPlaces = useCallback(() => {
    const filteredMarkers = allMarkers.filter(
      (marker) =>
        marker.index === query ||
        marker.label.toLowerCase().includes(query.toLowerCase()) ||
        marker.address.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredMarkers.length > 0) {
      setCenter([filteredMarkers[0].lat, filteredMarkers[0].lng]);
      setMarkers(filteredMarkers);
    } else {
      setMarkers([]);
      setCenter([52.520008, 13.404954]); // Сброс на центр Берлина
    }
  }, [allMarkers, query]);

  useEffect(() => {
    if (query === "") {
      setMarkers(allMarkers);
      setCenter([52.520008, 13.404954]);
    } else {
      searchPlaces();
    }
  }, [query, allMarkers, searchPlaces]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const addSearchControlToMap = (map) => {
    const searchControl = new GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: "bar",
      autoClose: true,
      searchLabel: "Postleitzahl oder nach Behandlung suchen",
      keepResult: true,
      showMarker: false,
    });
    map.addControl(searchControl);
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      {/* Поисковая строка */}
      <div className="flex items-center w-full max-w-lg p-2 bg-white rounded-lg shadow-md">
        <Search size={20} className="text-gray-400 mr-2" />
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Postleitzahl oder nach Behandlung suchen"
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <MapPin size={20} className="ml-2 text-gray-400" />
      </div>

      {/* Контейнер для карты */}
      <div className="w-full max-w-4xl h-[600px] sm:h-[500px] xs:h-[400px] mt-4 rounded-lg overflow-hidden shadow-xl">
        <MapContainer
          center={center}
          zoom={10}
          style={{ width: "100%", height: "100%" }}
          whenCreated={addSearchControlToMap}
        >
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Маркеры */}
          {markers.map((marker, index) => (
            <CircleMarker
              key={index}
              center={[marker.lat, marker.lng]}
              radius={10}
              color="transparent"
              fillColor="green"
              fillOpacity={0.7}
            >
              <Popup>
                <h2>{marker.label}</h2>
                <h2>{marker.name}</h2>
                <p>{marker.address}</p>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
