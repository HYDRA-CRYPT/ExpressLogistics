import { Link } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  Globe,
  Clock,
  Shield,
  Users,
  Star,
  Play,
  Package,
  Phone,
  Zap,
  Award,
  Target,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Sparkles,
  Layers,
  Mail,
  Calendar,
  BarChart3,
  Heart,
  Video,
  Plus,
  ChevronDown,
  Building2,
  Rocket,
  Lightbulb,
  Send,
  Trophy,
} from "lucide-react";
import { Carousel } from "@/components/ui/carousel";
import SEOHelmet from "@/components/SEOHelmet";

const Home = () => {
  // Carousel data for hero section
  const carouselItems = [
    {
      id: 1,
      image:
        "https://templates.scriptsbundle.com/logistic-pro/demo/logistic-pro/images/slider/1.jpg",
      subtitle: "Global Logistics Solutions",
      title: "Reliable Transport.\nOn Time.\nEvery Time.",
      description:
        "Experience seamless logistics solutions with our comprehensive transport services. Fast delivery, real-time tracking, and unmatched reliability for all your shipping needs.",
    },
    {
      id: 2,
      image:
        "https://templates.scriptsbundle.com/logistic-pro/demo/logistic-pro/images/slider/2.jpg",
      subtitle: "Express Delivery Network",
      title: "Connect Your Business\nTo The World",
      description:
        "From local deliveries to international shipping, we provide end-to-end logistics solutions that keep your business moving forward with confidence.",
    },
    {
      id: 3,
      image:
        "https://templates.scriptsbundle.com/logistic-pro/demo/logistic-pro/images/slider/3.jpg",
      subtitle: "Professional Freight Services",
      title: "Your Trusted\nLogistics Partner",
      description:
        "With cutting-edge technology and decades of experience, we deliver excellence in every shipment, ensuring your cargo reaches its destination safely and on time.",
    },
  ];

  const stats = [
    { number: "250+", label: "Happy Customers" },
    { number: "1M+", label: "Packages Delivered" },
    { number: "2.5K", label: "Global Partners" },
    { number: "99%", label: "On-Time Delivery" },
  ];

  const services = [
    {
      title: "Road Freight",
      description: "Reliable ground transportation for domestic deliveries",
      image:
        "https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      title: "Fast Personal Delivery",
      description: "Express delivery for urgent shipments",
      image:
        "https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      title: "Over Land Transport",
      description: "Comprehensive overland logistics solutions",
      image:
        "https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      title: "International Shipping",
      description: "Global shipping with customs clearance",
      image:
        "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      name: "Sarah Chen",
      role: "Operations Director",
      image:
        "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      name: "Mike Rodriguez",
      role: "Logistics Manager",
      image:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      name: "Lisa Thompson",
      role: "Customer Success",
      image:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
  ];

  const processSteps = [
    {
      title: "Order Placement",
      description: "Submit your shipping request online or via phone",
    },
    {
      title: "Package Collection",
      description: "We collect your package from your location",
    },
    {
      title: "Safe Transportation",
      description: "Your package travels through our secure network",
    },
    {
      title: "Delivery Confirmation",
      description: "Package delivered with real-time confirmation",
    },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 transition-colors">
      <SEOHelmet page="home" />
      {/* Modern Hero Section with Carousel */}
      <section className="relative w-full h-screen overflow-hidden">
        <Carousel
          items={carouselItems}
          autoPlay={true}
          autoPlayInterval={6000}
          showDots={true}
          showArrows={true}
          className="h-full"
        />

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 z-10">
          {/* Background Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid lg:grid-cols-12 gap-8 items-center h-full">
                {/* Left Content - Main Hero */}
                <div className="lg:col-span-7 text-white space-y-8">
                  {/* Company Badge */}
                  <div className="inline-flex items-center bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-4 py-2 text-amber-300">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm font-medium">
                      Leading Logistics Provider
                    </span>
                  </div>

                  {/* Dynamic Headline */}
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                      <span className="block">Your Global</span>
                      <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                        Logistics Partner
                      </span>
                      <span className="block text-3xl md:text-4xl xl:text-5xl text-gray-200">
                        Delivered with Excellence
                      </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed">
                      Experience seamless shipping solutions with real-time
                      tracking, worldwide coverage, and unmatched reliability.
                    </p>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex -space-x-2">
                        <img
                          className="w-8 h-8 rounded-full border-2 border-white/50"
                          src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
                          alt="Customer 1"
                        />
                        <img
                          className="w-8 h-8 rounded-full border-2 border-white/50"
                          src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100"
                          alt="Customer 2"
                        />
                        <img
                          className="w-8 h-8 rounded-full border-2 border-white/50"
                          src="https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100"
                          alt="Customer 3"
                        />
                        <div className="w-8 h-8 bg-amber-500 rounded-full border-2 border-white/50 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            250+
                          </span>
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                        <span className="text-gray-300">
                          Trusted by 250+ businesses
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/services"
                      className="group relative bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-amber-500/25 transform hover:-translate-y-1"
                    >
                      <span className="relative z-10 flex items-center">
                        Get Started Now
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Link>
                    <Link
                      to="/track"
                      className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center"
                    >
                      Track Package
                      <Package className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Right Content - Stats & Features */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Performance Stats */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
                    <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Live Performance
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-white/5 rounded-2xl">
                        <div className="text-2xl font-bold text-amber-400 mb-1">
                          1M+
                        </div>
                        <div className="text-xs text-gray-300">
                          Packages Delivered
                        </div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-2xl">
                        <div className="text-2xl font-bold text-green-400 mb-1">
                          99.5%
                        </div>
                        <div className="text-xs text-gray-300">
                          On-Time Rate
                        </div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-2xl">
                        <div className="text-2xl font-bold text-blue-400 mb-1">
                          200+
                        </div>
                        <div className="text-xs text-gray-300">Countries</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-2xl">
                        <div className="text-2xl font-bold text-purple-400 mb-1">
                          24/7
                        </div>
                        <div className="text-xs text-gray-300">Support</div>
                      </div>
                    </div>
                  </div>

                  {/* Service Highlights */}
                  <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-2xl">
                    <h3 className="text-white text-lg font-semibold mb-4">
                      Why Choose Aegis Express?
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 group hover:bg-white/5 p-3 rounded-xl transition-colors">
                        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                          <Truck className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-sm">
                            Express Delivery
                          </h4>
                          <p className="text-gray-300 text-xs">
                            Same-day & next-day options
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 group hover:bg-white/5 p-3 rounded-xl transition-colors">
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                          <Globe className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-sm">
                            Global Network
                          </h4>
                          <p className="text-gray-300 text-xs">
                            Worldwide shipping coverage
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 group hover:bg-white/5 p-3 rounded-xl transition-colors">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                          <Shield className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-sm">
                            Secure & Insured
                          </h4>
                          <p className="text-gray-300 text-xs">
                            Full protection guarantee
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 right-10 animate-bounce hidden xl:block">
            <div className="bg-amber-500/20 backdrop-blur-sm rounded-full p-4 border border-amber-400/30">
              <Package className="h-6 w-6 text-amber-400" />
            </div>
          </div>

          <div className="absolute bottom-20 left-10 animate-pulse hidden xl:block">
            <div className="bg-blue-500/20 backdrop-blur-sm rounded-full p-4 border border-blue-400/30">
              <Globe className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Floating Quick Actions */}
        <div className="absolute bottom-8 right-8 z-20 flex flex-col gap-3">
          <Link
            to="/contact"
            className="group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
            title="Contact Us"
          >
            <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform" />
          </Link>
          <button
            className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-full border border-white/30 shadow-xl transition-all duration-300 hover:scale-110"
            title="Quick Quote"
          >
            <Package className="h-5 w-5 group-hover:bounce transition-transform" />
          </button>
        </div>
      </section>

      {/* Driven by Expertise Section - Modern Redesign */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-blue-950 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-sm border border-orange-200/50 dark:border-orange-400/30 rounded-full px-5 py-2.5 group">
                <Sparkles className="h-4 w-4 text-orange-500 dark:text-orange-400 mr-2 animate-pulse" />
                <span className="text-orange-600 dark:text-orange-400 font-medium text-sm tracking-wide">
                  SERVICES & EXPERTISE
                </span>
                <Sparkles className="h-4 w-4 text-orange-500 dark:text-orange-400 ml-2 animate-pulse" />
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-gray-900 dark:text-white">
                    Driven by
                  </span>
                  <span className="block bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                    Expertise
                  </span>
                  <span className="block text-3xl lg:text-4xl text-gray-700 dark:text-gray-300">
                    Built for{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      Modern Logistics
                    </span>
                  </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                  With over two decades of excellence in transportation and
                  logistics, we've perfected the art of seamless delivery. Your
                  success is our mission.
                </p>
              </div>

              {/* Enhanced Features */}
              <div className="space-y-6">
                <div className="group bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 rounded-2xl p-6 hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                  <div className="flex items-start space-x-5">
                    <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                        Worldwide Shipping
                        <Zap className="h-4 w-4 text-yellow-500 ml-2" />
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Global reach with local expertise across 200+ countries.
                        Real partnerships, real results.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 rounded-2xl p-6 hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                  <div className="flex items-start space-x-5">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                        Real-time Tracking
                        <Target className="h-4 w-4 text-green-500 ml-2" />
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Advanced GPS technology with AI-powered predictions for
                        complete shipment visibility.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 rounded-2xl p-6 hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                  <div className="flex items-start space-x-5">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                        Secure Handling
                        <Award className="h-4 w-4 text-purple-500 ml-2" />
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Military-grade security protocols with comprehensive
                        insurance coverage for ultimate peace of mind.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Link
                  to="/about"
                  className="group relative inline-flex items-center bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 transform hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center">
                    Discover Our Story
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              </div>
            </div>

            {/* Right Content - Enhanced Stats Card */}
            <div className="relative lg:ml-8">
              {/* Main Stats Card */}
              <div className="relative bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-3xl p-8 text-center text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="text-7xl font-bold mb-3 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                    200+
                  </div>
                  <div className="text-2xl font-semibold mb-2">
                    Countries Served
                  </div>
                  <div className="text-lg opacity-90 flex items-center justify-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Worldwide Network
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/30">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">99.9%</div>
                      <div className="text-sm opacity-90">Delivery Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">24/7</div>
                      <div className="text-sm opacity-90">Support</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Achievement Badge */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-4 shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <Award className="h-8 w-8 text-white" />
              </div>

              {/* Floating Image Card */}
              <div className="absolute -bottom-8 -left-8 bg-white dark:bg-zinc-800 rounded-3xl p-6 shadow-2xl border border-gray-200/50 dark:border-zinc-700/50 transform hover:scale-110 transition-transform duration-300">
                <img
                  src="https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Logistics Excellence"
                  className="w-36 h-28 object-cover rounded-2xl"
                />
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-2">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-10 right-16 animate-bounce">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full p-3 border border-purple-300/30">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Modern Redesign */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            fill="none"
          >
            <defs>
              <pattern
                id="grid"
                width="4"
                height="4"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="2"
                  cy="2"
                  r="0.5"
                  fill="currentColor"
                  className="text-gray-300/40 dark:text-zinc-600/40"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/50 dark:border-blue-400/30 rounded-full px-6 py-3 mb-8">
              <Layers className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3" />
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-wide">
                OUR STREAMLINED PROCESS
              </span>
              <Layers className="h-5 w-5 text-blue-500 dark:text-blue-400 ml-3" />
            </div>

            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="block text-gray-900 dark:text-white">
                Built to Support Your
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Business Growth
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience our seamless, intelligent logistics process designed
              for efficiency, transparency, and your complete peace of mind.
            </p>
          </div>

          {/* Process Steps */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-16 left-1/2 transform -translate-x-1/2 w-full max-w-5xl">
              <svg className="w-full h-2" viewBox="0 0 1000 20" fill="none">
                <defs>
                  <linearGradient
                    id="processLine"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      className="text-orange-500"
                      stopColor="currentColor"
                      stopOpacity="0.8"
                    />
                    <stop
                      offset="33%"
                      className="text-blue-500"
                      stopColor="currentColor"
                      stopOpacity="0.8"
                    />
                    <stop
                      offset="66%"
                      className="text-purple-500"
                      stopColor="currentColor"
                      stopOpacity="0.8"
                    />
                    <stop
                      offset="100%"
                      className="text-green-500"
                      stopColor="currentColor"
                      stopOpacity="0.8"
                    />
                  </linearGradient>
                </defs>
                <path
                  d="M50 10 L950 10"
                  stroke="url(#processLine)"
                  strokeWidth="3"
                  strokeDasharray="10,5"
                />
              </svg>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => {
                const colors = [
                  {
                    bg: "from-orange-500 to-amber-600",
                    accent: "orange",
                    ring: "ring-orange-200 dark:ring-orange-400/30",
                  },
                  {
                    bg: "from-blue-500 to-cyan-600",
                    accent: "blue",
                    ring: "ring-blue-200 dark:ring-blue-400/30",
                  },
                  {
                    bg: "from-purple-500 to-violet-600",
                    accent: "purple",
                    ring: "ring-purple-200 dark:ring-purple-400/30",
                  },
                  {
                    bg: "from-green-500 to-emerald-600",
                    accent: "green",
                    ring: "ring-green-200 dark:ring-green-400/30",
                  },
                ];

                const stepColor = colors[index];

                return (
                  <div key={index} className="relative group">
                    {/* Step Card */}
                    <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 rounded-3xl p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white dark:hover:bg-zinc-800 group">
                      {/* Step Number Circle */}
                      <div className="relative mb-8">
                        <div
                          className={`bg-gradient-to-br ${stepColor.bg} text-white w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${stepColor.ring} ring-4`}
                        >
                          {index + 1}
                        </div>

                        {/* Floating Icon */}
                        <div className="absolute -top-2 -right-2 bg-white dark:bg-zinc-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-zinc-700">
                          {index === 0 && (
                            <Package className="h-4 w-4 text-orange-500" />
                          )}
                          {index === 1 && (
                            <Truck className="h-4 w-4 text-blue-500" />
                          )}
                          {index === 2 && (
                            <Shield className="h-4 w-4 text-purple-500" />
                          )}
                          {index === 3 && (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                        </div>

                        {/* Progress Pulse */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${stepColor.bg} rounded-2xl opacity-20 animate-pulse scale-110`}
                        ></div>
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                          {step.description}
                        </p>

                        {/* Enhancement based on step */}
                        <div className="pt-4">
                          {index === 0 && (
                            <div className="inline-flex items-center text-orange-600 dark:text-orange-400 text-sm font-medium">
                              <Clock className="h-4 w-4 mr-2" />
                              Instant Processing
                            </div>
                          )}
                          {index === 1 && (
                            <div className="inline-flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                              <MapPin className="h-4 w-4 mr-2" />
                              GPS Tracked
                            </div>
                          )}
                          {index === 2 && (
                            <div className="inline-flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium">
                              <Shield className="h-4 w-4 mr-2" />
                              Secure Network
                            </div>
                          )}
                          {index === 3 && (
                            <div className="inline-flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                              <Sparkles className="h-4 w-4 mr-2" />
                              Satisfaction Guaranteed
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${stepColor.bg} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}
                      ></div>
                    </div>

                    {/* Step Connector Arrow (Mobile) */}
                    {index < processSteps.length - 1 && (
                      <div className="lg:hidden flex justify-center mt-6 mb-2">
                        <div className="bg-gray-300 dark:bg-zinc-600 rounded-full p-2">
                          <ArrowRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-4 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 rounded-2xl p-6 shadow-xl">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 border-2 border-white dark:border-zinc-800 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 border-2 border-white dark:border-zinc-800 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 border-2 border-white dark:border-zinc-800 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 border-2 border-white dark:border-zinc-800 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
              </div>
              <div className="text-left">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Ready to Experience Our Process?
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Start your shipment journey today
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Modern Redesign */}
      <section className="relative py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-blue-950 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-40 -left-20 w-80 h-80 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-green-400/5 to-teal-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-sm border border-orange-200/50 dark:border-orange-400/30 rounded-full px-6 py-3 mb-8">
              <Rocket className="h-5 w-5 text-orange-500 dark:text-orange-400 mr-3" />
              <span className="text-orange-600 dark:text-orange-400 font-semibold text-sm tracking-wide">
                OUR PREMIUM SERVICES
              </span>
              <Rocket className="h-5 w-5 text-orange-500 dark:text-orange-400 ml-3" />
            </div>

            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="block text-gray-900 dark:text-white">
                Providing Efficient
              </span>
              <span className="block bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                Logistics Solutions
              </span>
              <span className="block text-3xl lg:text-4xl text-gray-700 dark:text-gray-300">
                for Your Business Success
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive suite of logistics services designed to
              streamline your operations and accelerate your business growth.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const gradients = [
                "from-orange-500 to-red-600",
                "from-blue-500 to-cyan-600",
                "from-green-500 to-emerald-600",
                "from-purple-500 to-violet-600",
              ];

              const icons = [
                <Truck className="h-6 w-6 text-white" />,
                <Zap className="h-6 w-6 text-white" />,
                <Globe className="h-6 w-6 text-white" />,
                <Rocket className="h-6 w-6 text-white" />,
              ];

              return (
                <div
                  key={index}
                  className="group relative bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 rounded-3xl overflow-hidden hover:bg-white dark:hover:bg-zinc-800 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  {/* Service Image */}
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    {/* Floating Service Icon */}
                    <div
                      className={`absolute top-4 right-4 bg-gradient-to-r ${gradients[index]} p-3 rounded-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                    >
                      {icons[index]}
                    </div>

                    {/* Service Number Badge */}
                    <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full w-10 h-10 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-amber-500 group-hover:bg-clip-text transition-all duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Service Features */}
                      <div className="flex items-center space-x-4 pt-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Available 24/7
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Premium
                          </span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button className="group/btn w-full mt-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-zinc-700 dark:to-zinc-600 hover:from-orange-500 hover:to-amber-500 text-gray-700 dark:text-gray-300 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-4 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-4 rounded-2xl shadow-lg">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Need a Custom Solution?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our experts will design a tailored logistics strategy for
                    your unique business needs.
                  </p>
                  <button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                    <span>Get Custom Quote</span>
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Modern Redesign */}
      <section className="relative py-24 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <defs>
                <pattern
                  id="statsGrid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="5"
                    cy="5"
                    r="1"
                    fill="currentColor"
                    className="text-white animate-pulse"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#statsGrid)" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
              <BarChart3 className="h-5 w-5 text-amber-400 mr-3" />
              <span className="text-amber-400 font-semibold text-sm tracking-wide">
                PERFORMANCE METRICS
              </span>
              <BarChart3 className="h-5 w-5 text-amber-400 ml-3" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="block text-white">Numbers That</span>
              <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Speak for Themselves
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our commitment to excellence is reflected in every metric that
              matters
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const colors = [
                {
                  bg: "from-orange-500 to-red-600",
                  text: "text-orange-400",
                  ring: "ring-orange-400/30",
                },
                {
                  bg: "from-blue-500 to-cyan-600",
                  text: "text-blue-400",
                  ring: "ring-blue-400/30",
                },
                {
                  bg: "from-green-500 to-emerald-600",
                  text: "text-green-400",
                  ring: "ring-green-400/30",
                },
                {
                  bg: "from-purple-500 to-violet-600",
                  text: "text-purple-400",
                  ring: "ring-purple-400/30",
                },
              ];

              const icons = [
                <Heart className="h-6 w-6" />,
                <Package className="h-6 w-6" />,
                <Users className="h-6 w-6" />,
                <Award className="h-6 w-6" />,
              ];

              const statColor = colors[index];

              return (
                <div
                  key={index}
                  className="group relative"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Main Stat Card */}
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center transition-all duration-500 hover:scale-105 hover:bg-white/15 group relative overflow-hidden">
                    {/* Background Gradient Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${statColor.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                    ></div>

                    {/* Icon */}
                    <div className="relative z-10 mb-6">
                      <div
                        className={`bg-gradient-to-br ${statColor.bg} p-4 rounded-2xl mx-auto w-fit shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ring-4 ${statColor.ring}`}
                      >
                        <div className="text-white">{icons[index]}</div>
                      </div>
                    </div>

                    {/* Number */}
                    <div className="relative z-10 mb-4">
                      <div
                        className={`text-5xl lg:text-6xl font-bold ${statColor.text} mb-2 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {stat.number}
                      </div>
                      <div className="h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto w-16 group-hover:w-24 transition-all duration-300"></div>
                    </div>

                    {/* Label */}
                    <div className="relative z-10">
                      <div className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors duration-300">
                        {stat.label}
                      </div>
                      <div className="text-sm text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        {index === 0 && "Satisfied clients worldwide"}
                        {index === 1 && "Successfully delivered"}
                        {index === 2 && "Trusted network partners"}
                        {index === 3 && "Industry reliability rate"}
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                      <div
                        className={`bg-gradient-to-r ${statColor.bg} p-2 rounded-full shadow-lg`}
                      >
                        <Sparkles className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Connecting Line (Desktop) */}
                  {index < stats.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-white/30 to-transparent transform -translate-y-1/2 z-20"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Achievement Banner */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-400/30 rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 rounded-full shadow-lg">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-white">
                      Industry Leader
                    </h3>
                    <p className="text-amber-300">
                      Recognized excellence in logistics
                    </p>
                  </div>
                </div>
                <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-full shadow-lg">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-white">
                      99.5% Success Rate
                    </h3>
                    <p className="text-blue-300">Delivering on our promises</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Transport Logistics - Modern Redesign */}
      <section className="relative py-24 bg-gradient-to-br from-teal-900 via-slate-800 to-teal-900 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl"></div>

          {/* Geometric Patterns */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
              <defs>
                <pattern
                  id="aboutPattern"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M20 0L40 20L20 40L0 20Z"
                    fill="currentColor"
                    className="text-white"
                  />
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#aboutPattern)" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - Enhanced Image */}
            <div className="relative lg:order-1">
              {/* Main Image Container */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-3xl blur-xl transform group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-4 shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Delivery Excellence"
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Floating Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 p-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 group/play">
                      <Play className="h-8 w-8 text-white ml-1 group-hover/play:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">25+</div>
                  <div className="text-sm text-orange-100">
                    Years Experience
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">ISO</div>
                  <div className="text-sm text-teal-100">Certified</div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/4 -left-4 animate-float">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full p-4 border border-blue-300/30">
                  <Lightbulb className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </div>

            {/* Right Content - Enhanced Text */}
            <div className="lg:order-2 space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center bg-gradient-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-sm border border-teal-300/30 rounded-full px-6 py-3">
                <Building2 className="h-5 w-5 text-teal-400 mr-3" />
                <span className="text-teal-400 font-semibold text-sm tracking-wide">
                  ABOUT OUR COMPANY
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="block text-white">About</span>
                  <span className="block bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    Aegis Express Logistics
                  </span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  We are dedicated to providing world-class logistics solutions
                  that drive business success. Our commitment to innovation,
                  reliability, and customer satisfaction has made us a trusted
                  partner for thousands of businesses worldwide.
                </p>
              </div>

              {/* Enhanced Features Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                      <Truck className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Fast Delivery
                      </h4>
                      <p className="text-orange-300 text-xs">
                        Same-day available
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Secure Transport
                      </h4>
                      <p className="text-green-300 text-xs">100% Protected</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Global Network
                      </h4>
                      <p className="text-blue-300 text-xs">200+ Countries</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        24/7 Support
                      </h4>
                      <p className="text-purple-300 text-xs">
                        Always Available
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/about"
                  className="group relative bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-amber-500/25 transform hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center">
                    Learn More About Us
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>

                <button className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center">
                  <Video className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Video
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 pt-4">
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
                  <Award className="h-4 w-4 text-teal-400" />
                  <span className="text-sm text-gray-300">ISO Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Modern Redesign */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-3xl"></div>

          {/* Hexagon Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <defs>
                <pattern
                  id="teamPattern"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <polygon
                    points="10,1 18,6 18,14 10,19 2,14 2,6"
                    fill="currentColor"
                    className="text-gray-400 dark:text-zinc-600"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#teamPattern)" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-200/50 dark:border-purple-400/30 rounded-full px-6 py-3 mb-8">
              <Users className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-3" />
              <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm tracking-wide">
                OUR EXPERT TEAM
              </span>
              <Users className="h-5 w-5 text-purple-500 dark:text-purple-400 ml-3" />
            </div>

            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="block text-gray-900 dark:text-white">
                Meet the Experts Behind
              </span>
              <span className="block bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                Our Success Story
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our diverse team of logistics professionals brings decades of
              experience and innovation to deliver exceptional results for your
              business.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => {
              const gradients = [
                "from-orange-500 to-red-600",
                "from-blue-500 to-cyan-600",
                "from-green-500 to-emerald-600",
                "from-purple-500 to-violet-600",
              ];

              const roleColors = [
                "text-orange-500",
                "text-blue-500",
                "text-green-500",
                "text-purple-500",
              ];

              return (
                <div
                  key={index}
                  className="group relative"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Main Card */}
                  <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white dark:hover:bg-zinc-800 group">
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Role Badge */}
                      <div
                        className={`absolute top-4 left-4 bg-gradient-to-r ${gradients[index]} px-4 py-2 rounded-full shadow-lg transform group-hover:scale-110 transition-all duration-300`}
                      >
                        <span className="text-white font-semibold text-xs tracking-wide">
                          {index === 0 && "LEADERSHIP"}
                          {index === 1 && "OPERATIONS"}
                          {index === 2 && "LOGISTICS"}
                          {index === 3 && "CUSTOMER SUCCESS"}
                        </span>
                      </div>

                      {/* Team Icon */}
                      <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm border border-white/30 p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <Users className="h-5 w-5 text-white" />
                      </div>

                      {/* Social Links Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center justify-center space-x-3">
                          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full transition-colors duration-200">
                            <Mail className="h-4 w-4 text-white" />
                          </button>
                          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full transition-colors duration-200">
                            <Phone className="h-4 w-4 text-white" />
                          </button>
                          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full transition-colors duration-200">
                            <Globe className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 text-center relative">
                      {/* Background Decoration */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-b-3xl`}
                      ></div>

                      <div className="relative z-10 space-y-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                          {member.name}
                        </h3>

                        <div className="space-y-2">
                          <p
                            className={`font-semibold ${roleColors[index]} text-lg`}
                          >
                            {member.role}
                          </p>

                          {/* Experience Badge */}
                          <div className="inline-flex items-center bg-gray-100 dark:bg-zinc-700 rounded-full px-4 py-2">
                            <Award className="h-3 w-3 text-gray-500 dark:text-gray-400 mr-2" />
                            <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                              {index === 0 && "15+ Years Experience"}
                              {index === 1 && "12+ Years Experience"}
                              {index === 2 && "10+ Years Experience"}
                              {index === 3 && "8+ Years Experience"}
                            </span>
                          </div>
                        </div>

                        {/* Expertise Tags */}
                        <div className="flex flex-wrap justify-center gap-2 pt-2">
                          {index === 0 && (
                            <>
                              <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-medium">
                                Strategy
                              </span>
                              <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-medium">
                                Leadership
                              </span>
                            </>
                          )}
                          {index === 1 && (
                            <>
                              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                                Operations
                              </span>
                              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                                Process
                              </span>
                            </>
                          )}
                          {index === 2 && (
                            <>
                              <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                                Logistics
                              </span>
                              <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                                Supply Chain
                              </span>
                            </>
                          )}
                          {index === 3 && (
                            <>
                              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-xs font-medium">
                                Customer Care
                              </span>
                              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-xs font-medium">
                                Support
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Decoration */}
                  <div
                    className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"
                    style={{ animationDelay: "200ms" }}
                  >
                    <div
                      className={`bg-gradient-to-r ${gradients[index]} p-3 rounded-full shadow-xl`}
                    >
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA Section */}
          <div className="text-center mt-20">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-700 rounded-3xl p-8 max-w-4xl mx-auto border border-gray-200 dark:border-zinc-600">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Want to Join Our Team?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We're always looking for talented individuals to join our
                    growing logistics family.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                    <span>View Careers</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button className="bg-white dark:bg-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-600 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-zinc-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2">
                    <span>Contact Team</span>
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Modern Redesign */}
      <section className="relative py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-blue-950 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/50 dark:border-blue-400/30 rounded-full px-6 py-3 mb-8">
              <Lightbulb className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3" />
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-wide">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <Lightbulb className="h-5 w-5 text-blue-500 dark:text-blue-400 ml-3" />
            </div>

            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="block text-gray-900 dark:text-white">
                Got Questions?
              </span>
              <span className="block bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                We've Got Answers
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Find quick answers to the most common questions about our
              logistics services and how we can help streamline your business
              operations.
            </p>
          </div>

          {/* FAQ Grid */}
          <div className="space-y-6">
            {[
              {
                question: "How can I track my shipment?",
                answer:
                  "You can track your shipment using our advanced online tracking system with your unique tracking number. Get real-time updates via SMS, email, or our mobile app with GPS precision and delivery confirmations.",
                icon: <MapPin className="h-5 w-5" />,
                color: "from-blue-500 to-cyan-600",
              },
              {
                question: "What are your delivery timeframes?",
                answer:
                  "Delivery times vary by service type: Express (1-2 days), Standard (3-5 days), Freight (5-10 days). Same-day delivery available in major cities. International shipping typically takes 7-14 days depending on destination.",
                icon: <Clock className="h-5 w-5" />,
                color: "from-green-500 to-emerald-600",
              },
              {
                question: "Do you provide international shipping?",
                answer:
                  "Yes, we offer comprehensive international shipping services to over 200 countries worldwide. Our global network includes customs clearance, duty management, and local delivery partnerships for seamless cross-border logistics.",
                icon: <Globe className="h-5 w-5" />,
                color: "from-purple-500 to-violet-600",
              },
              {
                question: "How do I schedule a pickup?",
                answer:
                  "You can schedule pickups through our website, mobile app, or by calling our 24/7 customer service. Choose from same-day, next-day, or scheduled pickups. Our drivers will handle packaging if needed.",
                icon: <Truck className="h-5 w-5" />,
                color: "from-orange-500 to-red-600",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="group bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:bg-white dark:hover:bg-zinc-800"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-8">
                  <div className="flex items-start space-x-6">
                    {/* Icon */}
                    <div
                      className={`bg-gradient-to-r ${faq.color} p-4 rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex-shrink-0`}
                    >
                      <div className="text-white">{faq.icon}</div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300 pr-4">
                          {faq.question}
                        </h3>

                        {/* Toggle Button */}
                        <button className="flex-shrink-0 bg-gray-100 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600 p-3 rounded-xl transition-all duration-300 group-hover:scale-110">
                          <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:rotate-180 transition-transform duration-300" />
                        </button>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {faq.answer}
                      </p>

                      {/* Action Links */}
                      <div className="flex items-center space-x-4 pt-2">
                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center space-x-1 transition-colors">
                          <span>Learn More</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                        <div className="w-px h-4 bg-gray-300 dark:bg-zinc-600"></div>
                        <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium flex items-center space-x-1 transition-colors">
                          <span>Contact Support</span>
                          <Phone className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${faq.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-700 rounded-3xl p-8 border border-gray-200 dark:border-zinc-600">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                    <Lightbulb className="h-6 w-6 text-orange-500 mr-3" />
                    Still Have Questions?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our support team is available 24/7 to help you with any
                    logistics needs.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                    <Phone className="h-4 w-4" />
                    <span>Call Support</span>
                  </button>
                  <button className="bg-white dark:bg-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-600 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-zinc-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email Us</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section - Modern Redesign */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-green-500/10 to-teal-500/10 backdrop-blur-sm border border-green-200/50 dark:border-green-400/30 rounded-full px-6 py-3 mb-8">
              <Calendar className="h-5 w-5 text-green-500 dark:text-green-400 mr-3" />
              <span className="text-green-600 dark:text-green-400 font-semibold text-sm tracking-wide">
                LATEST NEWS & INSIGHTS
              </span>
              <Calendar className="h-5 w-5 text-green-500 dark:text-green-400 ml-3" />
            </div>

            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="block text-gray-900 dark:text-white">
                Latest News Directly
              </span>
              <span className="block bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                From Our Blog
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest trends, insights, and innovations in
              the logistics industry from our expert team and industry partners.
            </p>
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title:
                  "Expanding Our Fleet Delivery Strategies for Modern Commerce",
                image:
                  "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=400",
                date: "Dec 15, 2024",
                category: "Fleet Management",
                readTime: "5 min read",
                gradient: "from-blue-500 to-cyan-600",
              },
              {
                title:
                  "Optimizing Last-Mile Delivery Through AI and Technology",
                image:
                  "https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=400",
                date: "Dec 12, 2024",
                category: "Technology",
                readTime: "7 min read",
                gradient: "from-purple-500 to-violet-600",
              },
              {
                title: "Sustainability in Logistics: Our Green Initiative",
                image:
                  "https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=400",
                date: "Dec 10, 2024",
                category: "Sustainability",
                readTime: "4 min read",
                gradient: "from-green-500 to-emerald-600",
              },
            ].map((article, index) => (
              <article
                key={index}
                className="group bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white dark:hover:bg-zinc-800"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-56">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  {/* Category Badge */}
                  <div
                    className={`absolute top-4 left-4 bg-gradient-to-r ${article.gradient} px-4 py-2 rounded-full shadow-lg`}
                  >
                    <span className="text-white font-semibold text-xs tracking-wide">
                      {article.category}
                    </span>
                  </div>

                  {/* Read Time */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full">
                    <span className="text-white text-xs font-medium">
                      {article.readTime}
                    </span>
                  </div>

                  {/* Date Badge */}
                  <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm border border-white/20 px-3 py-2 rounded-full">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3 text-white" />
                      <span className="text-white text-xs font-medium">
                        {article.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {index === 0 &&
                        "Discover how we're expanding our delivery capabilities to meet the growing demands of modern e-commerce and retail businesses."}
                      {index === 1 &&
                        "Learn about the cutting-edge AI technologies we're implementing to revolutionize last-mile delivery efficiency."}
                      {index === 2 &&
                        "Explore our commitment to environmental sustainability and the green initiatives driving our future operations."}
                    </p>

                    {/* Action Button */}
                    <button className="group/btn w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-zinc-700 dark:to-zinc-600 hover:from-orange-500 hover:to-amber-500 text-gray-700 dark:text-gray-300 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                      <span>Read Full Article</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${article.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}
                  ></div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-4 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 rounded-2xl p-8 shadow-xl">
              <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4 rounded-2xl shadow-lg">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Want More Industry Insights?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Subscribe to our blog for weekly updates on logistics trends
                  and innovations.
                </p>
                <button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-400 hover:to-teal-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                  <span>Visit Our Blog</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Modern Redesign */}
      <section className="relative py-24 bg-gradient-to-r from-teal-900 via-slate-900 to-teal-900 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Wave Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
              <defs>
                <pattern
                  id="newsletterWave"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0 20 Q10 10 20 20 T40 20"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    className="text-white"
                  />
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#newsletterWave)" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
              <Mail className="h-5 w-5 text-teal-400 mr-3" />
              <span className="text-teal-400 font-semibold text-sm tracking-wide">
                STAY CONNECTED
              </span>
              <Mail className="h-5 w-5 text-teal-400 ml-3" />
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="block text-white">
                Subscribe to Our Newsletter
              </span>
              <span className="block bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Get Latest Updates
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Stay informed about the latest logistics trends, company updates,
              exclusive offers, and industry insights delivered directly to your
              inbox.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl">
            <form className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-teal-400/30 focus:border-teal-400 transition-all duration-300"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-2 rounded-xl">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="group flex-1 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-orange-500/25 transform hover:-translate-y-1"
                >
                  <span className="flex items-center">
                    Subscribe Now
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <button
                  type="button"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  View Sample
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-500/20 p-2 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-300">Weekly Updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500/20 p-2 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-sm text-gray-300">
                    Exclusive Offers
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-500/20 p-2 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-sm text-gray-300">No Spam</span>
                </div>
              </div>
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-teal-400" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-sm text-gray-300">Subscribers</div>
              </div>
            </div>
            <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-3 rounded-full">
                <Star className="h-6 w-6 text-yellow-400 fill-current" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">4.9/5</div>
                <div className="text-sm text-gray-300">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
