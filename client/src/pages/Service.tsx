import { Link } from "react-router-dom";
import {
  ArrowRight,
  Package,
  MapPin,
  Search,
  CheckCircle2,
  Shield,
  Clock,
  Globe,
  Truck,
  Calendar,
  Zap,
  Users,
  Award,
  Target,
  MessageCircle,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import SEOHelmet from "@/components/SEOHelmet";
import { TestimonialsSimple } from "@/components/Testimony";
import { CONTACT_CONFIG, getTelegramLink } from "@/config/contacts";

const Services = () => {
  // Core services with clear ROI and business value
  const services = [
    {
      title: "Express Delivery",
      description:
        "Get your urgent shipments delivered the same day with guaranteed time slots",
      icon: <Zap className="h-7 w-7 text-white" />,
      color: "from-blue-500 to-blue-600",
      gradient:
        "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10",
      features: [
        "2-hour delivery windows",
        "Real-time GPS tracking",
        "Priority handling",
        "Proof of delivery",
      ],
      popular: true,
      pricing: "From $15",
      deliveryTime: "Same day",
    },
    {
      title: "International Shipping",
      description:
        "Seamless global logistics with full customs handling and insurance coverage",
      icon: <Globe className="h-7 w-7 text-white" />,
      color: "from-green-500 to-green-600",
      gradient:
        "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10",
      features: [
        "200+ countries coverage",
        "Customs clearance included",
        "Full insurance protection",
        "Multi-language support",
      ],
      pricing: "From $25",
      deliveryTime: "3-7 days",
    },
    {
      title: "Scheduled Pickup",
      description:
        "Convenient door-to-door collection service that works around your schedule",
      icon: <Calendar className="h-7 w-7 text-white" />,
      color: "from-purple-500 to-purple-600",
      gradient:
        "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10",
      features: [
        "Flexible time slots",
        "Recurring pickups",
        "Multiple locations",
        "SMS notifications",
      ],
      pricing: "From $8",
      deliveryTime: "On demand",
    },
    {
      title: "Freight Services",
      description:
        "Heavy cargo and bulk shipment solutions for businesses of any size",
      icon: <Truck className="h-7 w-7 text-white" />,
      color: "from-orange-500 to-orange-600",
      gradient:
        "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10",
      features: [
        "LTL & FTL options",
        "Specialized handling",
        "Warehousing solutions",
        "Volume discounts",
      ],
      pricing: "Custom quote",
      deliveryTime: "1-5 days",
    },
    {
      title: "White Glove Service",
      description:
        "Premium handling for valuable, fragile, or high-priority shipments",
      icon: <Award className="h-7 w-7 text-white" />,
      color: "from-amber-500 to-amber-600",
      gradient:
        "from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/10",
      features: [
        "Dedicated courier",
        "Special packaging",
        "Direct routing",
        "Executive handling",
      ],
      pricing: "From $50",
      deliveryTime: "Same day",
    },
    {
      title: "Supply Chain Solutions",
      description:
        "End-to-end logistics management to optimize your entire supply chain",
      icon: <Target className="h-7 w-7 text-white" />,
      color: "from-teal-500 to-teal-600",
      gradient:
        "from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/10",
      features: [
        "Inventory management",
        "Distribution networks",
        "Analytics dashboard",
        "Cost optimization",
      ],
      pricing: "Enterprise",
      deliveryTime: "Ongoing",
    },
  ];

  // Process steps with clear value proposition
  const processSteps = [
    {
      step: "1",
      title: "Quick Quote",
      description: "Get instant pricing based on your specific needs",
      icon: <Search className="h-6 w-6 text-white" />,
      color: "from-blue-500 to-blue-600",
      time: "30 seconds",
    },
    {
      step: "2",
      title: "Book & Schedule",
      description: "Choose your pickup time and delivery preferences",
      icon: <Calendar className="h-6 w-6 text-white" />,
      color: "from-green-500 to-green-600",
      time: "2 minutes",
    },
    {
      step: "3",
      title: "Live Tracking",
      description: "Monitor your shipment in real-time from pickup to delivery",
      icon: <MapPin className="h-6 w-6 text-white" />,
      color: "from-purple-500 to-purple-600",
      time: "Real-time",
    },
    {
      step: "4",
      title: "Confirmed Delivery",
      description: "Receive proof of delivery with recipient signature",
      icon: <CheckCircle2 className="h-6 w-6 text-white" />,
      color: "from-orange-500 to-orange-600",
      time: "Instant",
    },
  ];

  // Why choose us with concrete benefits
  const advantages = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "99.5% On-Time Rate",
      description:
        "Industry-leading reliability with guaranteed delivery windows",
      metric: "99.5%",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Full Insurance Coverage",
      description: "Complete protection for all shipments up to $10,000 value",
      metric: "$10K",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "24/7 Live Support",
      description: "Real human support available around the clock, not bots",
      metric: "24/7",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Network",
      description: "Seamless delivery to 200+ countries with local expertise",
      metric: "200+",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <SEOHelmet page="services" />

      {/* Hero Section - Value-Focused */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80)`,
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Main Content - Slides in from left */}
            <motion.div
              className="lg:col-span-7 space-y-8"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                className="inline-flex items-center bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 shadow-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Package className="h-4 w-4 text-amber-400 mr-2" />
                <span className="text-sm font-medium text-white">
                  Complete Logistics Solutions
                </span>
              </motion.div>

              <div className="space-y-6">
                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <motion.span
                    className="block text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    Logistics That
                  </motion.span>
                  <motion.span
                    className="block text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    Drive Business
                  </motion.span>
                  <motion.span
                    className="block text-amber-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    Growth
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-200 max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                >
                  From same-day express to global freight solutions, we provide
                  the logistics infrastructure your business needs to scale
                  efficiently and compete globally.
                </motion.p>
              </div>

              {/* Primary CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  Get Free Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/track"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 rounded-xl font-semibold text-lg transition-all duration-200 group"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Track Shipment
                </Link>
              </motion.div>

              {/* Key Benefits */}
              <motion.div
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.7 }}
              >
                {[
                  { number: "99.5%", label: "On-time delivery" },
                  { number: "2hrs", label: "Express delivery" },
                  { number: "200+", label: "Countries" },
                  { number: "24/7", label: "Live support" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Quick Service Selector - Slides in from right */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-slate-200/60 dark:border-zinc-700/60 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                  Popular Services
                </h3>

                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {services.slice(0, 3).map((service, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 bg-gradient-to-r ${service.gradient} rounded-xl border border-slate-200/50 dark:border-zinc-700/50 hover:shadow-md transition-all cursor-pointer group`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center`}
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            {service.icon}
                          </motion.div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white">
                              {service.title}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                              {service.pricing} • {service.deliveryTime}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <Link
                  to="#services"
                  className="block w-full mt-6 text-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  View All Services →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Comprehensive */}
      <section
        id="services"
        className="relative py-24 bg-zinc-50 dark:bg-zinc-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Services Built for Your Success
            </motion.h2>
            <motion.p
              className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Every service is designed to solve real business challenges, from
              urgent deliveries to complex supply chain optimization.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`group relative bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-zinc-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 ${
                  service.popular ? "ring-2 ring-blue-500/20" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    {service.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-900 dark:text-white">
                      {service.pricing}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {service.deliveryTime}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-slate-600 dark:text-slate-300"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <button className="w-full bg-slate-50 dark:bg-zinc-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 py-3 rounded-xl font-medium transition-all duration-200 group">
                    Get Quote for {service.title}
                    <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transportation Network Section */}
      <motion.section
        className="relative py-24 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 dark:from-zinc-800 dark:via-blue-900/10 dark:to-indigo-900/10"
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
              className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full px-6 py-3 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
              <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                Multi-Modal Transportation
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Connected Through Every
              <span className="block text-blue-600 dark:text-blue-400">
                Transportation Mode
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Our comprehensive transportation network leverages land, sea, and
              air to deliver optimal solutions for every shipping requirement.
            </motion.p>
          </motion.div>

          {/* Transportation Grid with Enhanced Imagery */}
          <motion.div
            className="grid lg:grid-cols-2 gap-8 mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Ground Transport Showcase */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="group relative overflow-hidden rounded-xl shadow-lg"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="https://plus.unsplash.com/premium_photo-1661932015882-c35eee885897?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRydWNrfGVufDB8fDB8fHww"
                    alt="Professional truck fleet"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <Truck className="h-6 w-6 text-white mb-1" />
                    <div className="text-white font-semibold text-sm">
                      Ground Fleet
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="group relative overflow-hidden rounded-xl shadow-lg"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1600320254374-ce2d293c324e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHJ1Y2slMjBkcml2ZXJ8ZW58MHx8MHx8fDA%3D"
                    alt="Professional truck driver"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <Users className="h-6 w-6 text-white mb-1" />
                    <div className="text-white font-semibold text-sm">
                      Expert Drivers
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -3 }}
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  Ground Transportation
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Our nationwide ground network ensures reliable, cost-effective
                  delivery to every destination with professional drivers and
                  modern fleet management.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-slate-600 dark:text-slate-300">
                      Real-time tracking
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-slate-600 dark:text-slate-300">
                      500+ vehicles
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Air & Sea Transport Showcase */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="group relative overflow-hidden rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1571086291540-b137111fa1c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyZ298ZW58MHx8MHx8fDA%3D"
                  alt="Air cargo operations"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Globe className="h-8 w-8 text-white mb-2" />
                  <div className="text-white font-bold text-lg">
                    Air Cargo Network
                  </div>
                  <div className="text-gray-200 text-sm">
                    Express global delivery
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -3 }}
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  Air & Ocean Freight
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Strategic partnerships with major airlines and shipping lines
                  provide comprehensive coverage for international and express
                  deliveries.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-slate-600 dark:text-slate-300">
                      50+ airports
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-slate-600 dark:text-slate-300">
                      25+ ports
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Advanced Logistics Operations */}
          <motion.div
            className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="grid lg:grid-cols-3 gap-8">
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Advanced Logistics Hub Operations
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg leading-relaxed">
                  Our state-of-the-art logistics centers combine cutting-edge
                  technology with expert operations management to ensure
                  seamless cargo handling and distribution across all
                  transportation modes.
                </p>
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {[
                    {
                      number: "200+",
                      label: "Countries Served",
                      color: "text-blue-600 dark:text-blue-400",
                    },
                    {
                      number: "99.5%",
                      label: "On-time Rate",
                      color: "text-green-600 dark:text-green-400",
                    },
                    {
                      number: "24/7",
                      label: "Operations",
                      color: "text-purple-600 dark:text-purple-400",
                    },
                    {
                      number: "Live",
                      label: "Tracking",
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
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                        {stat.number}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
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
                  src="https://plus.unsplash.com/premium_photo-1661932036915-4fd90bec6e8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bG9naXN0aWNzfGVufDB8fDB8fHww"
                  alt="Modern logistics warehouse"
                  className="rounded-xl shadow-lg w-full h-48 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  <Package className="h-6 w-6 text-white" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works - Process Focus */}
      <motion.section
        className="relative py-24 bg-slate-50 dark:bg-zinc-800"
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
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              How It Works
            </motion.h2>
            <motion.p
              className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Our streamlined process gets your shipments moving quickly while
              keeping you informed every step of the way.
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
                className="relative group text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Connecting line */}
                {index < processSteps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-zinc-600 dark:to-zinc-500"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    style={{ originX: 0 }}
                  />
                )}

                {/* Step number */}
                <motion.div
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} text-white flex items-center justify-center text-sm font-bold shadow-lg`}
                  >
                    {step.step}
                  </div>
                </motion.div>

                <motion.div
                  className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                >
                  {step.icon}
                </motion.div>

                <motion.h3
                  className="text-xl font-semibold text-slate-900 dark:text-white mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  className="text-slate-600 dark:text-slate-300 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {step.description}
                </motion.p>
                <motion.div
                  className="text-sm font-medium text-blue-600 dark:text-blue-400"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                >
                  Takes {step.time}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Us - Value Props */}
      <motion.section
        className="relative py-24 bg-white dark:bg-zinc-900"
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
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Why Businesses Choose Aegis Express
            </motion.h2>
            <motion.p
              className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              We don't just move packages – we help businesses grow by providing
              reliable, efficient logistics solutions that scale with your
              needs.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                >
                  <div className="text-blue-600 dark:text-blue-400">
                    {advantage.icon}
                  </div>
                </motion.div>

                <motion.div
                  className="text-3xl font-bold text-slate-900 dark:text-white mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                >
                  {advantage.metric}
                </motion.div>
                <motion.h3
                  className="text-lg font-semibold text-slate-900 dark:text-white mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {advantage.title}
                </motion.h3>
                <motion.p
                  className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {advantage.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional value props */}
          <motion.div
            className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-zinc-800 dark:to-blue-900/20 rounded-2xl p-8 lg:p-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.h3
                  className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Enterprise-Grade Solutions for Growing Businesses
                </motion.h3>
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  {[
                    {
                      title: "Dedicated Account Management",
                      description:
                        "Personal support for your unique logistics needs",
                    },
                    {
                      title: "Custom Integration",
                      description: "API integration with your existing systems",
                    },
                    {
                      title: "Volume Discounts",
                      description: "Better rates as your shipping volume grows",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 10, scale: 1.02 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                      >
                        <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      </motion.div>
                      <div>
                        <motion.h4
                          className="font-semibold text-slate-900 dark:text-white"
                          initial={{ opacity: 0, y: 5 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 1.0 + index * 0.1,
                          }}
                          viewport={{ once: true }}
                        >
                          {feature.title}
                        </motion.h4>
                        <motion.p
                          className="text-slate-600 dark:text-slate-300 text-sm"
                          initial={{ opacity: 0, y: 5 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 1.1 + index * 0.1,
                          }}
                          viewport={{ once: true }}
                        >
                          {feature.description}
                        </motion.p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div
                className="text-center lg:text-right"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="inline-flex flex-col items-center lg:items-end space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg"
                    initial={{ scale: 0.8, rotate: -5 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotate: 3, y: -5 }}
                  >
                    <motion.div
                      className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      10,000+
                    </motion.div>
                    <motion.div
                      className="text-slate-600 dark:text-slate-300 text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      viewport={{ once: true }}
                    >
                      Businesses Trust Us
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg"
                    initial={{ scale: 0.8, rotate: 5 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotate: -3, y: -5 }}
                  >
                    <motion.div
                      className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      viewport={{ once: true }}
                    >
                      $2M+
                    </motion.div>
                    <motion.div
                      className="text-slate-600 dark:text-slate-300 text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.0 }}
                      viewport={{ once: true }}
                    >
                      In Cost Savings
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="relative py-24 bg-slate-50 dark:bg-zinc-800"
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
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              What Our Customers Say
            </motion.h2>
            <motion.p
              className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Don't just take our word for it – hear from businesses that have
              transformed their logistics with Aegis Express.
            </motion.p>
          </motion.div>

          {/* Using the Testimony component */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <TestimonialsSimple />
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section - Action-Focused */}
      <motion.section
        className="relative py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Ready to Optimize Your Logistics?
              </motion.h2>
              <motion.p
                className="text-xl mb-8 opacity-90 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Join thousands of businesses that have streamlined their
                shipping operations and reduced costs with our logistics
                solutions.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all duration-200 group"
                  >
                    Get Free Quote
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <a
                    href={getTelegramLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 group"
                  >
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                    </motion.div>
                    Chat on Telegram
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Contact Info Card */}
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <motion.h3
                className="text-xl font-semibold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Get Started Today
              </motion.h3>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {[
                  {
                    icon: MessageCircle,
                    title: "Chat on Telegram",
                    description: CONTACT_CONFIG.telegram.channelUsername,
                    link: getTelegramLink(),
                  },
                  {
                    icon: Mail,
                    title: "Email us",
                    description: CONTACT_CONFIG.email.quotes,
                    link: `mailto:${CONTACT_CONFIG.email.quotes}`,
                  },
                  {
                    icon: Clock,
                    title: "Available 24/7",
                    description: "Support when you need it",
                    link: null,
                  },
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <motion.div
                      className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                    >
                      <contact.icon className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <motion.div
                        className="font-medium"
                        initial={{ opacity: 0, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {contact.title}
                      </motion.div>
                      <motion.div
                        className="text-sm opacity-80"
                        initial={{ opacity: 0, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {contact.link ? (
                          <a
                            href={contact.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-200 transition-colors"
                          >
                            {contact.description}
                          </a>
                        ) : (
                          contact.description
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="mt-6 pt-6 border-t border-white/20 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-sm opacity-80 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  Average response time
                </motion.div>
                <motion.div
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                >
                  Under 15 minutes
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Services;
