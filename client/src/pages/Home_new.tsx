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
} from "lucide-react";
import SEOHelmet from "@/components/SEOHelmet";

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

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <SEOHelmet page="home" />

      {/* Hero Section - Simplified and Action-Focused */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-blue-950">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Main Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-zinc-700/60 rounded-full px-4 py-2 shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3"></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Live tracking • 99.5% on-time delivery
                </span>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-slate-900 dark:text-white">
                    Reliable Delivery.
                  </span>
                  <span className="block text-slate-900 dark:text-white">
                    On Time.
                  </span>
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    Every Time.
                  </span>
                </h1>

                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                  Experience seamless logistics with real-time tracking, secure
                  handling, and guaranteed delivery for all your shipping needs.
                </p>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  Start Shipping
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/track"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 rounded-xl font-semibold text-lg transition-all duration-200 group"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Track Package
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    Free tracking
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    Insured packages
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    24/7 support
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-slate-200/60 dark:border-zinc-700/60 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                  Quick Actions
                </h3>

                <div className="space-y-4">
                  <Link
                    to="/contact"
                    className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-colors group"
                  >
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center mr-4">
                      <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        Ship Now
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Create a new shipment
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    to="/track"
                    className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-xl transition-colors group"
                  >
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        Track Package
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Real-time tracking
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    to="/services"
                    className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-xl transition-colors group"
                  >
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center mr-4">
                      <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        View Services
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Explore our offerings
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>

                {/* Stats in card */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-zinc-700">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      99.5%
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      On-time delivery
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      24/7
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Customer support
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Clean and Modern */}
      <section className="relative py-24 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-50 dark:bg-blue-900/20 border border-blue-200/60 dark:border-blue-700/60 rounded-full px-4 py-2 mb-6">
              <Package className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Our Services
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Complete Logistics Solutions
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              From local deliveries to international shipping, we provide
              comprehensive logistics services tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-zinc-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  {service.icon}
                </div>

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-slate-600 dark:text-slate-300"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 bg-slate-50 dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-green-50 dark:bg-green-900/20 border border-green-200/60 dark:border-green-700/60 rounded-full px-4 py-2 mb-6">
              <MapPin className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                How It Works
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Simple Process, Reliable Results
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              From booking to delivery, our streamlined process ensures your
              packages reach their destination safely and on time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Connecting line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-zinc-600 dark:to-zinc-500"></div>
                )}

                <div className="text-center">
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    {step.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Trusted by Thousands Worldwide
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Our commitment to excellence drives everything we do, delivering
              results that matter to your business.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Ship with Confidence?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of satisfied customers who trust us with their most
            important deliveries.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all duration-200 group"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/track"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 group"
            >
              <Search className="mr-2 h-5 w-5" />
              Track a Package
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
