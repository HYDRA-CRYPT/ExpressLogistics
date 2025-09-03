import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  generateInvoicePDF,
  downloadInvoicePDF,
  previewInvoicePDF,
} from "@/utils/invoicePdfGenerator";
import { CheckCircle, Download, Eye, FileText, Truck } from "lucide-react";

interface DeliveryData {
  trackingCode: string;
  senderName: string;
  senderPhone: string;
  senderEmail: string;
  senderAddress: string;
  receiverName: string;
  receiverPhone: string;
  receiverEmail: string;
  receiverAddress: string;
  packageType: string;
  weight: string;
  dimensions: string;
  deliveryType: string;
  status: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  cost: string;
  notes?: string;
  pickupDate: string;
  createdAt: string;
}

const InvoiceSystemTest: React.FC = () => {
  const [testResults, setTestResults] = useState<{
    pdfGeneration: boolean | null;
    pdfPreview: boolean | null;
    pdfDownload: boolean | null;
  }>({
    pdfGeneration: null,
    pdfPreview: null,
    pdfDownload: null,
  });

  // Test delivery data
  const testDeliveryData: DeliveryData = {
    trackingCode: "AEL-TEST-001",
    senderName: "John Smith",
    senderPhone: "+1 234 567 8900",
    senderEmail: "john.smith@example.com",
    senderAddress: "123 Main St, New York, NY 10001, USA",
    receiverName: "Sarah Johnson",
    receiverPhone: "+1 234 567 8901",
    receiverEmail: "sarah.johnson@example.com",
    receiverAddress: "456 Oak Ave, Los Angeles, CA 90210, USA",
    packageType: "Electronics",
    weight: "2.5 kg",
    dimensions: "30cm x 20cm x 15cm",
    deliveryType: "Express",
    status: "Delivered",
    estimatedDelivery: "2024-12-15",
    actualDelivery: "2024-12-14",
    cost: "$89.99",
    notes: "Handle with care - fragile electronics",
    pickupDate: "2024-12-12",
    createdAt: "2024-12-12T10:00:00Z",
  };

  const testPdfGeneration = async () => {
    try {
      const pdf = await generateInvoicePDF(testDeliveryData);
      // Check if PDF was generated successfully by checking if it's a jsPDF instance
      setTestResults((prev) => ({
        ...prev,
        pdfGeneration: pdf && typeof pdf.output === "function",
      }));
    } catch (error) {
      console.error("PDF Generation Test Failed:", error);
      setTestResults((prev) => ({ ...prev, pdfGeneration: false }));
    }
  };

  const testPdfPreview = async () => {
    try {
      await previewInvoicePDF(testDeliveryData);
      setTestResults((prev) => ({ ...prev, pdfPreview: true }));
    } catch (error) {
      console.error("PDF Preview Test Failed:", error);
      setTestResults((prev) => ({ ...prev, pdfPreview: false }));
    }
  };

  const testPdfDownload = async () => {
    try {
      await downloadInvoicePDF(testDeliveryData);
      setTestResults((prev) => ({ ...prev, pdfDownload: true }));
    } catch (error) {
      console.error("PDF Download Test Failed:", error);
      setTestResults((prev) => ({ ...prev, pdfDownload: false }));
    }
  };

  const resetTests = () => {
    setTestResults({
      pdfGeneration: null,
      pdfPreview: null,
      pdfDownload: null,
    });
  };

  const getStatusBadge = (status: boolean | null) => {
    if (status === null) return <Badge variant="secondary">Not Tested</Badge>;
    if (status === true)
      return (
        <Badge variant="default" className="bg-green-600">
          ✓ Passed
        </Badge>
      );
    return <Badge variant="destructive">✗ Failed</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-xl border-blue-200/50 dark:border-blue-800/50">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <FileText className="h-8 w-8" />
              Aegis Express Logistics - jsPDF System Test
            </CardTitle>
            <CardDescription className="text-blue-100">
              Test the enhanced jsPDF invoice generation system
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Test Results Overview */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Test Results Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="font-medium">PDF Generation</span>
                {getStatusBadge(testResults.pdfGeneration)}
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="font-medium">PDF Preview</span>
                {getStatusBadge(testResults.pdfPreview)}
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="font-medium">PDF Download</span>
                {getStatusBadge(testResults.pdfDownload)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Controls */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-600" />
              Run Tests
            </CardTitle>
            <CardDescription>
              Test each component of the jsPDF invoice system individually
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={testPdfGeneration}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <FileText className="mr-2 h-4 w-4" />
                Test PDF Generation
              </Button>
              <Button
                onClick={testPdfPreview}
                variant="outline"
                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Eye className="mr-2 h-4 w-4" />
                Test PDF Preview
              </Button>
              <Button
                onClick={testPdfDownload}
                variant="outline"
                className="w-full border-green-200 text-green-600 hover:bg-green-50"
              >
                <Download className="mr-2 h-4 w-4" />
                Test PDF Download
              </Button>
              <Button
                onClick={resetTests}
                variant="secondary"
                className="w-full"
              >
                Reset Tests
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sample Data Display */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Test Delivery Data</CardTitle>
            <CardDescription>
              The sample data used for testing the PDF generation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm text-gray-700 dark:text-gray-300">
                {JSON.stringify(testDeliveryData, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceSystemTest;
