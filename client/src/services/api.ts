import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Example interceptors for perf/logging
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || err.message;
    console.error("API error:", message);
    return Promise.reject(err);
  }
);

// This file creates an Axios instance with a base URL and default headers.
// It uses the environment variable to determine the base URL based on the mode (development or production
// mode). The instance can be used throughout the application to make HTTP requests
// with consistent configuration, such as including credentials and setting the content type to JSON.
// The `withCredentials` option allows cookies to be sent with requests, which is useful for
// authentication and session management in applications that require user login.
// The `axiosInstance` can be imported and used in other parts of the application to make API calls.
// The hook also handles errors by throwing an error with a message from the response or a default message.
