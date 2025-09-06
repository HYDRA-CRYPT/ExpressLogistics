import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Lock,
  Shield,
  Mail,
  Eye,
  EyeOff,
  Save,
  AlertCircle,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

const AdminProfile: React.FC = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [userData, setUserData] = useState<{
    id: string;
    email: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get admin info from localStorage as fallback
  const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
  const adminRole = localStorage.getItem("adminRole") || "admin";

  // Fetch current user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          return;
        }

        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
          console.log(data.user);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Use API data if available, fallback to localStorage
  const currentUser = userData || adminUser;
  const currentRole = userData?.role || adminRole;

  const createdDate = currentUser.createdAt
    ? new Date(currentUser.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        formData.newPassword
      )
    ) {
      newErrors.newPassword =
        "Password must contain uppercase, lowercase, number and special character";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsUpdating(true);
      setUpdateSuccess(false);

      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/auth/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      if (!response.ok) {
        let errorMessage = "Failed to update password";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // If JSON parsing fails, use status text or generic message
          errorMessage =
            response.statusText || `HTTP ${response.status}: ${errorMessage}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();

      if (result.success) {
        setUpdateSuccess(true);
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        toast.success("Password updated successfully!");

        // Hide success message after 5 seconds
        setTimeout(() => setUpdateSuccess(false), 5000);
      } else {
        throw new Error(result.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Password update error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update password"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 border-4 border-white dark:border-zinc-600 shadow-lg">
            <User className="w-10 h-10 text-zinc-600 dark:text-zinc-300" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Admin Profile
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Manage your account settings and security
            </p>
          </div>
        </div>

        {/* Profile Information Card */}
        <Card className="shadow-xl border-0 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-700 border-b border-zinc-200 dark:border-zinc-600">
            <CardTitle className="flex items-center gap-3 text-zinc-900 dark:text-white">
              <Shield className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
              Account Information
            </CardTitle>
            <CardDescription className="text-zinc-600 dark:text-zinc-400">
              Your current account details and permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-700/50 border border-zinc-200 dark:border-zinc-600">
                  <div className="flex-shrink-0">
                    <Mail className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Email Address
                    </p>
                    <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                      {currentUser.email || "owner@example.com"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-700/50 border border-zinc-200 dark:border-zinc-600">
                  <div className="flex-shrink-0">
                    <Shield className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Role & Permissions
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-zinc-600 hover:bg-zinc-700 text-white">
                        {currentRole.charAt(0).toUpperCase() +
                          currentRole.slice(1)}
                      </Badge>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        Full Access
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-700/50 border border-zinc-200 dark:border-zinc-600">
                  <div className="flex-shrink-0">
                    <Calendar className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Account Created
                    </p>
                    <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                      {createdDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      Account Status
                    </p>
                    <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">
                      Active & Verified
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Password Update Card */}
        <Card className="shadow-xl border-0 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-700 border-b border-zinc-200 dark:border-zinc-600">
            <CardTitle className="flex items-center gap-3 text-zinc-900 dark:text-white">
              <Lock className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
              Change Password
            </CardTitle>
            <CardDescription className="text-zinc-600 dark:text-zinc-400">
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {updateSuccess && (
              <div className="mb-6 p-4 border border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <p className="text-emerald-700 dark:text-emerald-300">
                    Password updated successfully! Your account is now more
                    secure.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={(e) =>
                      handleInputChange("currentPassword", e.target.value)
                    }
                    placeholder="Enter your current password"
                    className="pr-12 bg-zinc-50 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 focus:border-zinc-500 dark:focus:border-zinc-400"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4 text-zinc-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-zinc-500" />
                    )}
                  </Button>
                </div>
                {errors.currentPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={(e) =>
                        handleInputChange("newPassword", e.target.value)
                      }
                      placeholder="Enter new password"
                      className="pr-12 bg-zinc-50 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 focus:border-zinc-500 dark:focus:border-zinc-400"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-zinc-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-zinc-500" />
                      )}
                    </Button>
                  </div>
                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      placeholder="Confirm new password"
                      className="pr-12 bg-zinc-50 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 focus:border-zinc-500 dark:focus:border-zinc-400"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-zinc-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-zinc-500" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-700/50 border border-zinc-200 dark:border-zinc-600 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-zinc-500 dark:text-zinc-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Password Requirements:
                    </p>
                    <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Contains uppercase and lowercase letters</li>
                      <li>• Contains at least one number</li>
                      <li>
                        • Contains at least one special character (@$!%*?&)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="min-w-40 bg-zinc-700 hover:bg-zinc-800 dark:bg-zinc-600 dark:hover:bg-zinc-700 text-white"
                >
                  {isUpdating ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Updating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Update Password
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;
