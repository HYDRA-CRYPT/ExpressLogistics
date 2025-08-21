// src/routes/owner/login.tsx
import { useNavigate, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import axios from "axios";

export const Route = createFileRoute("/owner/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Email: ", email, "Password: ", password);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.status === 200 && res.data?.token) {
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("adminRole", "owner");
        navigate({ to: "/owner/dashboard" });
      } else {
        alert("Invalid credentials");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "Login failed, please try again.");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
