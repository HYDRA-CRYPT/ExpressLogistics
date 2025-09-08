import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  Package,
  CheckCircle2,
  Shield,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { Carousel } from "./ui/carousel";

const Hero: React.FC = () => {
  // Logistics-themed carousel data with the provided images
  const carouselItems = [
    {
      id: 1,
      image:
        "https://plus.unsplash.com/premium_photo-1661932036915-4fd90bec6e8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bG9naXN0aWNzfGVufDB8fDB8fHww", // Cargo ship
      title: "Global Shipping Excellence",
      subtitle: "Ocean Freight",
      description:
        "Connect continents with our reliable ocean freight services. Fast, secure, and cost-effective global shipping solutions.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1629881635342-c1272d45d0fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bG9naXN0aWNzJTIwdHJ1Y2t8ZW58MHx8MHx8fDA%3D", // Truck/Ground transport
      title: "Swift Ground Delivery",
      subtitle: "Ground Transport",
      description:
        "Reliable road transport with real-time tracking. Your packages delivered safely to every destination.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1720538531229-46862d8f0381?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhcmdvJTIwcGxhbmV8ZW58MHx8MHx8fDA%3D", // Airplane/Air freight
      title: "Express Air Cargo",
      subtitle: "Air Freight",
      description:
        "Lightning-fast air transport for urgent deliveries. When time matters most, we deliver.",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1664382953403-fc1ac77073a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2FyZWhvdXNlfGVufDB8fDB8fHww", // Warehouse/Logistics
      title: "Smart Warehousing",
      subtitle: "Storage Solutions",
      description:
        "Advanced warehouse management with automated systems. Your cargo handled with precision and care.",
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0">
        <Carousel
          items={carouselItems}
          autoPlay={true}
          autoPlayInterval={6000}
          showDots={true}
          showArrows={true}
          className="h-full"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Main Content - Slides in from left */}
            <motion.div
              className="lg:col-span-7 space-y-8"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 shadow-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3"></div>
                <span className="text-sm font-medium text-white">
                  Live tracking • 99.5% on-time delivery
                </span>
              </div>

              <div className="space-y-6">
                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <motion.span
                    className="block text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    Reliable Delivery.
                  </motion.span>
                  <motion.span
                    className="block text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    On Time.
                  </motion.span>
                  <motion.span
                    className="block text-amber-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    Every Time.
                  </motion.span>
                  <motion.span
                    className="block text-amber-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.3 }}
                  >
                    Discreet Delivery.
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-200 max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                >
                  Experience seamless logistics with real-time tracking, secure
                  handling, and guaranteed delivery for all your shipping needs.
                </motion.p>
              </div>

              {/* Primary CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.7 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  Start Shipping
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/track"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 hover:border-white/50 rounded-xl font-semibold text-lg transition-all duration-200 group"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Track Package
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="flex flex-wrap items-center gap-6 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.9 }}
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-gray-200">Free tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-gray-200">
                    Insured packages
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-gray-200">24/7 support</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Quick Actions Card - Slides in from right */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Quick Actions
                </h3>

                <div className="space-y-4">
                  <Link
                    to="/contact"
                    className="flex items-center p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-colors group"
                  >
                    <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center mr-4">
                      <Package className="h-5 w-5 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">Ship Now</h4>
                      <p className="text-sm text-gray-200">
                        Create a new shipment
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    to="/track"
                    className="flex items-center p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-colors group"
                  >
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                      <Search className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">
                        Track Package
                      </h4>
                      <p className="text-sm text-gray-200">
                        Monitor your shipment
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </Link>

                  <div className="pt-4 border-t border-white/20">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-white">
                          24/7
                        </div>
                        <div className="text-sm text-gray-200">Support</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">
                          99.5%
                        </div>
                        <div className="text-sm text-gray-200">On-time</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
