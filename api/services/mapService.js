// services/mapService.js
import fetch from "node-fetch";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org";

// Convert address → lat/lng
export async function geocodeAddress(address) {
  const url = `${NOMINATIM_URL}/search?format=json&q=${encodeURIComponent(
    address
  )}&limit=1`;
  const res = await fetch(url, {
    headers: { "User-Agent": "LogisticsApp/1.0" },
  });
  const data = await res.json();

  if (!data.length) {
    throw new Error(`Address not found: ${address}`);
  }

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
    displayName: data[0].display_name,
  };
}

// Convert lat/lng → address
export async function reverseGeocode(lat, lng) {
  const url = `${NOMINATIM_URL}/reverse?format=json&lat=${lat}&lon=${lng}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "LogisticsApp/1.0" },
  });
  const data = await res.json();

  return {
    address: data.display_name || "Unknown location",
  };
}

// Generate route line from multiple stops
export async function getRouteLine(locations) {
  // locations: [{ address: "Ikeja, Lagos, Nigeria", date: "2025-08-19" }, ...]
  const results = [];

  for (const loc of locations) {
    const geo = await geocodeAddress(loc.address);

    results.push({
      city: geo.displayName.split(",")[0], // extract city from display name
      country: geo.displayName.split(",").slice(-1)[0], // last part = country
      description: loc.description || geo.displayName,
      date: loc.date,
      lat: geo.lat,
      lng: geo.lng,
    });
  }

  return results;
}
