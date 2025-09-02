import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  Globe,
  Clock,
  Shield,
  Users,
  Star,
  CheckCircle,
  Play,
} from "lucide-react";

const Home = () => {
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 dark:from-zinc-900 dark:via-blue-900 dark:to-zinc-800 text-white min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black opacity-50 dark:opacity-60"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Reliable Transport.
                <br />
                <span className="text-amber-400">On Time.</span>
                <br />
                <span className="text-amber-400">Every Time.</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Experience seamless logistics solutions with our comprehensive
                transport services. Fast delivery, real-time tracking, and
                unmatched reliability for all your shipping needs.
              </p>

              <div className="flex items-center mb-8">
                <div className="flex -space-x-2 mr-4">
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white"
                    src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Customer 1"
                  />
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white"
                    src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Customer 2"
                  />
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white"
                    src="https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Customer 3"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-bold">Satisfied Customers</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex text-amber-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-300">4.9/5 Rating</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/services"
                  className="bg-amber-500 text-black px-8 py-4 rounded-lg font-semibold hover:bg-amber-400 transition-colors flex items-center justify-center group"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/track"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors flex items-center justify-center"
                >
                  Track Package
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Driven by Expertise Section */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                ← SERVICES →
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Driven by Expertise Built for{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Logistics
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                With over two decades of experience in transportation and
                logistics, we understand the critical importance of timely,
                secure delivery for your business success.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Worldwide Shipping
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Global reach with local expertise in over 200+ countries
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Real-time Tracking
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Advanced GPS technology for complete shipment visibility
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Secure Handling
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Comprehensive insurance and secure packaging protocols
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors mt-8 group"
              >
                Read More
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative">
              <div className="bg-orange-500 rounded-3xl p-8 text-center text-white">
                <div className="text-6xl font-bold mb-2">40+</div>
                <div className="text-lg">Countries Served</div>
                <div className="text-sm opacity-90 mt-2">Worldwide Network</div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-lg">
                <img
                  src="https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Logistics"
                  className="w-32 h-24 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Process Is Built to Support Your{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Business Growth
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Simple, efficient, and transparent logistics process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto group-hover:bg-orange-600 transition-colors">
                    {index + 1}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-16 w-full h-0.5 bg-gray-300 dark:bg-zinc-600"></div>
                  )}
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

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Providing Efficient Logistics{" "}
              <span className="text-orange-500 dark:text-orange-400">
                Solutions for Your Business
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg dark:shadow-zinc-900/20 overflow-hidden hover:shadow-xl dark:hover:shadow-zinc-900/30 transition-shadow group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {service.description}
                  </p>
                  <button className="text-orange-500 dark:text-orange-400 font-semibold hover:text-orange-600 dark:hover:text-orange-300 transition-colors">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-800 dark:bg-zinc-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="text-5xl font-bold text-amber-400 dark:text-amber-300 mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-300 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Transport Logistics */}
      <section className="py-20 bg-teal-900 dark:bg-zinc-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Delivery Person"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-500 p-4 rounded-2xl">
                <Play className="h-8 w-8 text-white" />
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-6">
                About Transport Logistics
              </h2>
              <p className="text-xl text-gray-300 dark:text-gray-300 mb-8 leading-relaxed">
                We are dedicated to providing world-class logistics solutions
                that drive business success. Our commitment to innovation,
                reliability, and customer satisfaction has made us a trusted
                partner for thousands of businesses worldwide.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <Truck className="h-6 w-6 text-amber-400 dark:text-amber-300" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-amber-400 dark:text-amber-300" />
                  <span>Secure Transport</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-6 w-6 text-amber-400 dark:text-amber-300" />
                  <span>Global Network</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-amber-400 dark:text-amber-300" />
                  <span>24/7 Support</span>
                </div>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center bg-amber-500 text-black px-8 py-4 rounded-lg font-semibold hover:bg-amber-400 transition-colors group"
              >
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet the Experts Behind{" "}
              <span className="text-orange-500 dark:text-orange-400">
                Transport Logistics
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg dark:shadow-zinc-900/20 overflow-hidden hover:shadow-xl dark:hover:shadow-zinc-900/30 transition-shadow group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-4 left-4 bg-orange-500 p-2 rounded-full">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked{" "}
              <span className="text-orange-500 dark:text-orange-400">
                Questions
              </span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How can I track my shipment?",
                answer:
                  "You can track your shipment using our online tracking system with your tracking number.",
              },
              {
                question: "What are your delivery timeframes?",
                answer:
                  "Delivery times vary by service type: Express (1-2 days), Standard (3-5 days), Freight (5-10 days).",
              },
              {
                question: "Do you provide international shipping?",
                answer:
                  "Yes, we offer comprehensive international shipping services to over 200 countries worldwide.",
              },
              {
                question: "How do I schedule a pickup?",
                answer:
                  "You can schedule pickups through our website, mobile app, or by calling our customer service.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <div className="bg-orange-500 p-2 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-3">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest News Directly{" "}
              <span className="text-orange-500 dark:text-orange-400">
                From Our Blog
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title:
                  "Expanding Our Fleet Delivery Strategies for Modern Commerce",
                image:
                  "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=400",
                date: "Dec 15, 2024",
              },
              {
                title:
                  "Optimizing Last-Mile Delivery Through AI and Technology",
                image:
                  "https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=400",
                date: "Dec 12, 2024",
              },
              {
                title: "Sustainability in Logistics: Our Green Initiative",
                image:
                  "https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=400",
                date: "Dec 10, 2024",
              },
            ].map((article, index) => (
              <article
                key={index}
                className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg dark:shadow-zinc-900/20 overflow-hidden hover:shadow-xl dark:hover:shadow-zinc-900/30 transition-shadow group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    News
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {article.date}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <button className="text-orange-500 dark:text-orange-400 font-semibold hover:text-orange-600 dark:hover:text-orange-300 transition-colors">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-teal-900 dark:bg-zinc-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Subscribe to Our Newsletter to Get Latest Updates
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-300 mb-8">
            Stay informed about the latest logistics trends, company updates,
            and exclusive offers.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 dark:text-white dark:bg-zinc-700 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
