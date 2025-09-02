import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
      color: "blue",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["info@aegislogistics.com", "support@aegislogistics.com"],
      color: "teal",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Office Address",
      details: ["123 Logistics Avenue", "New York, NY 10001"],
      color: "orange",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Operating Hours",
      details: ["Mon - Fri: 8:00 AM - 8:00 PM", "Sat - Sun: 9:00 AM - 5:00 PM"],
      color: "green",
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
            backgroundImage: `url('https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Contact <span className="text-amber-400">Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Get in touch with our logistics experts. We're here to help with
              all your shipping needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 dark:bg-zinc-800 p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select a service</option>
                      <option value="domestic">Domestic Delivery</option>
                      <option value="international">
                        International Shipping
                      </option>
                      <option value="express">Express Delivery</option>
                      <option value="freight">Freight Services</option>
                      <option value="warehousing">Warehousing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Tell us about your shipping requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center group"
                >
                  <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Get in Touch
              </h2>
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`bg-${info.color}-100 dark:bg-${info.color}-900/30 text-${info.color}-600 dark:text-${info.color}-400 p-3 rounded-full`}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, detailIndex) => (
                        <p
                          key={detailIndex}
                          className="text-gray-600 dark:text-gray-300"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Contact Options */}
              <div className="mt-12 space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="font-semibold text-green-800 dark:text-green-300">
                      WhatsApp Support
                    </span>
                  </div>
                  <p className="text-green-700 dark:text-green-300">
                    Chat with us instantly for quick support
                  </p>
                  <button className="mt-3 text-green-600 dark:text-green-400 font-semibold hover:text-green-700 dark:hover:text-green-300">
                    Start Chat →
                  </button>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-blue-800 dark:text-blue-300">
                      Emergency Hotline
                    </span>
                  </div>
                  <p className="text-blue-700 dark:text-blue-300">
                    24/7 support for urgent shipments
                  </p>
                  <p className="mt-2 text-lg font-bold text-blue-600 dark:text-blue-400">
                    +1 (555) 911-SHIP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Locations
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Visit our offices and warehouses
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden">
            <div className="h-96 bg-gray-200 dark:bg-zinc-700 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Interactive map would be displayed here
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Integration with Google Maps API
                </p>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Headquarters
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    New York, NY
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    West Coast Hub
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Los Angeles, CA
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    International Gateway
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">Miami, FL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
