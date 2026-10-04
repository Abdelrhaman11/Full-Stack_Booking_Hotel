import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";

import "@geoapify/geocoder-autocomplete/styles/round-borders.css";
import { useEffect, useRef } from "react";
import "./LocationInput.css";
export default function LocationInput({ value, onChange }) {

  const containerRef = useRef(null);

  function handlePlaceSelect(place) {
    if (!place) return;

    const properties = place.properties;

    const location = {
      address: properties.formatted,
      name: properties.name || "",
      lat: properties.lat,
      lng: properties.lon,
      city: properties.city || "",
      country: properties.country || "",
      countryCode: properties.country_code || "",
    };

    onChange(location);
  }

  useEffect(() => {
    if (!value?.address || !containerRef.current) return;

    const input = containerRef.current.querySelector("input");

    if (input && !input.value) {
      input.value = value.address;
    }
  }, [value]);

  return (
    <div className="m-2" ref={containerRef}>
      <GeoapifyContext
        apiKey={import.meta.env.VITE_GEOAPIFY_API_KEY}
      >
        <GeoapifyGeocoderAutocomplete
          placeholder="Location"
          placeSelect={handlePlaceSelect}
        />
      </GeoapifyContext>
    </div>
  );
}