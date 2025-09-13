import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Package,
  Mail,
  MessageCircle,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { CONTACT_CONFIG, getTelegramLink } from "@/config/contacts";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-zinc-100 dark:bg-zinc-900 shadow-lg sticky top-0 z-[1000]">
      {/* Enhanced Top bar */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 text-white py-3 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full text-white"
            viewBox="0 0 100 100"
            fill="none"
          >
            <defs>
              <pattern
                id="headerPattern"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="10" cy="10" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#headerPattern)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <a
                href={getTelegramLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 hover:bg-white/10 rounded-full px-3 py-1 transition-all duration-300"
              >
                <div className="bg-blue-500/20 p-1 rounded-full group-hover:bg-blue-500/30 transition-colors">
                  <MessageCircle className="h-3 w-3 text-blue-300" />
                </div>
                <span className="font-medium">
                  {CONTACT_CONFIG.telegram.channelUsername}
                </span>
              </a>
              <a
                href={`mailto:${CONTACT_CONFIG.email.primary}`}
                className="group flex items-center space-x-2 hover:bg-white/10 rounded-full px-3 py-1 transition-all duration-300"
              >
                <div className="bg-green-500/20 p-1 rounded-full group-hover:bg-green-500/30 transition-colors">
                  <Mail className="h-3 w-3 text-green-300" />
                </div>
                <span className="font-medium">
                  {CONTACT_CONFIG.email.primary}
                </span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <div className="bg-orange-500/20 p-1 rounded-full">
                <Clock className="h-3 w-3 text-orange-300" />
              </div>
              <span className="font-medium">24/7 Customer Support</span>
              <div className="ml-2 flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-300">Online Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link
              to="/"
              className="group flex items-center space-x-3 hover:scale-105 transition-transform duration-300"
            >
              <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 p-3 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/25 transition-all duration-300">
                <Package className="h-8 w-8 text-white relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl group-hover:from-white/30 transition-colors"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
                  Aegis Express
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium flex items-center">
                  <Sparkles className="h-3 w-3 mr-1 text-orange-500" />
                  Logistics
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link
              to="/track"
              className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center">
                <Package className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Track Package
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="p-2 text-gray-700 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-900 border-t dark:border-zinc-700">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-3 text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 border-t dark:border-zinc-700">
              <Link
                to="/track"
                className="group block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 text-center relative overflow-hidden shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Package className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Track Package
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
