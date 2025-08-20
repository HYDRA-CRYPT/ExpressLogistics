import { jest } from "@jest/globals";
import request from "supertest";
import app from "../app.js";
import Delivery from "../models/delivery.model.js";
import redisClient from "../config/redis.js";

jest.mock("../models/delivery.model.js");
jest.mock("../config/redis.js");

describe("Delivery API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 for GET /api/deliveries", async () => {
    Delivery.find.mockResolvedValue([{ _id: "1", item: "Test Package" }]);
    const res = await request(app).get("/api/deliveries");
    expect(res.status).toBe(200);
    expect(res.body[0].item).toBe("Test Package");
  });
});
