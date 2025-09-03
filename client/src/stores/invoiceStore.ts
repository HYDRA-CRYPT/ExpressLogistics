import axios from "axios";

// Define BASE_URL for this store
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD ? "/api" : "http://localhost:5000/api");

//Invoice service
export const invoiceService = {
  downloadPDF: async (deliveryId: string) => {
    // This endpoint returns a PDF file
    const response = await axios.get(`${BASE_URL}/invoices/${deliveryId}/pdf`, {
      responseType: "blob",
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice-${deliveryId}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return response.data;
  },
};
