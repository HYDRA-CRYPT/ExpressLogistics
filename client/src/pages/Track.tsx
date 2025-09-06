import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Clock,
  MessageCircle,
  HelpCircle,
  Info,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SEOHelmet from "@/components/SEOHelmet";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-blue-950">
      <SEOHelmet page="track" />

      {/* Immediate Focus Section - Input First */}
      <section className="relative pt-8 sm:pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-zinc-700/60 rounded-full px-4 py-2 mb-6 shadow-sm">
              <Search className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Real-Time Package Tracking
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Track Your Package
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Enter your tracking number below for instant updates on your
              shipment
            </p>
          </div>

          {/* Primary Tracking Input - Immediately Visible */}
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl border-0 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="tracking"
                      className="text-base font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Tracking Number
                    </Label>
                    <div className="relative">
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
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    </div>

                    {/* Format Helper */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <Info className="h-4 w-4" />
                      <span>Format: AGL + 10 digits</span>
                      <Badge variant="outline" className="text-xs">
                        AGL1234567890
                      </Badge>
                    </div>
                  </div>

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
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Real-Time Updates
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Live tracking information
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Global Coverage
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Worldwide shipping network
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  24/7 Support
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Always here to help
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Section - Streamlined */}
      <section className="py-16 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Need Help?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our support team is available to assist with any tracking
              questions or concerns.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <MessageCircle className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Chat with us
                </h3>
                <Badge
                  variant="outline"
                  className="text-blue-600 dark:text-blue-400"
                >
                  @AegisExpressBot
                </Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Globe className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Live Chat
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-600 dark:text-green-400"
                >
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <HelpCircle className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  FAQ
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-purple-600 dark:text-purple-400"
                >
                  View FAQ
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Info className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Contact
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-orange-600 dark:text-orange-400"
                  onClick={() => navigate("/contact")}
                >
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Tips */}
          <Card className="mt-12 border-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Tracking Tips
                  </h3>
                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                    <li>
                      • Tracking numbers are usually sent via email after
                      shipping
                    </li>
                    <li>
                      • Updates may take 24-48 hours to appear for new shipments
                    </li>
                    <li>
                      • Contact the sender if you don't have your tracking
                      number
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Track;
