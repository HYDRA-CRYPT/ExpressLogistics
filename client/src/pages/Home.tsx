import { Link } from "react-router-dom";
import {
  ArrowRight,
  Package,
  MapPin,
  Search,
  CheckCircle2,
  Globe,
  Truck,
  Calendar,
  Plane,
  Ship,
  Train,
} from "lucide-react";
import SEOHelmet from "@/components/SEOHelmet";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";

const Home = () => {
  // Key metrics that matter to users
  const stats = [
    { number: "99.5%", label: "On-Time Delivery", subtext: "Industry leading" },
    { number: "48hrs", label: "Average Delivery", subtext: "Express service" },
    { number: "200+", label: "Countries Served", subtext: "Global reach" },
    { number: "24/7", label: "Customer Support", subtext: "Always available" },
  ];

  // Core services with clear value propositions
  const services = [
    {
      title: "Express Delivery",
      description: "Fast, reliable shipping for urgent packages and documents",
      icon: <Truck className="h-6 w-6 text-white" />,
      color: "from-blue-500 to-cyan-600",
      features: ["Same-day delivery", "Real-time tracking", "Secure handling"],
    },
    {
      title: "International Shipping",
      description: "Global logistics solutions for worldwide delivery needs",
      icon: <Globe className="h-6 w-6 text-white" />,
      color: "from-green-500 to-emerald-600",
      features: ["200+ countries", "Customs handling", "Insurance included"],
    },
    {
      title: "Scheduled Pickup",
      description:
        "Convenient pickup services at your preferred time and location",
      icon: <Calendar className="h-6 w-6 text-white" />,
      color: "from-purple-500 to-violet-600",
      features: [
        "Flexible scheduling",
        "Door-to-door service",
        "Multiple locations",
      ],
    },
  ];

  // Simplified process steps
  const processSteps = [
    {
      title: "Book Online",
      description: "Schedule your shipment with our easy booking system",
      icon: <Search className="h-6 w-6 text-white" />,
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Schedule Pickup",
      description: "We collect from your location",
      icon: <Calendar className="h-6 w-6 text-white" />,
      color: "from-purple-500 to-violet-600",
    },
    {
      title: "Track Progress",
      description: "Real-time updates throughout journey",
      icon: <MapPin className="h-6 w-6 text-white" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Delivery Confirmed",
      description: "Safe delivery with confirmation",
      icon: <CheckCircle2 className="h-6 w-6 text-white" />,
      color: "from-orange-500 to-amber-600",
    },
  ];

  const transportModes = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Ground Transport",
      description: "Door-to-door delivery services",
      stats: "500+ Vehicles",
      color: "from-blue-500 to-cyan-500",
      image:
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJ1Y2t8ZW58MHx8MHx8fDA%3D",
    },
    {
      icon: <Plane className="h-8 w-8" />,
      title: "Air Cargo",
      description: "Express international shipping",
      stats: "50+ Airlines",
      color: "from-purple-500 to-pink-500",
      image:
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <Ship className="h-8 w-8" />,
      title: "Ocean Freight",
      description: "Cost-effective bulk shipping",
      stats: "100+ Ports",
      color: "from-green-500 to-emerald-500",
      image:
        "https://images.unsplash.com/photo-1568347877321-f8935c7dc5a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hpcHBpbmd8ZW58MHx8MHx8fDA%3D",
    },
    {
      icon: <Train className="h-8 w-8" />,
      title: "Rail Transport",
      description: "Sustainable land logistics",
      stats: "200+ Routes",
      color: "from-orange-500 to-amber-500",
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-zinc-200 dark:bg-gray-900"
    >
      <SEOHelmet page="home" />

      {/* Hero Section with Logistics Carousel */}
      <Hero />

      {/* Transportation Modes Section */}
      <motion.section
        className="relative py-24 bg-gradient-to-br from-zinc-300 via-zinc-100 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background Effects */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          viewport={{ once: true }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          viewport={{ once: true }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 3 }}
              className="inline-flex items-center bg-amber-50 dark:bg-amber-900/20 border border-amber-200/60 dark:border-amber-700/60 rounded-full px-4 py-2 mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Truck className="h-4 w-4 text-amber-600 dark:text-amber-400 mr-2" />
              </motion.div>
              <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                Multi-Modal Transportation
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Multi-Modal Logistics Solutions
            </motion.h2>
            <motion.p
              className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              From ground transport to air cargo, we leverage multiple
              transportation modes to ensure your shipments reach their
              destination efficiently.
            </motion.p>
          </motion.div>

          {/* Transportation Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {transportModes.map((mode, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  className="h-48 bg-cover bg-center bg-no-repeat relative overflow-hidden"
                  style={{ backgroundImage: `url(${mode.image})` }}
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.2 * index }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 * index }}
                    viewport={{ once: true }}
                  />
                  <motion.div
                    className={`absolute top-4 left-4 p-3 rounded-xl bg-gradient-to-r ${mode.color} shadow-lg`}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 * index }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {mode.icon}
                  </motion.div>
                  <motion.div
                    className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 * index }}
                    viewport={{ once: true }}
                  >
                    <span className="text-white text-sm font-medium">
                      {mode.stats}
                    </span>
                  </motion.div>
                </motion.div>
                <motion.div
                  className="p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 * index }}
                  viewport={{ once: true }}
                >
                  <motion.h3
                    className="text-xl font-bold text-gray-900 dark:text-white mb-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {mode.title}
                  </motion.h3>
                  <motion.p
                    className="text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 * index }}
                    viewport={{ once: true }}
                  >
                    {mode.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Transportation Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            >
              {[
                {
                  number: "5000+",
                  label: "Fleet Vehicles",
                  icon: <Truck className="h-6 w-6" />,
                },
                {
                  number: "850",
                  label: "Partner Airlines",
                  icon: <Plane className="h-6 w-6" />,
                },
                {
                  number: "300+",
                  label: "Ocean Routes",
                  icon: <Ship className="h-6 w-6" />,
                },
                {
                  number: "1200",
                  label: "Rail Connections",
                  icon: <Train className="h-6 w-6" />,
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <motion.div
                    className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    className="text-3xl font-bold text-zinc-900 dark:text-white mb-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.div>
                  <motion.div
                    className="text-sm text-zinc-600 dark:text-zinc-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section - Clean and Modern */}
      <motion.section
        className="relative py-24 bg-white dark:bg-gray-900 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background Effects */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          viewport={{ once: true }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, rotate: -3 }}
              className="inline-flex items-center bg-blue-50 dark:bg-blue-900/20 border border-blue-200/60 dark:border-blue-700/60 rounded-full px-4 py-2 mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Package className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
              </motion.div>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Our Services
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-6"
            >
              Complete Logistics Solutions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto"
            >
              From local deliveries to international shipping, we provide
              comprehensive logistics services tailored to your needs.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
                  viewport={{ once: true }}
                >
                  {service.icon}
                </motion.div>

                <motion.h3
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 * (index + 1) }}
                  viewport={{ once: true }}
                >
                  {service.title}
                </motion.h3>

                <motion.p
                  className="text-gray-600 dark:text-gray-300 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 * (index + 1) }}
                  viewport={{ once: true }}
                >
                  {service.description}
                </motion.p>

                <motion.ul
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 * (index + 1) }}
                  viewport={{ once: true }}
                >
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.6 * (index + 1) + 0.1 * featureIndex,
                      }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"
                        whileHover={{ scale: 1.5 }}
                        transition={{ duration: 0.2 }}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="relative py-24 bg-zinc-50 dark:bg-gray-800 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background Effects */}
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          viewport={{ once: true }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, rotate: 3 }}
              className="inline-flex items-center bg-green-50 dark:bg-green-900/20 border border-green-200/60 dark:border-green-700/60 rounded-full px-4 py-2 mb-6"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <MapPin className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
              </motion.div>
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Simple Process
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-6"
            >
              Simple Process, Reliable Results
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto"
            >
              From booking to delivery, our streamlined process ensures your
              packages reach their destination safely and on time.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative group"
              >
                {/* Connecting Line */}
                {index < processSteps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500 z-10"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                    viewport={{ once: true }}
                    style={{ originX: 0 }}
                  />
                )}

                <motion.div
                  className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center relative z-20"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Step Number */}
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                  >
                    {index + 1}
                  </motion.div>

                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 * (index + 1) }}
                    viewport={{ once: true }}
                  >
                    {step.icon}
                  </motion.div>

                  <motion.h3
                    className="text-xl font-bold text-gray-900 dark:text-white mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 * (index + 1) }}
                    viewport={{ once: true }}
                  >
                    {step.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 * (index + 1) }}
                    viewport={{ once: true }}
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="relative py-24 bg-white dark:bg-zinc-900 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background Effects */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          viewport={{ once: true }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Trusted by Thousands Worldwide
            </motion.h2>
            <motion.p
              className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Our commitment to excellence drives everything we do, delivering
              results that matter to your business.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center group"
              >
                <motion.div
                  className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <motion.div
                    className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 * (index + 1) }}
                    viewport={{ once: true }}
                  >
                    {stat.label}
                  </motion.div>
                  <motion.div
                    className="text-sm text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 * (index + 1) }}
                    viewport={{ once: true }}
                  >
                    {stat.subtext}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="relative py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-black/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          viewport={{ once: true }}
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          style={{
            animationDuration: "20s",
            animationIterationCount: "infinite",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          viewport={{ once: true }}
          animate={{ x: [0, -40, 0], y: [0, -50, 0] }}
          style={{
            animationDuration: "25s",
            animationIterationCount: "infinite",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            Ready to Ship with Confidence?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl mb-8 max-w-3xl mx-auto opacity-90"
          >
            Join thousands of satisfied customers who trust us with their most
            important deliveries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/track"
                className="inline-flex items-center bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-gray-50 transform hover:-translate-y-1"
              >
                <Search className="mr-3 h-6 w-6" />
                Track Package
                <motion.div
                  className="ml-3 h-6 w-6"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="h-6 w-6" />
                </motion.div>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-white hover:text-blue-700 transform hover:-translate-y-1"
              >
                <Package className="mr-3 h-6 w-6" />
                Get Quote
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
