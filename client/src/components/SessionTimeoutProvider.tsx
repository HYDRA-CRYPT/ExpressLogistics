import React from "react";
import { useSimpleSessionTimeout } from "../hooks/useSimpleSessionTimeout";
import { SessionTimeoutDialog } from "./SessionTimeoutDialog";

interface SessionTimeoutProviderProps {
  children: React.ReactNode;
  sessionDuration?: number; // in minutes
  warningDuration?: number; // in minutes
}

export const SessionTimeoutProvider: React.FC<SessionTimeoutProviderProps> = ({
  children,
  sessionDuration = 60, // 60 minutes (1 hour)
  warningDuration = 1, // 1 minute warning
}) => {
  // Initialize simple session timeout hook
  const {
    showDialog,
    dialogTimeRemaining,
    handleStayLoggedIn,
    handleLogoutNow,
  } = useSimpleSessionTimeout({
    sessionDuration,
    warningDuration,
  });

  return (
    <>
      {children}
      <SessionTimeoutDialog
        isOpen={showDialog}
        onStayLoggedIn={handleStayLoggedIn}
        onLogout={handleLogoutNow}
        timeRemaining={dialogTimeRemaining}
      />
    </>
  );
};

export default SessionTimeoutProvider;
