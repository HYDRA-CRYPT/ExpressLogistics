import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Clock, LogOut } from "lucide-react";

interface SessionTimeoutDialogProps {
  isOpen: boolean;
  onStayLoggedIn: () => void;
  onLogout: () => void;
  timeRemaining: number; // in seconds
}

export const SessionTimeoutDialog: React.FC<SessionTimeoutDialogProps> = ({
  isOpen,
  onStayLoggedIn,
  onLogout,
  timeRemaining: initialTime,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft, onLogout]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={() => {}}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-amber-600">
            <Clock className="h-5 w-5" />
            Session Expiring Soon
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Your admin session will expire in{" "}
            <span className="font-mono font-bold text-red-600 text-lg">
              {formatTime(timeLeft)}
            </span>
            .
            <br />
            <br />
            You will be automatically logged out due to inactivity unless you
            choose to stay logged in.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
          <AlertDialogCancel
            onClick={onLogout}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <LogOut className="h-4 w-4" />
            Logout Now
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onStayLoggedIn}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Clock className="h-4 w-4" />
            Stay Logged In
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SessionTimeoutDialog;
