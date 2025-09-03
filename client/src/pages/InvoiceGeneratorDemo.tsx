import React, { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  Package,
  CreditCard,
  Sparkles,
} from "lucide-react";
import {
  downloadInvoicePDF,
  previewInvoicePDF,
} from "../utils/invoicePdfGenerator";
import type { DeliveryData } from "../types/invoice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InvoiceGeneratorDemo: React.FC = () => {
  const [delivery] = useState<DeliveryData>({
    trackingCode: "AGL2025001",
    status: "In Transit",
    shipmentType: "Premium Express",
    dateSent: "2025-01-01",
    deliveryDate: "2025-01-03",
    deliveryFee: 50,
    currency: "$",
    sender: {
      name: "Aegis Express Logistics",
      address: "123 Express Avenue, Victoria Island",
      city: "Lagos",
      country: "Nigeria",
      email: "billing@aegisexpress.com",
      phone: "+234 801 234 5678",
    },
    receiver: {
      name: "John Smith",
      address: "456 Customer Street",
      city: "New York",
      country: "USA",
      email: "john.smith@email.com",
      phone: "+1 555 123 4567",
    },
    items: [
      { description: "Premium Package 1", value: 250, quantity: 2, weight: 5 },
      {
        description: "Express Document Delivery",
        value: 75,
        quantity: 1,
        weight: 0.5,
      },
      {
        description: "Fragile Electronics Shipment",
        value: 150,
        quantity: 1,
        weight: 3,
      },
      { description: "Business Documents", value: 50, quantity: 3, weight: 1 },
      {
        description: "Medical Supplies Package",
        value: 300,
        quantity: 1,
        weight: 8,
      },
    ],
  });

  const handleGeneratePDF = () => {
    downloadInvoicePDF(delivery);
  };

  const handlePreview = () => {
    previewInvoicePDF(delivery);
  };

  const calculateSubtotal = () => {
    return (
      delivery.items?.reduce(
        (sum, item) => sum + item.value * item.quantity,
        0
      ) || 0
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.075;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + (delivery.deliveryFee || 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                <FileText className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold flex items-center gap-2">
                  <Sparkles className="h-8 w-8" />
                  Enhanced PDF Invoice Generator
                </h1>
                <p className="text-blue-100 text-lg mt-2">
                  Professional shipping invoices with modern jsPDF design -
                  Aegis Express Logistics
                </p>
              </div>
            </div>
            <div className="text-right bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <div className="text-sm text-blue-100">Sample Tracking Code</div>
              <div className="text-2xl font-bold">{delivery.trackingCode}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Invoice Preview */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                      <div className="text-white font-bold text-lg flex items-center gap-2">
                        ⚡ AEGIS EXPRESS
                      </div>
                      <div className="text-blue-100 text-xs">LOGISTICS</div>
                    </div>
                    <div className="text-5xl font-bold">INVOICE</div>
                  </div>
                  <div className="bg-white/20 text-white p-4 rounded-lg backdrop-blur-sm">
                    <div className="text-xs opacity-90">
                      Invoice #: AEL-{Date.now().toString().slice(-8)}
                    </div>
                    <div className="text-xs opacity-90">
                      Due Date: {new Date().toLocaleDateString()}
                    </div>
                    <div className="text-xs opacity-90">
                      Invoice Date: {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Billing Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <Card className="border-blue-200 bg-blue-50/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-blue-700 text-lg flex items-center gap-2">
                        📧 Bill To:
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="font-semibold text-gray-900">
                          {delivery.receiver?.name}
                        </div>
                        <div>{delivery.receiver?.address}</div>
                        <div>
                          {delivery.receiver?.city},{" "}
                          {delivery.receiver?.country}
                        </div>
                        <div className="text-blue-600">
                          {delivery.receiver?.email}
                        </div>
                        <div>{delivery.receiver?.phone}</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-blue-700 text-lg flex items-center gap-2">
                        🏢 Bill From:
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="font-semibold text-gray-900">
                          {delivery.sender?.name}
                        </div>
                        <div>{delivery.sender?.address}</div>
                        <div>
                          {delivery.sender?.city}, {delivery.sender?.country}
                        </div>
                        <div className="text-blue-600">
                          {delivery.sender?.email}
                        </div>
                        <div>{delivery.sender?.phone}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Shipment Details */}
                <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center gap-2">
                      📦 Shipment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Tracking:</span>{" "}
                        {delivery.trackingCode}
                      </div>
                      <div>
                        <span className="font-semibold">Status:</span>{" "}
                        <span className="text-green-600">
                          {delivery.status}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold">Service:</span>{" "}
                        {delivery.shipmentType}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Items Table */}
                <div className="mb-8">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-lg">
                    <div className="grid grid-cols-5 gap-4 text-sm font-bold">
                      <div>#</div>
                      <div>Description</div>
                      <div>Unit Price</div>
                      <div>Qty</div>
                      <div>Total</div>
                    </div>
                  </div>
                  <div className="border border-t-0 rounded-b-lg overflow-hidden">
                    {delivery.items?.map((item, index) => (
                      <div
                        key={index}
                        className={`grid grid-cols-5 gap-4 p-4 text-sm ${
                          index % 2 === 0 ? "bg-blue-50/50" : "bg-white"
                        }`}
                      >
                        <div className="font-medium">{index + 1}</div>
                        <div className="font-medium">{item.description}</div>
                        <div>
                          {delivery.currency}
                          {item.value.toFixed(2)}
                        </div>
                        <div>{item.quantity}</div>
                        <div className="font-bold text-blue-600">
                          {delivery.currency}
                          {(item.value * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="flex justify-end mb-8">
                  <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <CardContent className="p-6">
                      <div className="space-y-3 text-sm min-w-[200px]">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span className="font-semibold">
                            {delivery.currency}
                            {calculateSubtotal().toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax (7.5%):</span>
                          <span className="font-semibold">
                            {delivery.currency}
                            {calculateTax().toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Fee:</span>
                          <span className="font-semibold">
                            {delivery.currency}
                            {(delivery.deliveryFee || 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="border-t border-blue-200 pt-3 flex justify-between text-lg">
                          <span className="font-bold text-blue-700">
                            Total:
                          </span>
                          <span className="font-bold text-blue-700">
                            {delivery.currency}
                            {calculateTotal().toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Payment & Terms */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <Card className="border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-blue-700 text-base flex items-center gap-2">
                        💳 Payment Methods:
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Bank: First Bank Nigeria</div>
                        <div>Account: 1234567890</div>
                        <div>Sort Code: 011-152-016</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-blue-700 text-base flex items-center gap-2">
                        📋 Terms & Conditions:
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>• Payment due within 30 days</div>
                        <div>• Insurance up to declared value</div>
                        <div>• Claims within 7 days of delivery</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Thank You Section */}
                <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
                  <CardContent className="py-8">
                    <div className="text-4xl font-bold mb-2">THANK YOU! 🙏</div>
                    <div className="text-blue-100">
                      For choosing Aegis Express Logistics
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Card>
          </div>

          {/* Action Panel */}
          <div className="space-y-6">
            {/* Generation Controls */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  Enhanced PDF Generator
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Generate beautiful invoices with jsPDF featuring enhanced
                  Aegis Express branding
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handlePreview}
                  variant="outline"
                  className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview Enhanced PDF
                </Button>
                <Button
                  onClick={handleGeneratePDF}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Enhanced PDF
                </Button>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  Enhanced Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>⚡ Enhanced Aegis Express Logo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>🎨 Modern Blue Theme Design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>📱 Professional Layout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>📊 Detailed Itemization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>💼 Business Information</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>🔒 Secure PDF Generation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Summary */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Financial Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-bold">
                      {delivery.currency}
                      {calculateSubtotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (7.5%):</span>
                    <span className="font-bold">
                      {delivery.currency}
                      {calculateTax().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery:</span>
                    <span className="font-bold">
                      {delivery.currency}
                      {(delivery.deliveryFee || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg">
                    <span className="font-bold text-blue-700">Total:</span>
                    <span className="font-bold text-blue-700">
                      {delivery.currency}
                      {calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGeneratorDemo;
