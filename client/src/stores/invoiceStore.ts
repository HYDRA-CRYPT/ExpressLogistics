import { BASE_URL } from "@/utils/Url";
import axios from "axios";

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
