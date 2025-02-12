"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/login", { user: { email, password } });
      localStorage.setItem("token", response.headers.authorization);
      router.push("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="w-full border p-2 mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full border p-2 mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2">Login</button>
      </form>
    </div>
  );
}
