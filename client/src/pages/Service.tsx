import { Link } from "react-router-dom";
import {
  Truck,
  Plane,
  Ship,
  Package,
  Warehouse,
  Clock,
  ArrowRight,
  Star,
  CheckCircle,
  Globe,
  Shield,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SEOHelmet from "@/components/SEOHelmet";

const Services = () => {
  const services = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Domestic Delivery",
      description: "Fast and reliable delivery services across the country",
      features: [
        "Same-day delivery",
        "Next-day delivery",
        "Ground shipping",
        "Local pickup",
      ],
      color: "blue",
    },
    {
      icon: <Plane className="h-8 w-8" />,
      title: "International Shipping",
      description: "Global shipping solutions with customs clearance",
      features: [
        "Air freight",
        "Ocean freight",
        "Customs handling",
        "Import/Export",
      ],
      color: "teal",
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "Express Delivery",
      description: "Ultra-fast delivery for urgent shipments",
      features: [
        "2-hour delivery",
        "Overnight express",
        "Priority handling",
        "Real-time updates",
      ],
      color: "orange",
    },
    {
      icon: <Ship className="h-8 w-8" />,
      title: "Freight Services",
      description: "Heavy cargo and bulk shipment solutions",
      features: [
        "LTL freight",
        "FTL freight",
        "Oversized cargo",
        "Specialized transport",
      ],
      color: "green",
    },
    {
      icon: <Warehouse className="h-8 w-8" />,
      title: "Warehousing",
      description: "Secure storage and distribution services",
      features: [
        "Climate control",
        "Inventory management",
        "Pick & pack",
        "Distribution",
      ],
      color: "purple",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Same-Day Delivery",
      description: "Urgent delivery within hours",
      features: [
        "Emergency delivery",
        "Medical supplies",
        "Document courier",
        "Time-critical",
      ],
      color: "red",
    },
  ];

  const whyChooseUs = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Industry-leading delivery speeds",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Fully Insured",
      description: "Complete protection for your shipments",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Real-time Tracking",
      description: "Advanced GPS tracking system",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Eco-friendly",
      description: "Sustainable transportation options",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechCorp Inc.",
      rating: 5,
      text: "Aegis Express has transformed our supply chain. Their reliability and speed are unmatched.",
      image:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    {
      name: "Michael Chen",
      company: "Global Manufacturing",
      rating: 5,
      text: "Outstanding service and professional handling. They handle our international shipments flawlessly.",
      image:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    {
      name: "Lisa Rodriguez",
      company: "E-commerce Solutions",
      rating: 5,
      text: "The real-time tracking and customer support are exceptional. Highly recommended!",
      image:
        "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 transition-colors">
      <SEOHelmet page="services" />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-blue-900/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-5 dark:opacity-10"></div>

        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5 dark:from-blue-400/10 dark:to-indigo-400/5"></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 dark:bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-indigo-200/20 dark:bg-indigo-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 rounded-full px-6 py-3 mb-8 shadow-sm">
              <Package className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Comprehensive Logistics Solutions
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Our{" "}
              <span className="text-blue-600 dark:text-blue-400">Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Tailored logistics solutions designed to accelerate your business
              growth with precision, reliability, and innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Link to="/contact" className="inline-flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800"
              >
                <Link to="/track">Track Shipment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-24 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
            >
              Service Portfolio
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Comprehensive Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From local deliveries to global freight, we provide end-to-end
              logistics services tailored to your business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl dark:hover:shadow-zinc-900/20 transition-all duration-300 border-gray-200/50 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-800 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br from-${service.color}-50 to-${service.color}-100 dark:from-${service.color}-900/20 dark:to-${service.color}-800/10 group-hover:scale-110 transition-transform`}
                    >
                      <div
                        className={`text-${service.color}-600 dark:text-${service.color}-400`}
                      >
                        {service.icon}
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {service.features.length} Features
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-3"
                      >
                        <div className="flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="ghost"
                    className="w-full justify-start p-0 h-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium group"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-800 dark:to-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 text-gray-600 dark:text-gray-400"
            >
              Process Overview
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our streamlined process ensures your shipments reach their
              destination safely and on time.
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 dark:from-blue-800 dark:via-blue-700 dark:to-blue-800 transform -translate-y-1/2"></div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {[
                {
                  step: "1",
                  title: "Request Pickup",
                  description:
                    "Schedule pickup online or call our 24/7 support",
                  icon: <Package className="h-6 w-6" />,
                  color: "blue",
                },
                {
                  step: "2",
                  title: "Secure Transit",
                  description: "Safe transport through our monitored network",
                  icon: <Shield className="h-6 w-6" />,
                  color: "green",
                },
                {
                  step: "3",
                  title: "Live Tracking",
                  description: "Real-time updates at every milestone",
                  icon: <Globe className="h-6 w-6" />,
                  color: "purple",
                },
                {
                  step: "4",
                  title: "Confirmed Delivery",
                  description: "Proof of delivery with recipient signature",
                  icon: <CheckCircle className="h-6 w-6" />,
                  color: "orange",
                },
              ].map((step, index) => (
                <Card
                  key={index}
                  className="relative bg-white dark:bg-zinc-800 border-gray-200/50 dark:border-zinc-700 hover:shadow-lg transition-all duration-300 group"
                >
                  <CardContent className="p-8 text-center">
                    {/* Step number badge */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div
                        className={`w-8 h-8 rounded-full bg-${step.color}-600 text-white flex items-center justify-center text-sm font-bold shadow-lg`}
                      >
                        {step.step}
                      </div>
                    </div>

                    <div
                      className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-${step.color}-50 to-${step.color}-100 dark:from-${step.color}-900/20 dark:to-${step.color}-800/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <div
                        className={`text-${step.color}-600 dark:text-${step.color}-400`}
                      >
                        {step.icon}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
            >
              Our Advantages
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Aegis Express?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the difference with our industry-leading logistics
              solutions built for modern businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => (
              <Card
                key={index}
                className="text-center group hover:shadow-lg transition-all duration-300 border-gray-200/50 dark:border-zinc-800"
              >
                <CardContent className="p-8">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <div className="text-blue-600 dark:text-blue-400">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-800 dark:to-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 text-gray-600 dark:text-gray-400"
            >
              Client Testimonials
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See what our partners say about our commitment to excellence and
              reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-xl dark:hover:shadow-zinc-900/30 transition-all duration-300 border-gray-200/50 dark:border-zinc-800 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-amber-400 fill-current"
                      />
                    ))}
                  </div>

                  <blockquote className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-zinc-700"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 dark:from-blue-700 dark:via-blue-800 dark:to-indigo-800 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Logistics?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of businesses who trust Aegis Express for their
            shipping needs. Get started with a personalized quote today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all"
            >
              <Link to="/contact" className="inline-flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Book a Pickup
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <Link to="/track" className="inline-flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Track Shipment
              </Link>
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-blue-200 text-sm mb-4">
              Trusted by 10,000+ businesses worldwide
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-white/70 text-xs font-medium">
                Fortune 500 Companies
              </div>
              <div className="w-1 h-1 bg-white/50 rounded-full"></div>
              <div className="text-white/70 text-xs font-medium">
                24/7 Support
              </div>
              <div className="w-1 h-1 bg-white/50 rounded-full"></div>
              <div className="text-white/70 text-xs font-medium">
                Global Network
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
