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
    <div className="pt-20 bg-white dark:bg-zinc-900 transition-colors">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 to-blue-900 dark:from-zinc-900 dark:to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-50 dark:opacity-60"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-amber-400">Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Comprehensive logistics solutions tailored to meet your business
              needs
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-amber-500 text-black px-8 py-4 rounded-lg font-semibold hover:bg-amber-400 transition-colors group"
            >
              Get a Quote
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Service Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Choose from our comprehensive range of logistics services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-8 hover:shadow-xl dark:hover:shadow-zinc-900/20 transition-all duration-300 group hover:border-blue-300 dark:hover:border-blue-600"
              >
                <div
                  className={`bg-${service.color}-100 dark:bg-${service.color}-900/30 text-${service.color}-600 dark:text-${service.color}-400 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-2"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Simple 4-step process for all your shipping needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Pickup Request",
                description: "Schedule pickup online or call us",
                icon: <Package className="h-8 w-8" />,
              },
              {
                step: "2",
                title: "Secure Transit",
                description: "Safe transport through our network",
                icon: <Truck className="h-8 w-8" />,
              },
              {
                step: "3",
                title: "Real-time Tracking",
                description: "Monitor your shipment every step",
                icon: <Globe className="h-8 w-8" />,
              },
              {
                step: "4",
                title: "Safe Delivery",
                description: "Confirmed delivery to destination",
                icon: <CheckCircle className="h-8 w-8" />,
              },
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-700 transition-colors">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-amber-500 text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Aegis Express?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Your success is our priority
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-orange-500 text-white p-6 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real feedback from businesses we serve
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg dark:shadow-zinc-900/20 hover:shadow-xl dark:hover:shadow-zinc-900/30 transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-amber-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Shipping?</h2>
          <p className="text-xl text-gray-100 mb-8">
            Get your packages moving with our reliable logistics solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-amber-500 text-black px-8 py-4 rounded-lg font-semibold hover:bg-amber-400 transition-colors inline-flex items-center justify-center group"
            >
              Book a Pickup
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/track"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              Track Shipment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
