import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { Search, MapPin } from "lucide-react";

export default function Map() {
  const [query, setQuery] = useState("");
  const [allMarkers, setAllMarkers] = useState([
    {
      lat: 52.4458238,
      lng: 13.6244508,
      label: "MASSAGE",
      name:"Alexa Do",
      address: "Spreetunnel, 12587 Berlin",
      index: "12587",
    },
    {
      lat: 52.553813,
      lng: 13.3734081,
      label: "MASSAGE",
      name:"Nina Schulze",
      address: "Exerzierstraße, 21, 13357 Berlin",
      index: "13357",
    },
    {
      lat: 52.4966583,
      lng: 13.291546,
      label: "MAKEUP",
      name:"Emma Wagner",
      address: "Johann-Sigismund-Straße, 16, 10369 Berlin",
      index: "12587",
    },
    {
      lat: 52.5233322,
      lng: 13.3827204,
      label: "HAARENVERFUNG",
      name:"Marie Braun",
      address: "Reinhardt str., 15, 10117 Berlin",
      index: "10117",
    },
    {
      lat: 52.4458238,
      lng: 13.6244508,
      label: "KOSMETIK",
      name:"Julia Koch",
      address: "Mariendorfer Damm, 45, 12109 Berlin",
      index: "12109",
    },
    {
      lat: 52.4487041,
      lng: 13.3828721,
      label: "NÄGEL",
      name:"Hanna Schulz",
      address: "Ernststraße, 64, 13509 Berlin",
      index: "13509",
    },
    {
      lat: 52.4448419,
      lng: 13.5747239,
      label: "FRISEUR",
      name:"Lena Schmidt",
      address: "Kietzer Straße, 13, 12555 Berlin",
      index: "12555",
    },
    {
      lat: 52.5167983,
      lng: 13.3034053,
      label: "FRISEUR",
      name:"Sophie Weber",
      address: "Behaimstraße, 4, 10585 Berlin",
      index: "10585",
    },
  ]);
  const [markers, setMarkers] = useState(allMarkers);
  const [center, setCenter] = useState([52.520008, 13.404954]); // Начальный центр карты - Берлин

  useEffect(() => {
    if (query === "") {
      setMarkers(allMarkers);
      setCenter([52.520008, 13.404954]);
    } else {
      searchPlaces();
    }
  }, [query]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const searchPlaces = async () => {
    const filteredMarkers = allMarkers.filter(
      (marker) =>
        marker.index === query ||
        marker.label.toLowerCase().includes(query.toLowerCase()) ||
        marker.address.toLowerCase().includes(query.toLowerCase()) 
    );
    if (filteredMarkers.length > 0) {
      const newCenter = [filteredMarkers[0].lat, filteredMarkers[0].lng];
      setCenter(newCenter);
      setMarkers(filteredMarkers);
    } else {
      setMarkers([]);
      setCenter([52.520008, 13.404954]);
    }
  };

  const addSearchControlToMap = (map) => {
    const searchControl = new GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: "bar",
      autoClose: true,
      searchLabel: "Postleitzahl oder nach  Behandlung suchen",
      keepResult: true,
      showMarker: false,
    });
    map.addControl(searchControl);
  };

  return (
    <div>
      <div
        style={{ padding: "10px" }}
        className="flex flex-grow items-center mr-2 rounded-lg overflow-hidden"
      >
        <Search size={20} className="m-2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Postleitzahl oder nach  Behandlung suchen"
          style={{
            width: "100%",
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <MapPin size={20} className="ml-3 text-gray-400" />
      </div>

      <div
        style={{
          width: "900px",
          height: "600px",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.6)" }}>
          <MapContainer
            center={center}
            zoom={10}
            style={{ width: "900px", height: "600px", borderRadius: "10px" }}
            whenCreated={addSearchControlToMap}
          >
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Отображаем маркеры на карте */}
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
    </div>
  );
}