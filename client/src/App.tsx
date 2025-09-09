import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ChevronUp } from "lucide-react";

function App() {
  const { pathname } = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 transition-colors">
      <Header />
      <Outlet />
      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white p-4 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
          aria-label="Scroll to top"
        >
          <div className="relative">
            <ChevronUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/30 to-cyan-400/30 opacity-0 group-hover:opacity-100 animate-ping"></div>

          {/* Floating Badge */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        </button>
      )}
    </div>
  );
}

export default App;
// The App component serves as the main layout for the application.
// It includes a header, a link to the About page, and a footer.
// The Outlet component is used to render the child routes defined in the router configuration.
// The Link component is used to navigate to the About page without reloading the application.
