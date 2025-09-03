// Environment variable validation for production deployment
import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = [
  "MONGO_URI",
  "JWT_SECRET",
  "REDIS_URL",
  "EMAIL_USER",
  "EMAIL_PASS",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const validateEnvironment = () => {
  console.log("🔍 Validating environment variables...");

  const missing = [];

  requiredEnvVars.forEach((varName) => {
    // Support alternative naming conventions
    const value =
      process.env[varName] ||
      process.env[varName.replace("MONGO_URI", "MONGODB_URI")] ||
      process.env[varName.replace("EMAIL_", "SMTP_")];

    if (!value) {
      missing.push(varName);
    } else {
      console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
    }
  });

  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:");
    missing.forEach((varName) => {
      console.error(`   - ${varName}`);
    });
    console.error(
      "\n📖 Please check your environment variables in Render dashboard."
    );
    console.error("🔗 Reference: RENDER_ENV_VARS.txt file in your project.");
    process.exit(1);
  }

  console.log("✅ All required environment variables are set!");
};

export default validateEnvironment;
