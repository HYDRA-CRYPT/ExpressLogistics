// Map service for geocoding and route generation
const NOMINATIM_URL = "https://nominatim.openstreetmap.org";

export interface GeocodeResult {
  lat: number;
  lng: number;
  displayName: string;
}

export interface RouteLocation {
  address: string;
  date: string;
  description?: string;
}

export interface RoutePoint {
  city: string;
  country: string;
  description: string;
  date: string;
  lat: number;
  lng: number;
}

// Convert address → lat/lng
export async function geocodeAddress(address: string): Promise<GeocodeResult> {
  const url = `${NOMINATIM_URL}/search?format=json&q=${encodeURIComponent(
    address
  )}&limit=1`;

  const response = await fetch(url, {
    headers: { "User-Agent": "LogisticsApp/1.0" },
  });

  const data = await response.json();

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
export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<{ address: string }> {
  const url = `${NOMINATIM_URL}/reverse?format=json&lat=${lat}&lon=${lng}`;

  const response = await fetch(url, {
    headers: { "User-Agent": "LogisticsApp/1.0" },
  });

  const data = await response.json();

  return {
    address: data.display_name || "Unknown location",
  };
}

// Generate route line from multiple stops
export async function getRouteLine(
  locations: RouteLocation[]
): Promise<RoutePoint[]> {
  const results: RoutePoint[] = [];

  for (const loc of locations) {
    try {
      const geo = await geocodeAddress(loc.address);
      const addressParts = geo.displayName.split(",");

      results.push({
        city: addressParts[0]?.trim() || "Unknown City",
        country:
          addressParts[addressParts.length - 1]?.trim() || "Unknown Country",
        description: loc.description || geo.displayName,
        date: loc.date,
        lat: geo.lat,
        lng: geo.lng,
      });
    } catch (error) {
      console.error(`Failed to geocode ${loc.address}:`, error);
      // Add a fallback entry
      results.push({
        city: loc.address,
        country: "Unknown",
        description: loc.description || loc.address,
        date: loc.date,
        lat: 0,
        lng: 0,
      });
    }
  }

  return results;
}
