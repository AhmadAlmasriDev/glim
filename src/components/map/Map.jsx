import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import styles from "./styles/Map.module.css";
const libraries = ["places"];

// Change the height of the map using ths const, width if not specifies will take 100%
const mapContainerStyle = {
    height: "300px",
};

// The default position
const center = {
    lat: 51.242762867157495, // default latitude
    lng: 6.71978238835451, // default longitude
};

const Map = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
        libraries,
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <div className={`${styles.map_container}`}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={17}
                center={center}
            >
                <Marker position={center} />
            </GoogleMap>
        </div>
    );
};

export default Map;
