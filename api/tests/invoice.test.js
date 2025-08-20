import request from "supertest";
import app from "../app.js";
import Invoice from "../models/invoice.model.js";
import redisClient from "../config/redis.js";

jest.mock("../models/invoice.model.js");
jest.mock("../config/redis.js");

describe("Invoice API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and an array of invoices", async () => {
    const mockInvoices = [
      { _id: "i1", amount: 100, status: "unpaid" },
      { _id: "i2", amount: 200, status: "paid" },
    ];
    Invoice.find.mockResolvedValue(mockInvoices);

    const res = await request(app).get("/api/invoices");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockInvoices);
  });

  it("should return 404 if no invoice found", async () => {
    Invoice.find.mockResolvedValue([]);
    const res = await request(app).get("/api/invoices");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("No invoices found");
  });

  it("should create a new invoice", async () => {
    const mockInvoice = { _id: "i3", amount: 300, status: "unpaid" };
    Invoice.create.mockResolvedValue(mockInvoice);

    const res = await request(app)
      .post("/api/invoices")
      .send({ amount: 300, status: "unpaid" });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockInvoice);
  });
});
