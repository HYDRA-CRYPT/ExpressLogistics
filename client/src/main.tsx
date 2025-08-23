import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import router from "./routes/router";
import "./App.css";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
// The main.tsx file is the entry point of the React application.
// It uses React's StrictMode to help identify potential problems in the application.
// The createRoot function from react-dom/client is used to render the application into the root element
// defined in the HTML file.
// The RouterProvider component from react-router-dom is used to provide the routing context to the application.
// The QueryClientProvider from @tanstack/react-query is used to provide the query client for data fetching and caching.
// The router object, defined in the routes/router.tsx file, contains the application's routing configuration,
// including the main App component and its child routes like Home and About.
// This setup allows for a modular and organized structure for the React application, enabling easy navigation and data management.
