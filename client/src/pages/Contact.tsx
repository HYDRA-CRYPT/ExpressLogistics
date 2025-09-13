import { useState } from "react";
import { CONTACT_CONFIG, getTelegramLink } from "../config/contacts";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Sparkles,
  Star,
  Shield,
  CheckCircle2,
  ArrowRight,
  Building2,
  Globe,
  Zap,
} from "lucide-react";
import { toast } from "react-toastify";
import SEOHelmet from "@/components/SEOHelmet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

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

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate form submission
    const toastId = toast.loading("Sending message...");

    setTimeout(() => {
      console.log("Form submitted:", formData);
      toast.update(toastId, {
        render: "Message sent successfully! We'll get back to you soon.",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Telegram Support",
      details: [CONTACT_CONFIG.telegram.channelUsername, "24/7 Instant Chat"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      description: "Chat with us instantly via Telegram",
      link: getTelegramLink(),
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      details: [CONTACT_CONFIG.email.primary, CONTACT_CONFIG.email.support],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      description: "Send us your queries and we'll respond quickly",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Office Locations",
      details: [
        CONTACT_CONFIG.address.headquarters.split(", ")[0],
        CONTACT_CONFIG.address.headquarters.split(", ").slice(1).join(", "),
      ],
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-500/10",
      description: "Visit our modern facilities and warehouses",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      details: [CONTACT_CONFIG.hours.weekdays, CONTACT_CONFIG.hours.weekend],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      description: "We're here when you need us most",
    },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 transition-colors">
      <SEOHelmet page="contact" />

      {/* Modern Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0 }}
      >
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1566139037249-daa77c256ffd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)`,
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl animate-pulse delay-1000"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
          />

          {/* Grid Pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1.0, delay: 0.8 }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <defs>
                <pattern
                  id="contactGrid"
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
              <rect width="100" height="100" fill="url(#contactGrid)" />
            </svg>
          </motion.div>
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.1, rotate: 3 }}
            >
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-6 py-2 text-sm font-semibold">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                </motion.div>
                Get In Touch
              </Badge>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent"
          >
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Contact
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Our Experts
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            Ready to transform your logistics operations? Our team of experts is
            here to help you find the perfect shipping solution for your
            business needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/25 transform hover:-translate-y-1"
                onClick={() => window.open(getTelegramLink(), "_blank")}
              >
                <motion.div
                  className="h-5 w-5 mr-3"
                  whileHover={{ rotate: 12 }}
                  transition={{ duration: 0.3 }}
                >
                  <Send className="h-5 w-5" />
                </motion.div>
                Send Message
                <motion.div
                  className="h-5 w-5 ml-3"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-2xl font-bold transition-all duration-300"
              >
                <Building2 className="h-5 w-5 mr-3" />
                Visit Our Office
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Modern Contact Form & Info */}
      <motion.section
        className="py-24 bg-zinc-50 dark:bg-zinc-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background Effects */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          viewport={{ once: true }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          viewport={{ once: true }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid lg:grid-cols-2 gap-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Modern Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 px-4 py-2 mb-6">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Send className="h-4 w-4 mr-2" />
                    </motion.div>
                    Send Message
                  </Badge>
                </motion.div>
                <motion.h2
                  className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  Let's Start the
                  <motion.span
                    className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    Conversation
                  </motion.span>
                </motion.h2>
                <motion.p
                  className="text-lg text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  Tell us about your logistics needs and we'll craft a solution
                  that's perfect for your business.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-0 shadow-2xl">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <motion.div
                        className="grid md:grid-cols-2 gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                          viewport={{ once: true }}
                        >
                          <Label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Full Name *
                          </Label>
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full h-12 px-4 border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Your full name"
                            />
                          </motion.div>
                        </motion.div>
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                          viewport={{ once: true }}
                        >
                          <Label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Email Address *
                          </Label>
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full h-12 px-4 border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="your.email@example.com"
                            />
                          </motion.div>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        className="grid md:grid-cols-2 gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 1.0 }}
                          viewport={{ once: true }}
                        >
                          <Label
                            htmlFor="phone"
                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Phone Number
                          </Label>
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full h-12 px-4 border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="@YourTelegramHandle"
                            />
                          </motion.div>
                        </motion.div>
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 1.0 }}
                          viewport={{ once: true }}
                        >
                          <Label
                            htmlFor="service"
                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Service Interest
                          </Label>
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Select
                              value={formData.service}
                              onValueChange={(value) =>
                                setFormData({ ...formData, service: value })
                              }
                            >
                              <SelectTrigger className="w-full h-12 px-4 border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-xl">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="domestic">
                                  Domestic Delivery
                                </SelectItem>
                                <SelectItem value="international">
                                  International Shipping
                                </SelectItem>
                                <SelectItem value="express">
                                  Express Delivery
                                </SelectItem>
                                <SelectItem value="freight">
                                  Freight Services
                                </SelectItem>
                                <SelectItem value="warehousing">
                                  Warehousing
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </motion.div>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                        viewport={{ once: true }}
                      >
                        <Label
                          htmlFor="message"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Message *
                        </Label>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Textarea
                            id="message"
                            name="message"
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                            placeholder="Tell us about your shipping requirements, timeline, and any specific needs..."
                          />
                        </motion.div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white h-14 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:-translate-y-1"
                        >
                          <Send className="mr-3 h-5 w-5" />
                          Send Message
                          <ArrowRight className="ml-3 h-5 w-5" />
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Modern Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: -3 }}
                >
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2 mb-6">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                    </motion.div>
                    Contact Info
                  </Badge>
                </motion.div>
                <motion.h2
                  className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  Multiple Ways to
                  <motion.span
                    className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    Reach Us
                  </motion.span>
                </motion.h2>
                <motion.p
                  className="text-lg text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  Choose the communication method that works best for you. We're
                  always ready to help.
                </motion.p>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Card className="group bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <motion.div
                            className={`bg-gradient-to-r ${info.color} text-white p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{
                              duration: 0.8,
                              delay: 0.8 + index * 0.1,
                            }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.2, rotate: 360 }}
                          >
                            {info.icon}
                          </motion.div>
                          <div className="flex-1">
                            <motion.h3
                              className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-500"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.6,
                                delay: 0.9 + index * 0.1,
                              }}
                              viewport={{ once: true }}
                            >
                              {info.title}
                            </motion.h3>
                            <motion.p
                              className="text-gray-600 dark:text-gray-300 mb-3 text-sm"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.6,
                                delay: 1.0 + index * 0.1,
                              }}
                              viewport={{ once: true }}
                            >
                              {info.description}
                            </motion.p>
                            <motion.div
                              className="space-y-1"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.6,
                                delay: 1.1 + index * 0.1,
                              }}
                              viewport={{ once: true }}
                            >
                              {info.details.map((detail, detailIndex) => (
                                <motion.p
                                  key={detailIndex}
                                  className="text-gray-800 dark:text-gray-200 font-medium"
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    delay:
                                      1.2 + index * 0.1 + detailIndex * 0.05,
                                  }}
                                  viewport={{ once: true }}
                                  whileHover={{ x: 5 }}
                                >
                                  {info.link ? (
                                    <a
                                      href={info.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors underline"
                                    >
                                      {detail}
                                    </a>
                                  ) : (
                                    detail
                                  )}
                                </motion.p>
                              ))}
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Quick Contact Options */}
              <motion.div
                className="mt-12 space-y-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <motion.div
                        className="flex items-center space-x-4 mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-2xl"
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.8, delay: 0.8 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1, rotate: 15 }}
                        >
                          <MessageCircle className="h-6 w-6 text-white" />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.9 }}
                          viewport={{ once: true }}
                        >
                          <h4 className="font-bold text-green-800 dark:text-green-300 text-lg">
                            WhatsApp Support
                          </h4>
                          <p className="text-green-700 dark:text-green-300">
                            Chat with us instantly for quick support and
                            real-time updates
                          </p>
                        </motion.div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Start WhatsApp Chat
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <motion.div
                        className="flex items-center space-x-4 mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-2xl"
                          initial={{ scale: 0, rotate: 180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.8, delay: 0.9 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1, rotate: -15 }}
                        >
                          <Phone className="h-6 w-6 text-white" />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 1.0 }}
                          viewport={{ once: true }}
                        >
                          <h4 className="font-bold text-blue-800 dark:text-blue-300 text-lg">
                            Emergency Hotline
                          </h4>
                          <p className="text-blue-700 dark:text-blue-300">
                            24/7 support for urgent shipments and time-critical
                            deliveries
                          </p>
                        </motion.div>
                      </motion.div>
                      <motion.div
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.a
                          href={getTelegramLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hover:from-blue-500 hover:to-cyan-500 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          {CONTACT_CONFIG.telegram.channelUsername}
                        </motion.a>
                        <motion.div
                          className="flex items-center space-x-2 text-green-600 dark:text-green-400"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 1.2 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">
                            Available Now
                          </span>
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800">
                    <CardContent className="p-6">
                      <motion.div
                        className="grid grid-cols-3 gap-4 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 1.0 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1, y: -5 }}
                        >
                          <motion.div
                            className="flex items-center justify-center mb-2"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.1 }}
                            viewport={{ once: true }}
                          >
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.3,
                                  delay: 1.2 + i * 0.1,
                                }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.2, rotate: 360 }}
                              >
                                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                              </motion.div>
                            ))}
                          </motion.div>
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            5.0 Rating
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 1.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1, y: -5 }}
                        >
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.2, rotate: 360 }}
                          >
                            <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                          </motion.div>
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            ISO Certified
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 1.2 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1, y: -5 }}
                        >
                          <motion.div
                            initial={{ scale: 0, rotate: 180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 1.3 }}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              animate={{ rotate: [0, 15, -15, 0] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <Zap className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                            </motion.div>
                          </motion.div>
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            24/7 Support
                          </div>
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Modern Map Section */}
      <motion.section
        className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 px-6 py-3 mb-6">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Globe className="h-4 w-4 mr-2" />
                </motion.div>
                Our Locations
              </Badge>
            </motion.div>
            <motion.h2
              className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Visit Our
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Global Network
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              Experience our state-of-the-art facilities and meet our logistics
              experts in person
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <motion.div
                  className="h-96 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 flex items-center justify-center relative overflow-hidden"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  {/* Map Placeholder with Modern Design */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.0, delay: 0.6 }}
                    viewport={{ once: true }}
                  />
                  <motion.div
                    className="relative z-10 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 rounded-3xl shadow-2xl mb-6"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 1.0, delay: 0.8 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <MapPin className="h-16 w-16 text-white mx-auto" />
                    </motion.div>
                    <motion.h3
                      className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      viewport={{ once: true }}
                    >
                      Interactive Map Integration
                    </motion.h3>
                    <motion.p
                      className="text-gray-600 dark:text-gray-300 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                      viewport={{ once: true }}
                    >
                      Real-time location tracking and route optimization
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 px-4 py-2">
                        Google Maps API Ready
                      </Badge>
                    </motion.div>
                  </motion.div>

                  {/* Floating Location Markers */}
                  <motion.div
                    className="absolute top-12 left-12 bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full shadow-lg animate-bounce"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <Building2 className="h-6 w-6 text-white" />
                  </motion.div>
                  <motion.div
                    className="absolute top-20 right-20 bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full shadow-lg animate-bounce delay-500"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <Globe className="h-6 w-6 text-white" />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-16 left-20 bg-gradient-to-r from-orange-500 to-amber-500 p-3 rounded-full shadow-lg animate-bounce delay-1000"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <Star className="h-6 w-6 text-white" />
                  </motion.div>
                </motion.div>

                <motion.div
                  className="p-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="grid md:grid-cols-3 gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    {[
                      {
                        icon: Building2,
                        title: "Headquarters",
                        location: "New York, NY",
                        description: "Main Operations Center",
                        color: "from-blue-500 to-cyan-500",
                      },
                      {
                        icon: Globe,
                        title: "West Coast Hub",
                        location: "Los Angeles, CA",
                        description: "Pacific Operations",
                        color: "from-green-500 to-emerald-500",
                      },
                      {
                        icon: Star,
                        title: "International Gateway",
                        location: "Miami, FL",
                        description: "Global Shipping Hub",
                        color: "from-orange-500 to-amber-500",
                      },
                    ].map((office, index) => (
                      <motion.div
                        key={index}
                        className="text-center group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10, scale: 1.05 }}
                      >
                        <motion.div
                          className={`bg-gradient-to-r ${office.color} p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.9 + index * 0.1,
                          }}
                          viewport={{ once: true }}
                          whileHover={{ rotate: 360, scale: 1.2 }}
                        >
                          <office.icon className="h-8 w-8 text-white" />
                        </motion.div>
                        <motion.h3
                          className="font-bold text-gray-900 dark:text-white text-xl mb-2"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: 1.0 + index * 0.1,
                          }}
                          viewport={{ once: true }}
                        >
                          {office.title}
                        </motion.h3>
                        <motion.p
                          className="text-gray-600 dark:text-gray-300 font-medium"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: 1.1 + index * 0.1,
                          }}
                          viewport={{ once: true }}
                        >
                          {office.location}
                        </motion.p>
                        <motion.p
                          className="text-sm text-gray-500 dark:text-gray-400 mt-1"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: 1.2 + index * 0.1,
                          }}
                          viewport={{ once: true }}
                        >
                          {office.description}
                        </motion.p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
