"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton({
  className = "",
}: {
  className?: string;
}) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include", // Include cookies
      });

      if (response.ok) {
        // Redirect to login page
        router.push("/admin");
      } else {
        console.error("Logout failed");
        // Still redirect even if logout failed
        router.push("/admin");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Still redirect even if there was an error
      router.push("/admin");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`px-4 py-2 text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors ${className}`}
    >
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}
