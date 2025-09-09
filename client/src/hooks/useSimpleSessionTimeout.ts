import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { toast } from "sonner";

interface SimpleSessionTimeoutProps {
  sessionDuration?: number; // in minutes
  warningDuration?: number; // in minutes
}

interface SessionTimeoutReturn {
  showDialog: boolean;
  dialogTimeRemaining: number;
  handleStayLoggedIn: () => void;
  handleLogoutNow: () => void;
}

export const useSimpleSessionTimeout = ({
  sessionDuration = 60, // 60 minutes (1 hour)
  warningDuration = 1, // 1 minute warning
}: SimpleSessionTimeoutProps = {}): SessionTimeoutReturn => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const restoreSession = useAuthStore((state) => state.restoreSession);

  const warningTimer = useRef<NodeJS.Timeout | null>(null);
  const logoutTimer = useRef<NodeJS.Timeout | null>(null);
  const warningShown = useRef(false);
  const initialized = useRef(false);

  // State for dialog
  const [showDialog, setShowDialog] = useState(false);
  const [dialogTimeRemaining, setDialogTimeRemaining] = useState(0);

  // Try to restore session on first mount
  useEffect(() => {
    if (!initialized.current) {
      console.log("🔄 Attempting to restore session from localStorage...");
      restoreSession();
      initialized.current = true;
    }
  }, [restoreSession]);

  useEffect(() => {
    // Check if user exists (either from login or restored session)
    const token = localStorage.getItem("adminToken");
    const adminUser = localStorage.getItem("adminUser");
    const role = localStorage.getItem("adminRole");

    console.log("🔍 Session timeout check:", {
      user: user ? "found in store" : "not in store",
      token: token ? "exists in localStorage" : "not found",
      adminUser: adminUser ? "exists in localStorage" : "not found",
      role: role ? role : "not found",
      userDetails: user ? { name: user.name, email: user.email } : "none",
    });

    if (!user && !token) {
      console.log(
        "❌ No user found and no token in localStorage, not starting session timeout"
      );
      return;
    }

    // If we have token but no user, try restoring again
    if (!user && token && role === "admin") {
      console.log(
        "🔄 Token found but no user in store, trying to restore session..."
      );
      restoreSession();
      return;
    }

    if (!user) {
      console.log(
        "❌ Still no user after checks, not starting session timeout"
      );
      return;
    }

    console.log("🚀 Starting simple session timeout:", {
      sessionDuration: sessionDuration + " minutes",
      warningDuration: warningDuration + " minutes",
      warningAt: sessionDuration - warningDuration + " minutes",
      user: user?.email || user?.name || "Unknown user",
    });

    // Clear any existing timers
    if (warningTimer.current) clearTimeout(warningTimer.current);
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    warningShown.current = false;

    // Calculate times in milliseconds
    const warningTime = (sessionDuration - warningDuration) * 60 * 1000;
    const logoutTime = sessionDuration * 60 * 1000;

    console.log("⏰ Setting timers:", {
      warningIn: warningTime + "ms (" + warningTime / 1000 + " seconds)",
      logoutIn: logoutTime + "ms (" + logoutTime / 1000 + " seconds)",
    });

    // Set warning timer
    warningTimer.current = setTimeout(() => {
      if (warningShown.current) return;
      warningShown.current = true;

      console.log("🚨 WARNING: Session expiring soon!");

      // Show dialog instead of toast
      setShowDialog(true);
      setDialogTimeRemaining(warningDuration * 60); // Convert to seconds
    }, warningTime);

    // Set logout timer
    logoutTimer.current = setTimeout(() => {
      console.log("⏰ SESSION TIMEOUT - Logging out user");
      setShowDialog(false); // Hide dialog
      toast.error("Session Expired", {
        description:
          "You have been automatically logged out due to inactivity.",
        duration: 5000,
      });
      logout();
    }, logoutTime);

    // Cleanup function
    return () => {
      console.log("🧹 Cleaning up session timers");
      if (warningTimer.current) clearTimeout(warningTimer.current);
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
  }, [user, sessionDuration, warningDuration, logout, restoreSession]);

  // Dialog handlers
  const handleStayLoggedIn = () => {
    console.log("✅ User clicked Stay Logged In - extending session");
    setShowDialog(false);
    warningShown.current = false;

    // Clear existing timers
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    if (warningTimer.current) clearTimeout(warningTimer.current);

    console.log(
      `🔄 Restarting session timeout for ${sessionDuration} minutes (${
        sessionDuration * 60
      } seconds)`
    );

    // Calculate new timer values
    const warningTime = (sessionDuration - warningDuration) * 60 * 1000;
    const logoutTime = sessionDuration * 60 * 1000;

    console.log("⏰ Setting new timers:", {
      warningIn: warningTime + "ms (" + warningTime / 1000 + " seconds)",
      logoutIn: logoutTime + "ms (" + logoutTime / 1000 + " seconds)",
    });

    // Set new warning timer
    warningTimer.current = setTimeout(() => {
      if (warningShown.current) return;
      warningShown.current = true;

      console.log("🚨 WARNING: Session expiring soon! (after extension)");

      // Show dialog again
      setShowDialog(true);
      setDialogTimeRemaining(warningDuration * 60); // Convert to seconds
    }, warningTime);

    // Set new logout timer
    logoutTimer.current = setTimeout(() => {
      console.log("⏰ SESSION TIMEOUT - Logging out user (after extension)");
      setShowDialog(false); // Hide dialog
      toast.error("Session Expired", {
        description:
          "You have been automatically logged out due to inactivity.",
        duration: 5000,
      });
      logout();
    }, logoutTime);

    toast.success(
      `Session extended! You now have ${sessionDuration} more minutes.`
    );
  };

  const handleLogoutNow = () => {
    console.log("🔴 User chose to logout now");
    setShowDialog(false);
    logout();
  };

  return {
    showDialog,
    dialogTimeRemaining,
    handleStayLoggedIn,
    handleLogoutNow,
  };
};

export default useSimpleSessionTimeout;
