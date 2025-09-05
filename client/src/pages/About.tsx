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
  Sparkles,
  TrendingUp,
  Shield,
  Rocket,
  Star,
  Building2,
  MapPin,
  Calendar,
  Package,
} from "lucide-react";
import SEOHelmet from "@/components/SEOHelmet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <defs>
                <pattern
                  id="aboutGrid"
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
              <rect width="100" height="100" fill="url(#aboutGrid)" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="mb-6">
            <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 px-6 py-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 mr-2" />
              Since 2004
            </Badge>
          </div>

          <h1 className="text-6xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
            About
            <span className="block bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Aegis Express
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Leading the logistics revolution with innovative solutions,
            unwavering commitment, and a passion for connecting businesses
            worldwide through seamless transportation.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/services"
              className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:-translate-y-1"
            >
              <Package className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              Explore Our Services
              <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <Link
              to="/contact"
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center"
            >
              <Building2 className="h-5 w-5 mr-3" />
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Modern Mission Statement */}
      <section className="py-24 bg-white dark:bg-zinc-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-orange-500/5 to-amber-500/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="mb-6">
                <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 px-4 py-2">
                  <Shield className="h-4 w-4 mr-2" />
                  Our Mission
                </Badge>
              </div>

              <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                Delivering More Than
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Just Packages
                </span>
              </h2>

              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  At Aegis Express Logistics, we exist to simplify global
                  commerce by providing exceptional transportation and logistics
                  services. We believe that every package carries dreams,
                  ambitions, and important connections between people and
                  businesses.
                </p>
                <p>
                  Our mission is to deliver not just packages, but peace of
                  mind, ensuring that every shipment reaches its destination
                  safely, securely, and on time.
                </p>
              </div>

              <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-2xl">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                      Trusted by 10,000+ businesses
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      across 6 continents and growing
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative group">
                <img
                  src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Our Mission"
                  className="rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />

                {/* Floating Badge */}
                <div className="absolute -bottom-8 -left-8 bg-gradient-to-r from-orange-500 to-amber-500 p-6 rounded-3xl text-center text-white shadow-2xl">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-6 w-6" />
                    <div>
                      <div className="text-3xl font-bold">20+</div>
                      <div className="text-sm opacity-90">Years</div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Star className="h-8 w-8 text-white" />
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

      {/* Core Values with Modern Cards */}
      <section className="py-24 bg-white dark:bg-zinc-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern
                id="valuesPattern"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="2"
                  fill="currentColor"
                  className="text-blue-500"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#valuesPattern)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-6 py-3 mb-6">
              <Heart className="h-4 w-4 mr-2" />
              Our Values
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              The Principles That
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Guide Our Journey
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Every decision we make is rooted in these core values that drive
              our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:rotate-1 overflow-hidden"
              >
                <CardContent className="p-8 text-center relative">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  {/* Icon Container */}
                  <div
                    className={`relative bg-gradient-to-r ${value.color} text-white p-6 rounded-3xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}
                  >
                    {value.icon}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${value.color} rounded-3xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                    ></div>
                  </div>

                  <h3
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-500"
                    style={{
                      backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                    }}
                  >
                    {value.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    {value.description}
                  </p>

                  {/* Floating Sparkles */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                  </div>
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <Sparkles className="h-3 w-3 text-blue-400 animate-pulse delay-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
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
