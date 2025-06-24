import "leaflet/dist/leaflet.css";
import { Marker, MapContainer, TileLayer } from 'react-leaflet';
import { useMapEvent } from 'react-leaflet/hooks';
import { useState } from 'react';

function UserMarker({ initialMark, sendLocation }) {
    const [lat, setLat] = useState(initialMark.lat);
    const [lng, setLng] = useState(initialMark.lng);

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

export default function Map({ markAt, sendLocation }) {
    return (
        <div className="border h-100 p-1 rounded-lg">
            <MapContainer className="h-full" center={[markAt.lat, markAt.lng]} zoom={12}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <UserMarker initialMark={markAt} sendLocation={sendLocation} />
            </MapContainer>
        </div>
    );
}
