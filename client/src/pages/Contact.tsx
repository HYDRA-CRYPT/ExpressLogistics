import { useState } from "react";
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
import { toast } from "sonner";
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
    toast.loading("Sending message...", { id: "contact-form" });

    setTimeout(() => {
      console.log("Form submitted:", formData);
      toast.success("Message sent successfully! We'll get back to you soon.", {
        id: "contact-form",
        duration: 5000,
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
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      description: "Call us anytime for immediate assistance",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      details: ["info@aegislogistics.com", "support@aegislogistics.com"],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      description: "Send us your queries and we'll respond quickly",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Office Locations",
      details: ["123 Logistics Avenue", "New York, NY 10001"],
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-500/10",
      description: "Visit our modern facilities and warehouses",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 8:00 PM", "Sat - Sun: 9:00 AM - 5:00 PM"],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      description: "We're here when you need us most",
    },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 transition-colors">
      <SEOHelmet page="contact" />

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
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="mb-6">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-6 py-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 mr-2" />
              Get In Touch
            </Badge>
          </div>

          <h1 className="text-6xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
            Contact
            <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Our Experts
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Ready to transform your logistics operations? Our team of experts is
            here to help you find the perfect shipping solution for your
            business needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/25 transform hover:-translate-y-1">
              <Send className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              Send Message
              <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            <Button
              variant="outline"
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-2xl font-bold transition-all duration-300"
            >
              <Building2 className="h-5 w-5 mr-3" />
              Visit Our Office
            </Button>
          </div>
        </div>
      </section>

      {/* Modern Contact Form & Info */}
      <section className="py-24 bg-white dark:bg-zinc-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Modern Contact Form */}
            <div>
              <div className="mb-8">
                <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 px-4 py-2 mb-6">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Let's Start the
                  <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Conversation
                  </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Tell us about your logistics needs and we'll craft a solution
                  that's perfect for your business.
                </p>
              </div>

              <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-0 shadow-2xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full h-12 px-4 border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Email Address *
                        </Label>
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
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Phone Number
                        </Label>
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full h-12 px-4 border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="service"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Service Interest
                        </Label>
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
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Message *
                      </Label>
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
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white h-14 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:-translate-y-1"
                    >
                      <Send className="mr-3 h-5 w-5" />
                      Send Message
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Modern Contact Information */}
            <div>
              <div className="mb-8">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2 mb-6">
                  <Shield className="h-4 w-4 mr-2" />
                  Contact Info
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Multiple Ways to
                  <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Reach Us
                  </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Choose the communication method that works best for you. We're
                  always ready to help.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="group bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`bg-gradient-to-r ${info.color} text-white p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}
                        >
                          {info.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-500">
                            {info.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">
                            {info.description}
                          </p>
                          <div className="space-y-1">
                            {info.details.map((detail, detailIndex) => (
                              <p
                                key={detailIndex}
                                className="text-gray-800 dark:text-gray-200 font-medium"
                              >
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Contact Options */}
              <div className="mt-12 space-y-6">
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-2xl">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-green-800 dark:text-green-300 text-lg">
                          WhatsApp Support
                        </h4>
                        <p className="text-green-700 dark:text-green-300">
                          Chat with us instantly for quick support and real-time
                          updates
                        </p>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Start WhatsApp Chat
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-2xl">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-800 dark:text-blue-300 text-lg">
                          Emergency Hotline
                        </h4>
                        <p className="text-blue-700 dark:text-blue-300">
                          24/7 support for urgent shipments and time-critical
                          deliveries
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        +1 (555) 911-SHIP
                      </div>
                      <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">
                          Available Now
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Trust Indicators */}
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="flex items-center justify-center mb-2">
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        </div>
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          5.0 Rating
                        </div>
                      </div>
                      <div>
                        <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          ISO Certified
                        </div>
                      </div>
                      <div>
                        <Zap className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          24/7 Support
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Map Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 px-6 py-3 mb-6">
              <Globe className="h-4 w-4 mr-2" />
              Our Locations
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Visit Our
              <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Global Network
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience our state-of-the-art facilities and meet our logistics
              experts in person
            </p>
          </div>

          <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="h-96 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 flex items-center justify-center relative overflow-hidden">
                {/* Map Placeholder with Modern Design */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>
                <div className="relative z-10 text-center">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 rounded-3xl shadow-2xl mb-6">
                    <MapPin className="h-16 w-16 text-white mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Interactive Map Integration
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Real-time location tracking and route optimization
                  </p>
                  <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 px-4 py-2">
                    Google Maps API Ready
                  </Badge>
                </div>

                {/* Floating Location Markers */}
                <div className="absolute top-12 left-12 bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full shadow-lg animate-bounce">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div className="absolute top-20 right-20 bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full shadow-lg animate-bounce delay-500">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div className="absolute bottom-16 left-20 bg-gradient-to-r from-orange-500 to-amber-500 p-3 rounded-full shadow-lg animate-bounce delay-1000">
                  <Star className="h-6 w-6 text-white" />
                </div>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center group">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">
                      Headquarters
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      New York, NY
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Main Operations Center
                    </p>
                  </div>

                  <div className="text-center group">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">
                      West Coast Hub
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      Los Angeles, CA
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Pacific Operations
                    </p>
                  </div>

                  <div className="text-center group">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">
                      International Gateway
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      Miami, FL
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Global Shipping Hub
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;
