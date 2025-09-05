import { useState } from "react";
import { GalleryVerticalEnd, Shield } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import LoginImg from "../../assets/login-img.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useAuthStore } from "../../stores/authStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Zustand store
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(email, password);
    if (success) {
      // Redirect to dashboard
      window.location.href = "/owner/dashboard";
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-zinc-50 dark:bg-zinc-900">
      <div className="flex flex-col gap-4 sm:gap-6 py-6 sm:py-8 px-4 sm:px-6 md:p-12 bg-white dark:bg-zinc-900">
        <div className="flex justify-center gap-2 sm:gap-3 md:justify-start">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-zinc-700 dark:bg-zinc-600 text-white flex size-7 sm:size-8 items-center justify-center rounded-lg">
              <GalleryVerticalEnd className="size-4 sm:size-5" />
            </div>
            <span className="font-bold text-lg sm:text-xl text-zinc-900 dark:text-zinc-100">
              AegisExpress
            </span>
            <Badge
              variant="secondary"
              className="bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm"
            >
              Admin
            </Badge>
          </div>
        </div>

        <div className="flex flex-1 items-center lg:justify-center lg:flex-row lg:py-4 justify-start flex-col py-12 sm:py-20">
          <div className="w-full max-w-md mx-auto">
            <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm shadow-xl">
              <CardContent className="p-6 sm:p-8">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-zinc-700 dark:bg-zinc-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    Admin Portal
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
                    Secure access to logistics management
                  </p>
                </div>

                <LoginForm
                  email={email}
                  password={password}
                  loading={loading}
                  error={error}
                  onEmailChange={(e) => setEmail(e.target.value)}
                  onPasswordChange={(e) => setPassword(e.target.value)}
                  onSubmit={handleSubmit}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block bg-zinc-100 dark:bg-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-700/10 to-zinc-900/20 dark:from-zinc-600/20 dark:to-zinc-900/40"></div>
        <img
          src={LoginImg}
          alt="Logistics Operations"
          className="absolute inset-0 h-full w-full object-cover opacity-80 dark:opacity-60"
        />
        <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8">
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-zinc-200/50 dark:border-zinc-700/50">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Logistics Management Portal
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
              Comprehensive tools for tracking, managing, and optimizing your
              shipping operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
