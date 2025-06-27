import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from 'react-leaflet';
import { createControlComponent } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet-routing-machine';

const createRoutineMachineLayer = ({ from, to }) => {
    return L.Routing.control({
        waypoints: [
            L.latLng(from.lat, from.lng),
            L.latLng(to.lat, to.lng)
        ],
        lineOptions: {
            styles: [{ color: "#f72585", weight: 5 }]
        },
    });
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default function RiderMap({ from, to }) {
    return (
        <div className="border h-100 p-1 rounded-lg">
            <MapContainer className="h-full" center={[from.lat, from.lng]} zoom={12}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RoutingMachine from={from} to={to} />
            </MapContainer>
        </div>
    );
}
