import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Clock,
  MessageCircle,
  HelpCircle,
  Info,
  Globe,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SEOHelmet from "@/components/SEOHelmet";
import { motion } from "framer-motion";

const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const number = trackingNumber.trim();

    if (!number) {
      toast.error("Please enter a tracking number");
      return;
    }

    setIsSearching(true);
    toast.loading("Searching for your package...", { id: "search-tracking" });

    // Add a small delay to show loading state
    setTimeout(() => {
      toast.dismiss("search-tracking");
      navigate(`/track/${number}`);
      setIsSearching(false);
    }, 800);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-blue-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <SEOHelmet page="track" />

      {/* Immediate Focus Section - Input First */}
      <motion.section
        className="relative pt-8 sm:pt-16 pb-12 overflow-hidden"
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
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          viewport={{ once: true }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
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
              whileHover={{ scale: 1.05, rotate: 3 }}
              className="inline-flex items-center bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-zinc-700/60 rounded-full px-4 py-2 mb-6 shadow-sm"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Search className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
              </motion.div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Real-Time Package Tracking
              </span>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Track Your Package
            </motion.h1>
            <motion.p
              className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Enter your tracking number below for instant updates on your
              shipment
            </motion.p>
          </motion.div>

          {/* Primary Tracking Input - Immediately Visible */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-xl border-0 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md">
                <CardContent className="p-6 sm:p-8">
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <Label
                        htmlFor="tracking"
                        className="text-base font-semibold text-slate-700 dark:text-slate-300"
                      >
                        Tracking Number
                      </Label>
                      <motion.div
                        className="relative"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Input
                          id="tracking"
                          type="text"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          className="w-full h-14 text-lg pl-12 pr-4 bg-white dark:bg-zinc-700 border-2 border-slate-200 dark:border-zinc-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
                          placeholder="Enter tracking number (e.g., AGL1234567890)"
                          autoFocus
                          required
                        />
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        </motion.div>
                      </motion.div>

                      {/* Format Helper */}
                      <motion.div
                        className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
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
                          <Info className="h-4 w-4" />
                        </motion.div>
                        <span>Format: AGL + 10 digits</span>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge variant="outline" className="text-xs">
                            AGL1234567890
                          </Badge>
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSearching || !trackingNumber.trim()}
                        className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
                      >
                        {isSearching ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            <span>Searching...</span>
                          </>
                        ) : (
                          <>
                            <Search className="h-5 w-5 mr-3" />
                            <span>Track Package</span>
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
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.section
        className="pb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              {
                icon: (
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                ),
                title: "Real-Time Updates",
                description: "Live tracking information",
                color: "blue",
              },
              {
                icon: (
                  <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
                ),
                title: "Global Coverage",
                description: "Worldwide shipping network",
                color: "green",
              },
              {
                icon: (
                  <MessageCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                ),
                title: "24/7 Support",
                description: "Always here to help",
                color: "purple",
              },
            ].map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className={`w-12 h-12 bg-${action.color}-100 dark:bg-${action.color}-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ rotate: 360 }}
                    >
                      {action.icon}
                    </motion.div>
                    <motion.h3
                      className="font-semibold text-slate-900 dark:text-white mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {action.title}
                    </motion.h3>
                    <motion.p
                      className="text-sm text-slate-600 dark:text-slate-300"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {action.description}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Support Section - Streamlined */}
      <motion.section
        className="py-16 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Need Help?
            </motion.h2>
            <motion.p
              className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Our support team is available to assist with any tracking
              questions or concerns.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {[
              {
                icon: (
                  <MessageCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                ),
                title: "Chat with us",
                action: "@AegisExpressBot",
                color: "blue",
                type: "badge",
              },
              {
                icon: (
                  <Globe className="h-8 w-8 text-green-600 dark:text-green-400" />
                ),
                title: "Live Chat",
                action: "Start Chat",
                color: "green",
                type: "button",
              },
              {
                icon: (
                  <HelpCircle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                ),
                title: "FAQ",
                action: "View FAQ",
                color: "purple",
                type: "button",
              },
              {
                icon: (
                  <Info className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                ),
                title: "Contact",
                action: "Contact Us",
                color: "orange",
                type: "button",
              },
            ].map((support, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <motion.div
                      className="mx-auto mb-4"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.2, rotate: 15 }}
                    >
                      {support.icon}
                    </motion.div>
                    <motion.h3
                      className="font-semibold text-slate-900 dark:text-white mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {support.title}
                    </motion.h3>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {support.type === "badge" ? (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge
                            variant="outline"
                            className={`text-${support.color}-600 dark:text-${support.color}-400`}
                          >
                            {support.action}
                          </Badge>
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.05, y: -3 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className={`text-${support.color}-600 dark:text-${support.color}-400`}
                            onClick={
                              support.title === "Contact"
                                ? () => navigate("/contact")
                                : undefined
                            }
                          >
                            {support.action}
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Card className="mt-12 border-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <motion.div
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <motion.h3
                      className="font-semibold text-slate-900 dark:text-white mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      viewport={{ once: true }}
                    >
                      Tracking Tips
                    </motion.h3>
                    <motion.ul
                      className="text-sm text-slate-600 dark:text-slate-300 space-y-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.0 }}
                      viewport={{ once: true }}
                    >
                      {[
                        "Tracking numbers are usually sent via email after shipping",
                        "Updates may take 24-48 hours to appear for new shipments",
                        "Contact the sender if you don't have your tracking number",
                      ].map((tip, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 1.1 + index * 0.1,
                          }}
                          viewport={{ once: true }}
                          whileHover={{ x: 5 }}
                        >
                          • {tip}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Track;
