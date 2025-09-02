import React from "react";
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
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Reliability",
      description: "Consistent, dependable service you can count on every time",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Speed",
      description:
        "Fast delivery solutions that keep your business moving forward",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Transparency",
      description:
        "Clear communication and full visibility throughout the shipping process",
    },
  ];

  const achievements = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "ISO 9001 Certified",
      description: "Quality management standards",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "250+ Team Members",
      description: "Expert logistics professionals",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "200+ Countries",
      description: "Global shipping network",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "20+ Years Experience",
      description: "Industry expertise",
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
            backgroundImage: `url('https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-amber-400">Aegis Express</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Leading the logistics revolution with innovative solutions,
              unwavering commitment, and a passion for connecting businesses
              worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                At Aegis Express Logistics, we exist to simplify global commerce
                by providing exceptional transportation and logistics services.
                We believe that every package carries dreams, ambitions, and
                important connections between people and businesses.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Our mission is to deliver not just packages, but peace of mind,
                ensuring that every shipment reaches its destination safely,
                securely, and on time.
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Trusted by 10,000+ businesses
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    across 6 continents
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our Mission"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber-500 p-6 rounded-2xl text-center text-white">
                <div className="text-3xl font-bold">20+</div>
                <div className="text-sm">Years</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From humble beginnings to global excellence
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg dark:shadow-zinc-900/20">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  2004
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                The Beginning
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Founded with a single truck and a vision to revolutionize
                logistics, starting with local deliveries in New York.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg dark:shadow-zinc-900/20">
              <div className="bg-teal-100 dark:bg-teal-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                  2015
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                National Expansion
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Expanded operations nationwide, building a comprehensive network
                covering all 50 states with advanced tracking technology.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg dark:shadow-zinc-900/20">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  2025
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Global Leader
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Today we serve 200+ countries with cutting-edge logistics
                solutions and sustainable transportation practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide every decision and drive our commitment
              to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="bg-blue-600 text-white p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-700 transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-slate-800 dark:bg-zinc-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Achievements</h2>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              Recognition and milestones that showcase our commitment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="bg-amber-500 text-black p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-400 transition-colors">
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-300 dark:text-gray-400">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Work with Us?</h2>
          <p className="text-xl text-gray-100 mb-8">
            Join thousands of satisfied customers who trust us with their
            logistics needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center group"
            >
              Start Shipping Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
