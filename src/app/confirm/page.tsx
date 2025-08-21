"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/header";
import Footer from "../components/footer";

function ConfirmContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const sessionId = searchParams.get("sessionId");

  const [processing, setProcessing] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || !sessionId) {
      setError("Invalid confirmation link");
      setProcessing(false);
      return;
    }

    // Automatically confirm the application and notify via WebSocket
    const confirmApplication = async () => {
      try {
        const res = await fetch("/api/confirm-action", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            sessionId,
            action: "confirm",
          }),
        });

        const response = await res.json();

        if (response.success) {
          setConfirmed(true);
        } else {
          setError(response.message || "Failed to confirm application");
        }
      } catch {
        setError("Failed to confirm application");
      } finally {
        setProcessing(false);
      }
    };

    confirmApplication();
  }, [id, sessionId]);

  if (processing) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-white text-xl">Processing confirmation...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-white mb-6">{error}</p>
        </div>
      </main>
    );
  }

  if (confirmed) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-green-500 mb-4">Thank You!</h1>
          <p className="text-white text-lg">
            Thank you for confirming your application. Please go back to the
            submit tab to complete your submission.
          </p>
        </div>
      </main>
    );
  }

  return null;
}

export default function ConfirmPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white text-xl">Loading...</div>
          </div>
        }
      >
        <ConfirmContent />
      </Suspense>
      <Footer />
    </div>
  );
}
