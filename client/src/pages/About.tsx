import { Link } from "react-router-dom";
import {
  Award,
  Users,
  Globe,
  Clock,
  ArrowRight,
  CheckCircle,
  Target,
  Heart,
  Zap,
  TrendingUp,
  Shield,
  Rocket,
  Star,
  Building2,
  MapPin,
  Package,
  MessageCircle,
  Truck,
} from "lucide-react";
import SEOHelmet from "@/components/SEOHelmet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const About = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Reliability",
      description: "Consistent, dependable service you can count on every time",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Speed",
      description:
        "Fast delivery solutions that keep your business moving forward",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Transparency",
      description:
        "Clear communication and full visibility throughout the shipping process",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
    },
  ];

  const achievements = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "ISO 9001 Certified",
      description: "Quality management standards",
      number: "ISO",
      subtitle: "Certified",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Team",
      description: "Logistics professionals worldwide",
      number: "500+",
      subtitle: "Employees",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Network",
      description: "Countries served worldwide",
      number: "200+",
      subtitle: "Countries",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Industry Experience",
      description: "Decades of logistics expertise",
      number: "20+",
      subtitle: "Years",
      color: "from-orange-500 to-amber-500",
    },
  ];

  const timeline = [
    {
      year: "2004",
      title: "The Beginning",
      description:
        "Founded with a single truck and a vision to revolutionize logistics, starting with local deliveries in New York.",
      icon: <Rocket className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      year: "2015",
      title: "National Expansion",
      description:
        "Expanded operations nationwide, building a comprehensive network covering all 50 states with advanced tracking technology.",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      year: "2025",
      title: "Global Leader",
      description:
        "Today we serve 200+ countries with cutting-edge logistics solutions and sustainable transportation practices.",
      icon: <Star className="h-6 w-6" />,
      color: "from-orange-500 to-amber-500",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors">
      <SEOHelmet page="about" />

      {/* Enhanced Hero Section with Better UX */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2hpcHBpbmd8ZW58MHx8MHx8fDA%3D)`,
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Simplified, Professional Background */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern
                id="aboutPattern"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="1.5"
                  fill="currentColor"
                  className="text-blue-600"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#aboutPattern)" />
          </svg>
        </div>

        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Trust Indicator Badge */}
          <div className="mb-8">
            <Badge className="bg-amber-500 text-white border-0 px-6 py-3 text-sm font-medium shadow-lg">
              <CheckCircle className="h-4 w-4 mr-2" />
              Trusted by 10,000+ Businesses Since 2004
            </Badge>
          </div>

          {/* Clear, Action-Oriented Headline */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight">
            Your Logistics Partner for
            <span className="block text-amber-400">Global Success</span>
          </h1>

          {/* Value Proposition */}
          <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-12">
            We transform complex logistics challenges into simple solutions,
            connecting your business to opportunities worldwide with
            reliability, speed, and transparency you can trust.
          </p>

          {/* Clear Call-to-Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Link to="/services">
                <Package className="h-5 w-5 mr-3" />
                Explore Our Services
                <ArrowRight className="h-5 w-5 ml-3" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
            >
              <Link to="/contact">
                <MessageCircle className="h-5 w-5 mr-3" />
                Chat on Telegram
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              {
                number: "200+",
                label: "Countries Served",
                color: "text-blue-600",
              },
              {
                number: "99.9%",
                label: "On-Time Delivery",
                color: "text-green-600",
              },
              {
                number: "24/7",
                label: "Customer Support",
                color: "text-orange-600",
              },
              {
                number: "ISO",
                label: "Certified Quality",
                color: "text-purple-600",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Mission Section with Better Information Hierarchy */}
      <motion.section
        className="py-24 bg-zinc-50 dark:bg-gray-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Subtle Background Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content with Better Readability */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-0 px-4 py-2">
                  <Shield className="h-4 w-4 mr-2" />
                  Our Mission
                </Badge>
              </motion.div>

              <motion.h2
                className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                More Than Logistics—
                <span className="block text-blue-600 dark:text-blue-400">
                  We Deliver Dreams
                </span>
              </motion.h2>

              <motion.div
                className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
                  Every package tells a story. Every shipment connects people,
                  businesses, and communities across the globe.
                </p>
                <p>
                  At Aegis Express Logistics, we understand that behind every
                  tracking number is someone's important moment—a birthday gift
                  reaching family, critical supplies supporting a business, or
                  life-changing medical equipment arriving just in time.
                </p>
                <p>
                  That's why we've built our entire organization around one
                  simple promise: <strong>your success is our success</strong>.
                  We don't just move packages; we move possibilities.
                </p>
              </motion.div>

              {/* Key Differentiators */}
              <motion.div
                className="mt-10 grid md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Reliability First
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      99.9% on-time delivery rate with full transparency
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                    <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Global Reach
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      200+ countries with local expertise everywhere
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Enhanced Visual */}
            <motion.div
              className="order-1 lg:order-2 relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Our Mission - Global Logistics Excellence"
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Performance Badge */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                      <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        21 Years
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Of Excellence
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Trust Indicator */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-blue-600 p-4 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  <Star className="h-6 w-6 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Transportation Capabilities Section */}
      <motion.section
        className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-6 py-3 mb-6">
                <Truck className="h-4 w-4 mr-2" />
                Our Transportation Network
              </Badge>
            </motion.div>
            <motion.h2
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Connected Across Every
              <span className="block text-blue-600 dark:text-blue-400">
                Transportation Mode
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Our comprehensive transportation network ensures your cargo moves
              efficiently through land, sea, and air—connecting every corner of
              the globe.
            </motion.p>
          </motion.div>

          {/* Transportation showcase with larger images */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Road Transport */}
            <motion.div
              className="group relative overflow-hidden rounded-2xl shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="relative h-80">
                <img
                  src="https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRydWNrfGVufDB8fDB8fHww"
                  alt="Professional truck driver and logistics"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-500 p-2 rounded-lg mr-3">
                      <Truck className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-xl">
                      Road Transport
                    </h3>
                  </div>
                  <p className="text-gray-200 text-sm mb-3">
                    Nationwide coverage with professional drivers and modern
                    fleet
                  </p>
                  <div className="flex space-x-4 text-xs text-gray-300">
                    <span>• Last-mile delivery</span>
                    <span>• Real-time tracking</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Air Cargo */}
            <motion.div
              className="group relative overflow-hidden rounded-2xl shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="relative h-80">
                <img
                  src="https://images.unsplash.com/photo-1720538531229-46862d8f0381?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhcmdvJTIwcGxhbmV8ZW58MHx8MHx8fDA%3D"
                  alt="Air cargo plane logistics"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-500 p-2 rounded-lg mr-3">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-xl">Air Cargo</h3>
                  </div>
                  <p className="text-gray-200 text-sm mb-3">
                    Express air freight for time-sensitive shipments worldwide
                  </p>
                  <div className="flex space-x-4 text-xs text-gray-300">
                    <span>• 24-48h delivery</span>
                    <span>• Priority handling</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Ocean Freight */}
            <motion.div
              className="group relative overflow-hidden rounded-2xl shadow-xl md:col-span-2 lg:col-span-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="relative h-80">
                <img
                  src="https://images.unsplash.com/photo-1590497008432-598f04441de8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcmdvfGVufDB8fDB8fHww"
                  alt="Ocean freight cargo containers"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-purple-500 p-2 rounded-lg mr-3">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-xl">
                      Ocean Freight
                    </h3>
                  </div>
                  <p className="text-gray-200 text-sm mb-3">
                    Cost-effective sea transport for bulk and oversized cargo
                  </p>
                  <div className="flex space-x-4 text-xs text-gray-300">
                    <span>• Bulk shipping</span>
                    <span>• Global ports</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Logistics Operations Showcase */}
          <motion.div
            className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Advanced Logistics Operations
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                  Behind every successful delivery is a sophisticated network of
                  operations, technology, and expertise that ensures your cargo
                  reaches its destination safely and on time.
                </p>
                <motion.div
                  className="grid grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {[
                    {
                      number: "500+",
                      label: "Fleet Vehicles",
                      color: "text-blue-600 dark:text-blue-400",
                    },
                    {
                      number: "50+",
                      label: "Airport Partners",
                      color: "text-green-600 dark:text-green-400",
                    },
                    {
                      number: "25+",
                      label: "Port Facilities",
                      color: "text-purple-600 dark:text-purple-400",
                    },
                    {
                      number: "24/7",
                      label: "Operations",
                      color: "text-amber-600 dark:text-amber-400",
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1606964212858-c215029db704?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bG9naXN0aWNzfGVufDB8fDB8fHww"
                  alt="Modern logistics warehouse operations"
                  className="rounded-2xl shadow-lg w-full h-80 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-amber-500 p-4 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  <CheckCircle className="h-8 w-8 text-white" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Interactive Timeline */}
      <motion.section
        className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 px-6 py-3 mb-6">
                <MapPin className="h-4 w-4 mr-2" />
                Our Journey
              </Badge>
            </motion.div>
            <motion.h2
              className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              From Humble Beginnings to
              <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Global Excellence
              </span>
            </motion.h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-green-500 to-orange-500 rounded-full"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
              style={{ originY: 0 }}
            />

            <div className="space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0
                        ? "lg:pr-12 pr-2 text-right"
                        : "lg:pl-12 pl-2 text-left"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-0 shadow-lg">
                        <CardContent className="p-8">
                          <motion.div
                            className={`flex items-center ${
                              index % 2 === 0 ? "justify-end" : "justify-start"
                            } mb-4`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.6,
                              delay: 0.8 + index * 0.2,
                            }}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              className={`bg-gradient-to-r ${item.color} lg:p-3 p-2 rounded-2xl lg:mr-4 mr-2`}
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              {item.icon}
                            </motion.div>
                            <div className="lg:text-4xl text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                              {item.year}
                            </div>
                          </motion.div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className={`w-6 h-6 bg-gradient-to-r ${item.color} rounded-full border-4 border-white dark:border-zinc-900 shadow-lg z-10 relative`}
                    ></div>
                    <motion.div
                      className={`absolute inset-0 w-6 h-6 bg-gradient-to-r ${item.color} rounded-full animate-ping opacity-20`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.2 }}
                      transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                      viewport={{ once: true }}
                    />
                  </motion.div>

                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Values Section with Focus on Benefits */}
      <motion.section
        className="py-24 bg-gray-50 dark:bg-zinc-800 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern
                id="valuesPattern"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="1"
                  fill="currentColor"
                  className="text-blue-500"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#valuesPattern)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Clear Value Proposition Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-0 px-6 py-3 mb-6">
                <Heart className="h-4 w-4 mr-2" />
                Why Choose Us
              </Badge>
            </motion.div>
            <motion.h2
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Values That Drive
              <span className="block text-green-600 dark:text-green-400">
                Your Success
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              These aren't just company values—they're promises we make to every
              customer, every day, with every shipment.
            </motion.p>
          </motion.div>

          {/* Enhanced Value Cards with Business Benefits */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 lg:gap-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Card className="group bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  <CardContent className="p-8 relative">
                    {/* Enhanced Icon with Business Context */}
                    <motion.div
                      className="flex items-center mb-6"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className={`bg-gradient-to-r ${value.color} text-white p-4 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {value.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {value.title}
                        </h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          Our Promise to You
                        </div>
                      </div>
                    </motion.div>

                    {/* Clear Description with Business Impact */}
                    <motion.p
                      className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {value.description}
                    </motion.p>

                    {/* Business Benefit Highlight */}
                    <motion.div
                      className={`${value.bgColor} p-4 rounded-xl border-l-4 border-blue-500`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        {index === 0 &&
                          "Reduces risk, increases customer satisfaction"}
                        {index === 1 &&
                          "Faster delivery means faster business growth"}
                        {index === 2 &&
                          "Clear tracking builds trust and confidence"}
                      </div>
                    </motion.div>

                    {/* Hover Effect Border */}
                    <div
                      className={`absolute inset-0 border-2 border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-800 rounded-lg transition-colors duration-300`}
                    ></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Call-to-Action Section */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-blue-600 text-white p-8 rounded-2xl shadow-xl"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3
                className="text-2xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                Experience These Values in Action
              </motion.h3>
              <motion.p
                className="text-blue-100 mb-6 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                Ready to see how our values translate into exceptional service
                for your business?
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    <Link to="/services">
                      <Package className="h-5 w-5 mr-2" />
                      Explore Services
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    <Link to="/contact">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Chat with Us
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Modern Achievements Grid */}
      <motion.section
        className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-6 py-3 mb-6">
                <Award className="h-4 w-4 mr-2" />
                Our Achievements
              </Badge>
            </motion.div>
            <motion.h2
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Recognition That Speaks Volumes
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Milestones and accolades that showcase our unwavering commitment
              to excellence
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -15 }}
              >
                <Card className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-4 hover:scale-105">
                  <CardContent className="p-8 text-center relative overflow-hidden">
                    {/* Background Glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    {/* Icon with Animation */}
                    <motion.div
                      className={`relative bg-gradient-to-r ${achievement.color} text-white p-6 rounded-3xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.3, rotate: 360 }}
                    >
                      {achievement.icon}
                      <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>

                    {/* Number Display */}
                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {achievement.number}
                      </div>
                      <div className="text-sm text-gray-300 font-medium">
                        {achievement.subtitle}
                      </div>
                    </motion.div>

                    <motion.h3
                      className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-500"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {achievement.title}
                    </motion.h3>

                    <motion.p
                      className="text-gray-300 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {achievement.description}
                    </motion.p>

                    {/* Floating Elements */}
                    <motion.div
                      className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 0, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce"></div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Modern CTA Section */}
      <motion.section
        className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-6 py-3">
              <Rocket className="h-4 w-4 mr-2" />
              Ready to Get Started?
            </Badge>
          </motion.div>

          <motion.h2
            className="text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Let's Build Something Amazing Together
          </motion.h2>

          <motion.p
            className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join thousands of satisfied customers who trust us with their
            logistics needs. Experience the difference that true partnership
            makes.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/services"
                className="group bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-white/25 transform hover:-translate-y-2"
              >
                <motion.div
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Package className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Start Shipping Today
                  <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                </motion.div>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/contact"
                className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <Building2 className="h-6 w-6 mr-3" />
                Contact Our Experts
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
