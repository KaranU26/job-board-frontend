"use client";
import Link from "next/link";
import { logout } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/" className="text-lg font-bold">Job Board</Link>
      <div>
        {isAuthenticated ? (
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
        ) : (
          <Link href="/login" className="bg-blue-500 px-4 py-2 rounded">Login</Link>
        )}
      </div>
    </nav>
  );
}
