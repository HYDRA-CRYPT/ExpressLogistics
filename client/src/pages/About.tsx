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
} from "lucide-react";
import SEOHelmet from "@/components/SEOHelmet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    <div className="bg-white dark:bg-zinc-900 transition-colors">
      <SEOHelmet page="about" />

      {/* Enhanced Hero Section with Better UX */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Simplified, Professional Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-zinc-900 dark:via-blue-900/10 dark:to-slate-900">
          {/* Subtle Pattern for Visual Interest */}
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
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Trust Indicator Badge */}
          <div className="mb-8">
            <Badge className="bg-blue-600 text-white border-0 px-6 py-3 text-sm font-medium shadow-lg">
              <CheckCircle className="h-4 w-4 mr-2" />
              Trusted by 10,000+ Businesses Since 2004
            </Badge>
          </div>

          {/* Clear, Action-Oriented Headline */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
            Your Logistics Partner for
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Global Success
            </span>
          </h1>

          {/* Value Proposition */}
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Countries Served
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                99.9%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                On-Time Delivery
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                24/7
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Customer Support
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">ISO</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Certified Quality
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mission Section with Better Information Hierarchy */}
      <section className="py-24 bg-white dark:bg-zinc-900 relative overflow-hidden">
        {/* Subtle Background Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content with Better Readability */}
            <div className="order-2 lg:order-1">
              <div className="mb-6">
                <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-0 px-4 py-2">
                  <Shield className="h-4 w-4 mr-2" />
                  Our Mission
                </Badge>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                More Than Logistics—
                <span className="block text-blue-600 dark:text-blue-400">
                  We Deliver Dreams
                </span>
              </h2>

              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
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
              </div>

              {/* Key Differentiators */}
              <div className="mt-10 grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
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
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
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
                </div>
              </div>
            </div>

            {/* Enhanced Visual */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative group">
                <img
                  src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Our Mission - Global Logistics Excellence"
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Performance Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
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
                </div>

                {/* Trust Indicator */}
                <div className="absolute -top-4 -right-4 bg-blue-600 p-4 rounded-2xl shadow-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 px-6 py-3 mb-6">
              <MapPin className="h-4 w-4 mr-2" />
              Our Journey
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              From Humble Beginnings to
              <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Global Excellence
              </span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-green-500 to-orange-500 rounded-full"></div>

            <div className="space-y-16">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0
                        ? "lg:pr-12 pr-2 text-right"
                        : "lg:pl-12 pl-2 text-left"
                    }`}
                  >
                    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-0 shadow-lg">
                      <CardContent className="p-8">
                        <div
                          className={`flex items-center ${
                            index % 2 === 0 ? "justify-end" : "justify-start"
                          } mb-4`}
                        >
                          <div
                            className={`bg-gradient-to-r ${item.color} lg:p-3 p-2 rounded-2xl lg:mr-4 mr-2`}
                          >
                            {item.icon}
                          </div>
                          <div className="lg:text-4xl text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                            {item.year}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative">
                    <div
                      className={`w-6 h-6 bg-gradient-to-r ${item.color} rounded-full border-4 border-white dark:border-zinc-900 shadow-lg z-10 relative`}
                    ></div>
                    <div
                      className={`absolute inset-0 w-6 h-6 bg-gradient-to-r ${item.color} rounded-full animate-ping opacity-20`}
                    ></div>
                  </div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Values Section with Focus on Benefits */}
      <section className="py-24 bg-gray-50 dark:bg-zinc-800 relative overflow-hidden">
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
          <div className="text-center mb-20">
            <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-0 px-6 py-3 mb-6">
              <Heart className="h-4 w-4 mr-2" />
              Why Choose Us
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Values That Drive
              <span className="block text-green-600 dark:text-green-400">
                Your Success
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              These aren't just company values—they're promises we make to every
              customer, every day, with every shipment.
            </p>
          </div>

          {/* Enhanced Value Cards with Business Benefits */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <CardContent className="p-8 relative">
                  {/* Enhanced Icon with Business Context */}
                  <div className="flex items-center mb-6">
                    <div
                      className={`bg-gradient-to-r ${value.color} text-white p-4 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {value.title}
                      </h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        Our Promise to You
                      </div>
                    </div>
                  </div>

                  {/* Clear Description with Business Impact */}
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    {value.description}
                  </p>

                  {/* Business Benefit Highlight */}
                  <div
                    className={`${value.bgColor} p-4 rounded-xl border-l-4 border-blue-500`}
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
                  </div>

                  {/* Hover Effect Border */}
                  <div
                    className={`absolute inset-0 border-2 border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-800 rounded-lg transition-colors duration-300`}
                  ></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call-to-Action Section */}
          <div className="mt-16 text-center">
            <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-4">
                Experience These Values in Action
              </h3>
              <p className="text-blue-100 mb-6 text-lg">
                Ready to see how our values translate into exceptional service
                for your business?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Achievements Grid */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-6 py-3 mb-6">
              <Award className="h-4 w-4 mr-2" />
              Our Achievements
            </Badge>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
              Recognition That Speaks Volumes
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Milestones and accolades that showcase our unwavering commitment
              to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-4 hover:scale-105"
              >
                <CardContent className="p-8 text-center relative overflow-hidden">
                  {/* Background Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  {/* Icon with Animation */}
                  <div
                    className={`relative bg-gradient-to-r ${achievement.color} text-white p-6 rounded-3xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}
                  >
                    {achievement.icon}
                    <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Number Display */}
                  <div className="mb-4">
                    <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {achievement.number}
                    </div>
                    <div className="text-sm text-gray-300 font-medium">
                      {achievement.subtitle}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-500">
                    {achievement.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed">
                    {achievement.description}
                  </p>

                  {/* Floating Elements */}
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-6 py-3">
              <Rocket className="h-4 w-4 mr-2" />
              Ready to Get Started?
            </Badge>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
            Let's Build Something Amazing Together
          </h2>

          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust us with their
            logistics needs. Experience the difference that true partnership
            makes.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/services"
              className="group bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-white/25 transform hover:-translate-y-2"
            >
              <Package className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              Start Shipping Today
              <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>

            <Link
              to="/contact"
              className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
            >
              <Building2 className="h-6 w-6 mr-3" />
              Contact Our Experts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
