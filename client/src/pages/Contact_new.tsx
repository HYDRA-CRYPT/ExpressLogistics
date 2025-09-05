import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Star,
  Shield,
  CheckCircle2,
  ArrowRight,
  Building2,
  Globe,
  Users,
  Award,
  HeadphonesIcon,
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

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      subtitle: "Speak with an expert",
      details: "+1 (555) 123-4567",
      action: "Call Now",
      color: "blue",
      availability: "24/7 Available",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      subtitle: "Get detailed responses",
      details: "info@aegislogistics.com",
      action: "Send Email",
      color: "green",
      availability: "Response within 2 hours",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat",
      subtitle: "Instant assistance",
      details: "Chat with our team",
      action: "Start Chat",
      color: "orange",
      availability: "Mon-Fri 8AM-8PM",
    },
  ];

  const trustIndicators = [
    {
      icon: <Award className="h-5 w-5" />,
      text: "ISO 9001 Certified",
    },
    {
      icon: <Users className="h-5 w-5" />,
      text: "500+ Expert Staff",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      text: "200+ Countries",
    },
    {
      icon: <Star className="h-5 w-5" />,
      text: "4.9/5 Customer Rating",
    },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 transition-colors">
      <SEOHelmet page="contact" />

      {/* Enhanced Hero Section with Clear Value Proposition */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Professional Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-blue-900/10">
          {/* Subtle Pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <defs>
                <pattern
                  id="contactPattern"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="1"
                    fill="currentColor"
                    className="text-blue-600"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#contactPattern)" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Trust Badge */}
            <div className="mb-8">
              <Badge className="bg-blue-600 text-white border-0 px-6 py-3 text-sm font-medium shadow-lg">
                <Shield className="h-4 w-4 mr-2" />
                Expert Support • 24/7 Availability
              </Badge>
            </div>

            {/* Clear, Benefit-Focused Headline */}
            <h1 className="text-4xl lg:text-6xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
              Get Expert Logistics Solutions
              <span className="block text-blue-600 dark:text-blue-400">
                Tailored for Your Business
              </span>
            </h1>

            {/* Value Proposition */}
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              Connect with our logistics experts to discuss your shipping needs,
              get instant quotes, and discover how we can streamline your
              operations for better efficiency and cost savings.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
              {trustIndicators.map((indicator, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300"
                >
                  <div className="text-blue-600 dark:text-blue-400">
                    {indicator.icon}
                  </div>
                  <span className="text-sm font-medium">{indicator.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Method Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`text-${method.color}-600 mb-4 flex justify-center`}
                  >
                    {method.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {method.subtitle}
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white mb-3">
                    {method.details}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    {method.availability}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Primary Call-to-Action */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Send className="h-5 w-5 mr-3" />
              Send Your Inquiry Below
              <ArrowRight className="h-5 w-5 ml-3" />
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form & Information Section */}
      <section className="py-24 bg-gray-50 dark:bg-zinc-800 relative overflow-hidden">
        {/* Subtle Background Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/3 to-cyan-500/3 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Enhanced Contact Form with Better UX */}
            <div>
              <div className="mb-8">
                <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-0 px-4 py-2 mb-6">
                  <Send className="h-4 w-4 mr-2" />
                  Quick Response Form
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Get Your Custom Quote
                  <span className="block text-blue-600 dark:text-blue-400">
                    in 24 Hours
                  </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Share your shipping requirements with us. Our logistics
                  experts will analyze your needs and provide a tailored
                  solution with competitive pricing.
                </p>

                {/* Trust Indicators */}
                <div className="flex items-center gap-6 mt-6 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                    Free consultation
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                    No obligation quote
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                    24-hour response
                  </div>
                </div>
              </div>

              <Card className="bg-white dark:bg-zinc-900 shadow-xl border border-gray-200 dark:border-zinc-700">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Information Section */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                        Your Information
                      </h3>

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
                            placeholder="John Smith"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Business Email *
                          </Label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full h-12 px-4 border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="john@company.com"
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
                            Service Needed
                          </Label>
                          <Select
                            value={formData.service}
                            onValueChange={(value) =>
                              setFormData({ ...formData, service: value })
                            }
                          >
                            <SelectTrigger className="w-full h-12 px-4 border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-xl">
                              <SelectValue placeholder="What do you need help with?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="express-delivery">
                                Express Delivery
                              </SelectItem>
                              <SelectItem value="freight-shipping">
                                Freight Shipping
                              </SelectItem>
                              <SelectItem value="international">
                                International Shipping
                              </SelectItem>
                              <SelectItem value="warehousing">
                                Warehousing Solutions
                              </SelectItem>
                              <SelectItem value="supply-chain">
                                Supply Chain Management
                              </SelectItem>
                              <SelectItem value="consultation">
                                General Consultation
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Requirements Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                        Your Requirements
                      </h3>

                      <div className="space-y-2">
                        <Label
                          htmlFor="message"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Tell us about your shipping needs *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                          placeholder="Please describe:
• What you're shipping (dimensions, weight, type)
• Where you're shipping from/to
• How often you ship
• Any special requirements
• Timeline and budget considerations"
                        />
                      </div>

                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        💡 The more details you provide, the more accurate quote
                        we can offer
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <Send className="mr-3 h-5 w-5" />
                      Get My Custom Quote
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>

                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Secure form • We'll respond within 24 hours
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Contact Information */}
            <div>
              <div className="mb-8">
                <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-0 px-4 py-2 mb-6">
                  <HeadphonesIcon className="h-4 w-4 mr-2" />
                  Contact Information
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Multiple Ways to
                  <span className="block text-green-600 dark:text-green-400">
                    Reach Our Experts
                  </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Choose the communication method that works best for you. Our
                  team is ready to provide expert guidance and support.
                </p>
              </div>

              {/* Contact Information Cards */}
              <div className="space-y-6">
                <Card className="bg-white dark:bg-zinc-900 shadow-lg border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                        <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                          Phone Support
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                          Speak directly with our logistics experts for
                          immediate assistance
                        </p>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            +1 (555) 123-4567
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            +1 (555) 123-4568
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            Available 24/7
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-zinc-900 shadow-lg border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                        <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                          Email Support
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                          Send detailed inquiries and receive comprehensive
                          responses
                        </p>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            info@aegislogistics.com
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            support@aegislogistics.com
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            Response within 2 hours
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-zinc-900 shadow-lg border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl">
                        <MapPin className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                          Visit Our Offices
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                          Experience our state-of-the-art facilities and meet
                          our team
                        </p>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            123 Logistics Avenue
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            New York, NY 10001
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            Mon-Fri 8AM-6PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Cards */}
              <div className="mt-8 space-y-4">
                <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                          Need Immediate Help?
                        </h3>
                        <p className="text-blue-700 dark:text-blue-300 text-sm">
                          Connect with our emergency support team
                        </p>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Live Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                          Schedule a Consultation
                        </h3>
                        <p className="text-green-700 dark:text-green-300 text-sm">
                          Book a free 30-minute strategy session
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Map/Location Section */}
      <section className="py-24 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border-0 px-6 py-3 mb-6">
              <Globe className="h-4 w-4 mr-2" />
              Global Presence
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Visit Our
              <span className="block text-orange-600 dark:text-orange-400">
                World-Class Facilities
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience our state-of-the-art logistics centers and meet our
              expert team in person
            </p>
          </div>

          <Card className="bg-white dark:bg-zinc-900 shadow-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden">
            <CardContent className="p-0">
              <div className="h-96 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 flex items-center justify-center relative overflow-hidden">
                {/* Map Placeholder with Professional Design */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>
                <div className="relative z-10 text-center">
                  <div className="bg-blue-600 p-8 rounded-3xl shadow-2xl mb-6 mx-auto w-fit">
                    <MapPin className="h-16 w-16 text-white mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Interactive Location Map
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Real-time facility locations and route optimization
                  </p>
                  <Badge className="bg-orange-600 text-white border-0 px-4 py-2">
                    Google Maps Integration Ready
                  </Badge>
                </div>

                {/* Floating Location Markers */}
                <div className="absolute top-12 left-12 bg-blue-600 p-3 rounded-full shadow-lg animate-pulse">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div className="absolute top-20 right-20 bg-green-600 p-3 rounded-full shadow-lg animate-pulse delay-500">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div className="absolute bottom-16 left-20 bg-orange-600 p-3 rounded-full shadow-lg animate-pulse delay-1000">
                  <Star className="h-6 w-6 text-white" />
                </div>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center group">
                    <div className="bg-blue-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">
                      Global Headquarters
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      New York, NY
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Main Operations & Strategy Center
                    </p>
                  </div>

                  <div className="text-center group">
                    <div className="bg-green-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">
                      Pacific Hub
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      Los Angeles, CA
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      West Coast & Asian Operations
                    </p>
                  </div>

                  <div className="text-center group">
                    <div className="bg-orange-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">
                      International Gateway
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      Miami, FL
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Latin America & Caribbean Hub
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
