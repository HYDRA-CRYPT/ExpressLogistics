import { Link } from "react-router-dom";
import {
  Package,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Star,
  Award,
  Clock,
  Globe,
  Sparkles,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-full blur-3xl"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern
                id="footerGrid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="5"
                  cy="5"
                  r="1"
                  fill="currentColor"
                  className="text-white"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#footerGrid)" />
          </svg>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Enhanced Company Info */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="group flex items-center space-x-3 mb-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 p-3 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/25 transition-all duration-300">
                <Package className="h-8 w-8 text-white relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl group-hover:from-white/30 transition-colors"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                  Aegis Express
                </h1>
                <p className="text-sm text-gray-300 font-medium flex items-center">
                  <Sparkles className="h-3 w-3 mr-1 text-orange-400" />
                  Logistics
                </p>
              </div>
            </Link>

            <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
              Your trusted partner for fast, reliable, and secure logistics
              solutions worldwide. Delivering excellence since 1995.
            </p>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-300">5.0 Rating</span>
              </div>
              <div className="h-4 w-px bg-gray-600"></div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-300">ISO Certified</span>
              </div>
            </div>

            {/* Enhanced Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="group bg-gray-800/50 hover:bg-blue-600 p-3 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Facebook className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="group bg-gray-800/50 hover:bg-sky-500 p-3 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-sky-500/25"
              >
                <Twitter className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="group bg-gray-800/50 hover:bg-pink-600 p-3 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25"
              >
                <Instagram className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="group bg-gray-800/50 hover:bg-blue-700 p-3 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-xl">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Quick Links</h3>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/track"
                  className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Track Package
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Enhanced Contact Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Contact Info</h3>
            </div>
            <div className="space-y-4">
              <div className="group bg-gray-800/30 hover:bg-gray-800/50 rounded-2xl p-4 transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500/20 p-2 rounded-xl">
                    <Phone className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      Phone
                    </p>
                    <span className="text-gray-300 font-medium">
                      +1 (555) 123-4567
                    </span>
                  </div>
                </div>
              </div>

              <div className="group bg-gray-800/30 hover:bg-gray-800/50 rounded-2xl p-4 transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-500/20 p-2 rounded-xl">
                    <Mail className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      Email
                    </p>
                    <span className="text-gray-300 font-medium">
                      info@aegislogistics.com
                    </span>
                  </div>
                </div>
              </div>

              <div className="group bg-gray-800/30 hover:bg-gray-800/50 rounded-2xl p-4 transition-all duration-300 hover:scale-105">
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-500/20 p-2 rounded-xl">
                    <MapPin className="h-4 w-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Address
                    </p>
                    <span className="text-gray-300 font-medium">
                      123 Logistics Ave
                      <br />
                      New York, NY 10001
                    </span>
                  </div>
                </div>
              </div>

              {/* 24/7 Support Badge */}
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-500 p-2 rounded-xl">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">24/7 Support</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-300 text-sm">
                        Always Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-300 text-sm flex items-center">
                <span className="mr-2">© 2025 Aegis Express Logistics.</span>
                <Globe className="h-4 w-4 text-blue-400 mr-1" />
                <span>All rights reserved worldwide.</span>
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Award className="h-4 w-4 text-green-400" />
                <span>Trusted by 10,000+ businesses globally</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center space-x-6">
              <a
                href="#"
                className="text-gray-300 hover:text-white text-sm transition-colors hover:underline underline-offset-4"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white text-sm transition-colors hover:underline underline-offset-4"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white text-sm transition-colors hover:underline underline-offset-4"
              >
                Cookie Policy
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white text-sm transition-colors hover:underline underline-offset-4"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
