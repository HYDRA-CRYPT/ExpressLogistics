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
import SEOHelmet from "@/components/SEOHelmet";
import { TestimonialsSimple } from "@/components/Testimony";

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-blue-950">
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
            {/* Main Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-zinc-700/60 rounded-full px-4 py-2 shadow-sm">
                <Package className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Complete Logistics Solutions
                </span>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-slate-900 dark:text-white">
                    Logistics That
                  </span>
                  <span className="block text-slate-900 dark:text-white">
                    Drive Business
                  </span>
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    Growth
                  </span>
                </h1>

                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                  From same-day express to global freight solutions, we provide
                  the logistics infrastructure your business needs to scale
                  efficiently and compete globally.
                </p>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
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
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
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
                    2hrs
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Express delivery
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    200+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Countries
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    24/7
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Live support
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Service Selector */}
            <div className="lg:col-span-5">
              <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-slate-200/60 dark:border-zinc-700/60 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                  Popular Services
                </h3>

                <div className="space-y-3">
                  {services.slice(0, 3).map((service, index) => (
                    <div
                      key={index}
                      className={`p-4 bg-gradient-to-r ${service.gradient} rounded-xl border border-slate-200/50 dark:border-zinc-700/50 hover:shadow-md transition-all cursor-pointer group`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center`}
                          >
                            {service.icon}
                          </div>
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
                    </div>
                  ))}
                </div>

                <Link
                  to="#services"
                  className="block w-full mt-6 text-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  View All Services →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Comprehensive */}
      <section
        id="services"
        className="relative py-24 bg-white dark:bg-zinc-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Services Built for Your Success
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Every service is designed to solve real business challenges, from
              urgent deliveries to complex supply chain optimization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
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

                <button className="w-full bg-slate-50 dark:bg-zinc-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 py-3 rounded-xl font-medium transition-all duration-200 group">
                  Get Quote for {service.title}
                  <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Process Focus */}
      <section className="relative py-24 bg-slate-50 dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Our streamlined process gets your shipments moving quickly while
              keeping you informed every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative group text-center">
                {/* Connecting line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-zinc-600 dark:to-zinc-500"></div>
                )}

                {/* Step number */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} text-white flex items-center justify-center text-sm font-bold shadow-lg`}
                  >
                    {step.step}
                  </div>
                </div>

                <div
                  className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  {step.icon}
                </div>

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-2">
                  {step.description}
                </p>
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Takes {step.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Value Props */}
      <section className="relative py-24 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Why Businesses Choose Aegis Express
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              We don't just move packages – we help businesses grow by providing
              reliable, efficient logistics solutions that scale with your
              needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-blue-600 dark:text-blue-400">
                    {advantage.icon}
                  </div>
                </div>

                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {advantage.metric}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  {advantage.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional value props */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-zinc-800 dark:to-blue-900/20 rounded-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-6">
                  Enterprise-Grade Solutions for Growing Businesses
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        Dedicated Account Management
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        Personal support for your unique logistics needs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        Custom Integration
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        API integration with your existing systems
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        Volume Discounts
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        Better rates as your shipping volume grows
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <div className="inline-flex flex-col items-center lg:items-end space-y-6">
                  <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      10,000+
                    </div>
                    <div className="text-slate-600 dark:text-slate-300 text-sm">
                      Businesses Trust Us
                    </div>
                  </div>
                  <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                      $2M+
                    </div>
                    <div className="text-slate-600 dark:text-slate-300 text-sm">
                      In Cost Savings
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 bg-slate-50 dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Don't just take our word for it – hear from businesses that have
              transformed their logistics with Aegis Express.
            </p>
          </div>

          {/* Using the Testimony component */}
          <TestimonialsSimple />
        </div>
      </section>

      {/* CTA Section - Action-Focused */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Optimize Your Logistics?
              </h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Join thousands of businesses that have streamlined their
                shipping operations and reduced costs with our logistics
                solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all duration-200 group"
                >
                  Get Free Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="https://t.me/AegisExpressSupport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 group"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on Telegram
                </a>
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold mb-6">Get Started Today</h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Chat on Telegram</div>
                    <div className="text-sm opacity-80">
                      <a
                        href="https://t.me/AegisExpressSupport"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-200 transition-colors"
                      >
                        @AegisExpressSupport
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Email us</div>
                    <div className="text-sm opacity-80">
                      quotes@aegisexpress.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Available 24/7</div>
                    <div className="text-sm opacity-80">
                      Support when you need it
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20 text-center">
                <div className="text-sm opacity-80 mb-2">
                  Average response time
                </div>
                <div className="text-2xl font-bold">Under 15 minutes</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
