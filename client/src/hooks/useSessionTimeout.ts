import { useEffect, useRef, useCallback } from "react";
import { useAuthStore } from "../stores/authStore";
import { toast } from "sonner";
import { SessionManager } from "../utils/sessionManager";

interface SessionTimeoutOptions {
  sessionDuration: number; // Session duration in minutes (default: 60)
  warningDuration: number; // Warning duration in minutes (default: 1)
  onWarning?: () => void;
  onTimeout?: () => void;
}

export const useSessionTimeout = (
  options: Partial<SessionTimeoutOptions> = {}
) => {
  const {
    sessionDuration = 2, // 2 minutes for testing
    warningDuration = 0.33, // 20 seconds warning (0.33 minutes)
    onWarning,
    onTimeout,
  } = options;

  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  // Refs to store timer IDs
  const sessionTimer = useRef<NodeJS.Timeout | null>(null);
  const warningTimer = useRef<NodeJS.Timeout | null>(null);
  const autoLogoutTimer = useRef<NodeJS.Timeout | null>(null);

  // Ref to track if warning is currently shown
  const isWarningShown = useRef(false);
  const warningToastId = useRef<string | number>("session-warning");

  // Clear all timers
  const clearAllTimers = useCallback(() => {
    if (sessionTimer.current) {
      clearTimeout(sessionTimer.current);
      sessionTimer.current = null;
    }
    if (warningTimer.current) {
      clearTimeout(warningTimer.current);
      warningTimer.current = null;
    }
    if (autoLogoutTimer.current) {
      clearTimeout(autoLogoutTimer.current);
      autoLogoutTimer.current = null;
    }
    // Dismiss warning toast if it's showing
    if (isWarningShown.current) {
      toast.dismiss(warningToastId.current);
      isWarningShown.current = false;
    }
  }, []);

  // Handle session timeout
  const handleTimeout = useCallback(() => {
    clearAllTimers();
    onTimeout?.();

    // Clear session data
    SessionManager.clearSession();

    toast.error("Session Expired", {
      description: "You have been automatically logged out due to inactivity.",
      duration: 5000,
    });

    // Logout user
    logout();
  }, [logout, onTimeout, clearAllTimers]);

  // Internal restart session function
  const restartSessionInternal = useCallback(() => {
    if (!user) return; // Don't start timers if user is not logged in

    // Check if session is already expired
    if (SessionManager.isSessionExpired()) {
      handleTimeout();
      return;
    }

    // Calculate time remaining until warning
    const sessionAge = SessionManager.getSessionAge() || 0;
    const timeUntilWarning = Math.max(
      0,
      sessionDuration - warningDuration - sessionAge
    );
    const warningTime = timeUntilWarning * 60 * 1000;

    // If we're already in warning period, show warning immediately
    if (timeUntilWarning <= 0) {
      if (!isWarningShown.current) {
        isWarningShown.current = true;
        onWarning?.();

        // Show persistent warning toast with action buttons
        toast.warning("🚨 Session Expiring Soon", {
          id: warningToastId.current,
          description: `Your session will expire in ${SessionManager.formatTimeRemaining(
            warningDuration
          )}. Click "Stay Logged In" to continue using the software.`,
          duration: Infinity, // Keep toast visible
          action: {
            label: "Stay Logged In",
            onClick: () => {
              // Restart session and update login time
              SessionManager.setLoginTime();
              clearAllTimers();
              restartSessionInternal();
              toast.success("✅ Session extended successfully!");
            },
          },
          onDismiss: () => {
            isWarningShown.current = false;
          },
        }); // Set auto-logout timer for remaining time
        const timeUntilExpiry = Math.max(0, sessionDuration - sessionAge);
        autoLogoutTimer.current = setTimeout(() => {
          handleTimeout();
        }, timeUntilExpiry * 60 * 1000);
      }
      return;
    }

    // Set warning timer
    warningTimer.current = setTimeout(() => {
      if (isWarningShown.current) return; // Prevent multiple warnings

      isWarningShown.current = true;
      onWarning?.();

      // Show persistent warning toast with action buttons
      toast.warning("Session Expiring Soon", {
        id: warningToastId.current,
        description: `Your session will expire in ${SessionManager.formatTimeRemaining(
          warningDuration
        )}. Click "Stay Logged In" to continue.`,
        duration: Infinity, // Keep toast visible
        action: {
          label: "Stay Logged In",
          onClick: () => {
            // Restart session and update login time
            SessionManager.setLoginTime();
            clearAllTimers();
            restartSessionInternal();
            toast.success("Session extended successfully!");
          },
        },
        onDismiss: () => {
          isWarningShown.current = false;
        },
      });

      // Set auto-logout timer for warning duration
      autoLogoutTimer.current = setTimeout(() => {
        handleTimeout();
      }, warningDuration * 60 * 1000);
    }, warningTime);

    console.log(
      `Session timeout: Will warn in ${timeUntilWarning.toFixed(
        1
      )} minutes, logout in ${(sessionDuration - sessionAge).toFixed(
        1
      )} minutes`
    );
  }, [
    sessionDuration,
    warningDuration,
    handleTimeout,
    user,
    clearAllTimers,
    onWarning,
  ]);

  // Restart session timers (exposed function)
  const restartSession = useCallback(() => {
    console.log("🔄 Restarting session timers...");
    clearAllTimers();
    // Update login time to reset session
    SessionManager.setLoginTime();
    restartSessionInternal();
  }, [clearAllTimers, restartSessionInternal]);

  // Activity detection
  const handleUserActivity = useCallback(() => {
    if (!user) return;

    // If warning is currently shown, don't restart automatically
    // User needs to explicitly click "Stay Logged In"
    if (isWarningShown.current) return;

    // Restart session on user activity
    restartSession();
  }, [restartSession, user]);

  // Setup activity listeners
  useEffect(() => {
    if (!user) return;

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    // Throttle activity detection to prevent excessive timer resets
    let lastActivity = Date.now();
    const throttleDelay = 10000; // 10 seconds throttle for testing

    const throttledActivityHandler = () => {
      const now = Date.now();
      if (now - lastActivity > throttleDelay) {
        lastActivity = now;
        console.log("🔄 User activity detected, restarting session timer");
        handleUserActivity();
      }
    };

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, throttledActivityHandler, true);
    });

    // Cleanup
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, throttledActivityHandler, true);
      });
    };
  }, [handleUserActivity, user]);

  // Initialize session timeout when user logs in
  useEffect(() => {
    console.log(
      "🔍 Session timeout effect triggered. User:",
      user ? "logged in" : "not logged in"
    );

    if (user) {
      console.log("✅ Starting session timeout with:", {
        sessionDuration: sessionDuration + " minutes",
        warningDuration: warningDuration + " minutes",
      });
      restartSession();
    } else {
      console.log("❌ No user, clearing timers");
      clearAllTimers();
    }

    // Cleanup on unmount
    return () => {
      console.log("🧹 Cleaning up session timeout");
      clearAllTimers();
    };
  }, [user, restartSession, clearAllTimers, sessionDuration, warningDuration]);

  // Expose methods for manual control
  return {
    restartSession,
    clearTimers: clearAllTimers,
    isWarningShown: isWarningShown.current,
  };
};

export default useSessionTimeout;
