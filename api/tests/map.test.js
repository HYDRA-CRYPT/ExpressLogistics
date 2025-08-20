// tests/map.test.js
import { getRouteLine } from "../services/mapService.js";

describe("Map Service", () => {
  jest.setTimeout(20000); // in case API requests take longer

  it("should return a route line between two locations", async () => {
    const points = [
      {
        address: "Ikeja, Lagos, Nigeria",
        description: "Sender location",
        date: "2025-08-19",
      },
      {
        address: "Abuja, Nigeria",
        description: "Receiver location",
        date: "2025-08-21",
      },
    ];

    const route = await getRouteLine(points);

    expect(route).toBeDefined();
    expect(Array.isArray(route)).toBe(true);
    expect(route.length).toBeGreaterThan(0);

    // Optional: check if each point has lat/lng
    route.forEach((p) => {
      expect(p).toHaveProperty("lat");
      expect(p).toHaveProperty("lng");
      expect(typeof p.lat).toBe("number");
      expect(typeof p.lng).toBe("number");
    });

    console.log("Route result:", JSON.stringify(route, null, 2));
  });
});
