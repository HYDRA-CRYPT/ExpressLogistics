import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 transition-colors">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
// The App component serves as the main layout for the application.
// It includes a header, a link to the About page, and a footer.
// The Outlet component is used to render the child routes defined in the router configuration.
// The Link component is used to navigate to the About page without reloading the application.
