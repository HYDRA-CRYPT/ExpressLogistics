// Session management utilities
export class SessionManager {
  private static SESSION_DURATION = 60; // 60 minutes (1 hour)
  private static WARNING_DURATION = 1; // 1 minute warning

  static getLoginTime(): number | null {
    const time = localStorage.getItem("loginTime");
    return time ? parseInt(time) : null;
  }

  static setLoginTime(): void {
    localStorage.setItem("loginTime", Date.now().toString());
  }

  static getSessionAge(): number | null {
    const loginTime = this.getLoginTime();
    if (!loginTime) return null;
    return (Date.now() - loginTime) / 1000 / 60; // Return age in minutes
  }

  static isSessionExpired(): boolean {
    const age = this.getSessionAge();
    return age ? age > this.SESSION_DURATION : true;
  }

  static getTimeUntilWarning(): number {
    const age = this.getSessionAge();
    if (!age) return 0;
    const timeUntilWarning =
      this.SESSION_DURATION - this.WARNING_DURATION - age;
    return Math.max(0, timeUntilWarning);
  }

  static getTimeUntilExpiry(): number {
    const age = this.getSessionAge();
    if (!age) return 0;
    const timeUntilExpiry = this.SESSION_DURATION - age;
    return Math.max(0, timeUntilExpiry);
  }

  static shouldShowWarning(): boolean {
    const age = this.getSessionAge();
    if (!age) return false;
    return age >= this.SESSION_DURATION - this.WARNING_DURATION;
  }

  static clearSession(): void {
    localStorage.removeItem("loginTime");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("adminRole");
    localStorage.removeItem("adminUser");
  }

  static formatTimeRemaining(minutes: number): string {
    if (minutes < 1) {
      return "less than 1 minute";
    } else if (minutes < 60) {
      return `${Math.floor(minutes)} minute${
        Math.floor(minutes) !== 1 ? "s" : ""
      }`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = Math.floor(minutes % 60);
      return `${hours} hour${hours !== 1 ? "s" : ""} ${
        remainingMinutes > 0
          ? `and ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`
          : ""
      }`;
    }
  }
}

export default SessionManager;
