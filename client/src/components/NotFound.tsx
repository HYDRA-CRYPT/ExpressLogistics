// import { Link } from "react-router-dom";
// import { Truck, PackageSearch, ArrowLeft } from "lucide-react";

// const NotFound = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 p-4">
//       <div className="flex flex-col items-center gap-4 bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-xl px-8 py-12">
//         <div className="flex items-center gap-3">
//           <Truck className="w-12 h-12 text-blue-600 dark:text-blue-400" />
//           <span className="text-5xl font-extrabold text-blue-700 dark:text-blue-300 tracking-tight">
//             404
//           </span>
//           <PackageSearch className="w-12 h-12 text-yellow-500 dark:text-yellow-400" />
//         </div>
//         <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2 text-center">
//           Oops! This Route Wasn't Found
//         </h1>
//         <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 mb-6 text-center max-w-lg">
//           The page or delivery route you’re looking for doesn’t exist.
//           <br />
//           Try going back home or track a package below.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
//           <Link
//             to="/"
//             className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Home
//           </Link>
//           <Link
//             to="/track"
//             className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-yellow-500 text-yellow-600 dark:text-yellow-400 rounded-lg font-semibold hover:bg-yellow-500 hover:text-white transition"
//           >
//             <PackageSearch className="w-5 h-5" />
//             Track Package
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotFound;

import { Link } from "react-router-dom";
import { ArrowLeft, Package, Globe, Truck, Ship } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - 404 content */}
          <div className="text-center lg:text-left">
            <div className="text-8xl lg:text-9xl font-bold text-blue-600 mb-6 leading-none">
              404
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Oops, the page you are looking for does not exist.
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              It seems like the shipment you're looking for has taken a
              different route. Don't worry, our logistics experts are here to
              help you find what you need and get back on track with your
              delivery requirements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/"
                className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors group"
              >
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Go Back Home
              </Link>
              <Link
                to="/track"
                className="inline-flex items-center border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors group"
              >
                <Package className="mr-2 h-5 w-5" />
                Track Package
              </Link>
            </div>

            {/* Quick links */}
            <div className="mt-12 grid grid-cols-2 gap-4 text-center lg:text-left">
              <Link
                to="/services"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Our Services
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contact Support
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/track"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Track Shipment
              </Link>
            </div>
          </div>

          {/* Right side - Logistics illustration */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 overflow-hidden">
              {/* World map background effect */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-blue-600 rounded-3xl"></div>
                <Globe className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-64 w-64 text-blue-600 opacity-20" />
              </div>

              {/* Transportation elements */}
              <div className="relative z-10 space-y-8">
                {/* Truck */}
                <div className="flex justify-start">
                  <div className="bg-orange-500 p-4 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                    <Truck className="h-16 w-16 text-white" />
                  </div>
                </div>

                {/* Shipping paths */}
                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-full shadow-lg">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Globe className="h-16 w-16 text-white" />
                    </div>
                  </div>
                </div>

                {/* Ship */}
                <div className="flex justify-end">
                  <div className="bg-teal-600 p-4 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                    <Ship className="h-16 w-16 text-white" />
                  </div>
                </div>
              </div>

              {/* Connecting lines */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <path
                    d="M 50 100 Q 200 50 350 100 Q 200 150 50 200 Q 200 250 350 300"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="10,5"
                    className="opacity-30"
                  />
                </svg>
              </div>
            </div>

            {/* Floating stats */}
            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">99%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
