import "leaflet/dist/leaflet.css";
import { Marker, MapContainer, TileLayer } from 'react-leaflet';
import { useMapEvent } from 'react-leaflet/hooks';
import { useState } from 'react';

function UserMarker({ sendLocation }) {
    const [lat, setLat] = useState(10.338509);
    const [lng, setLng] = useState(123.912008);

    useMapEvent('click', (e) => {
        const { lat, lng } = e.latlng;
        setLat(lat);
        setLng(lng);
        sendLocation(lat, lng);
    });

    return (
        <Marker position={[lat, lng]}>
        </Marker>
    );
}

export default function Map({ sendLocation }) {
    return (
        <div className="border h-100 p-1 rounded-lg">
            <MapContainer className="h-full" center={[10.338509, 123.912008]} zoom={18}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <UserMarker sendLocation={sendLocation} />
            </MapContainer>
        </div>
    );
}
