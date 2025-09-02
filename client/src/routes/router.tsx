import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.tsx";
import About from "../pages/About.tsx";
import App from "../App.tsx";
import NotFound from "../components/NotFound.tsx";
import Track from "../pages/Track.tsx";
import TrackDetails from "../pages/TrackDetails.tsx";
import Contact from "../pages/Contact.tsx";
import ProtectedRoute from "../services/ProtectedRoute.tsx";
import AdminLayout from "../Admin/AdminLayout.tsx";
import AdminDashboard from "../Admin/pages/Dashboard.tsx";
import CreateDelivery from "../Admin/pages/CreateDelivery.tsx";
import AdminLogin from "../Admin/auth/Login.tsx";
import AllShipments from "@/Admin/pages/AllShipment.tsx";
import TrackShipments from "../Admin/pages/TrackShipments.tsx";
import OwnerTrackDetails from "@/Admin/pages/OwnerTrackDetails.tsx";
import EditShipment from "@/Admin/pages/EditShipment.tsx";
import Services from "@/pages/Service.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "track", element: <Track /> },
      { path: "track/:code", element: <TrackDetails /> },
      { path: "contact", element: <Contact /> },
      { path: "services", element: <Services /> },
    ],
  },
  {
    path: "/owner",
    element: <ProtectedRoute />, // protect all owner routes
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "shipments/create", element: <CreateDelivery /> },
          { path: "shipments/edit/:id", element: <EditShipment /> },

          { path: "shipments", element: <AllShipments /> },
          {
            path: "shipments/track", // <-- FIXED
            element: <TrackShipments />,
          },
          {
            path: "shipments/track/:code", // <-- FIXED
            element: <OwnerTrackDetails />,
          },
        ],
      },
    ],
  },
  { path: "/owner/login", element: <AdminLogin /> },
]);

export default router;

// The createBrowserRouter function is used to create a router object that defines the routes for the application.
// The router object is then used in the main.tsx file to render the application with the defined routes.
// The routes include a root path that renders the App component, an index route that renders the
// Home component, and a nested route for the About page. An error element is also defined to handle any errors that may occur during routing.
// The App component serves as the main layout, including a header, footer, and a link to the About page.
// The Home and About components are simple functional components that return a div with their respective content.
