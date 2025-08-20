import fs from "fs";
import path from "path";

// Ensure logs directory exists
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

function formatMessage(level, args) {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}] ${args.join(" ")}`;
}

// Write to file (rotating daily)
function writeToFile(level, message) {
  const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const filePath = path.join(logDir, `${date}.log`);
  fs.appendFile(filePath, message + "\n", (err) => {
    if (err) console.error("Failed to write log:", err);
  });
}

export function logInfo(...args) {
  const msg = formatMessage("INFO", args);
  console.log(msg);
  writeToFile("INFO", msg);
}

export function logWarn(...args) {
  const msg = formatMessage("WARN", args);
  console.warn(msg);
  writeToFile("WARN", msg);
}

export function logError(...args) {
  const msg = formatMessage("ERROR", args);
  console.error(msg);
  writeToFile("ERROR", msg);
}
