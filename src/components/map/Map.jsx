import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import styles from "./styles/Map.module.css"
const libraries = ["places"];
const mapContainerStyle = {
    // width: "100%",
    height: "300px",
};

const center = {
    lat: 51.242762867157495, // default latitude
    lng: 6.71978238835451, // default longitude
};

const Map = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCmpKulhQEGzlUp7LqX8iivjP3JBUk28fg",
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
