import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, Phone, HelpCircle, Info, Globe } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SEOHelmet from "@/components/SEOHelmet";

const Track = () => {
  const [trackingNumbers, setTrackingNumbers] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numbers = trackingNumbers
      .trim()
      .split(/[\s,\n]+/)
      .filter((num) => num);

    if (numbers.length === 0) {
      toast.error("Please enter a tracking number");
      return;
    }

    if (numbers.length > 1) {
      toast.info(`Tracking first number: ${numbers[0]}`, {
        description:
          "Multiple tracking numbers found. We'll track the first one.",
      });
    }

    setIsSearching(true);
    toast.loading("Searching for your package...", { id: "search-tracking" });

    // Add a small delay to show loading state
    setTimeout(() => {
      toast.dismiss("search-tracking");
      navigate(`/track/${numbers[0]}`);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 transition-colors">
      <SEOHelmet page="track" />
      {/* Hero Section - Simplified and Focused */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-blue-900/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7691621/pexels-photo-7691621.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-5 dark:opacity-10"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5"></div>

        {/* Floating elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-200/20 dark:bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-indigo-200/20 dark:bg-indigo-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 rounded-full px-6 py-3 mb-8 shadow-sm">
            <Search className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Real-Time Package Tracking
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Track Your Package
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Get instant updates on your shipment's journey with our advanced
            tracking system
          </p>
        </div>
      </section>

      {/* Main Tracking Form */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tips Section */}
          <Card className="mb-8 border-blue-200/50 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-900/10">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Tracking Number Format
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
                    Your tracking number should look like:{" "}
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                    >
                      AGL1234567890
                    </Badge>
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 text-sm">
                    Multiple tracking numbers can be separated by commas or line
                    breaks.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Form */}
          <Card className="shadow-xl border-gray-200/50 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-gray-900 dark:text-white">
                Enter Tracking Details
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Track one or multiple packages simultaneously
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="tracking"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Tracking Number(s)
                  </Label>
                  <Textarea
                    id="tracking"
                    rows={4}
                    value={trackingNumbers}
                    onChange={(e) => setTrackingNumbers(e.target.value)}
                    className="w-full text-lg placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-zinc-600 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="AGL1234567890, AGL1234567891..."
                    required
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enter one or multiple tracking numbers separated by commas,
                    spaces, or new lines
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSearching || !trackingNumbers.trim()}
                  className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 shadow-lg hover:shadow-xl transition-all duration-200"
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

              {/* Support Link */}
              <div className="mt-8 text-center">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/contact")}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Can't find your package? Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-800 dark:to-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-4 text-gray-600 dark:text-gray-400"
            >
              Customer Support
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Need Additional Help?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our dedicated support team is available around the clock to assist
              with any tracking issues or questions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300 border-gray-200/50 dark:border-zinc-800">
              <CardContent className="p-8">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 flex items-center justify-center mb-6">
                  <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Phone Support
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Speak directly with our logistics experts
                </CardDescription>
                <Badge
                  variant="secondary"
                  className="text-blue-600 dark:text-blue-400 font-semibold"
                >
                  +1 (555) 123-4567
                </Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-gray-200/50 dark:border-zinc-800">
              <CardContent className="p-8">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 flex items-center justify-center mb-6">
                  <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  24/7 Availability
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Round-the-clock assistance when you need it
                </CardDescription>
                <Badge
                  variant="secondary"
                  className="text-green-600 dark:text-green-400 font-semibold"
                >
                  Always Available
                </Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-gray-200/50 dark:border-zinc-800 md:col-span-2 lg:col-span-1">
              <CardContent className="p-8">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10 flex items-center justify-center mb-6">
                  <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Live Chat
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Instant support through our online chat
                </CardDescription>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Help Section */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-200/50 dark:border-blue-800/50">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Frequently Asked Questions
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Find quick answers to common tracking questions in our
                  comprehensive FAQ section.
                </p>
                <Button
                  variant="outline"
                  className="border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  View FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Track;
