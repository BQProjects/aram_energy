"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/header";
import Footer from "../components/footer";

function ConfirmContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const action = searchParams.get("action");
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id || !action) {
      setStatus("error");
      setMessage("Invalid confirmation link.");
      return;
    }
    fetch(`/api/confirm-action?id=${id}&action=${action}`)
      .then(async (res) => {
        if (!res.ok) {
          // Try to extract message from JSON error
          let msg = "Something went wrong.";
          try {
            const data = await res.json();
            msg = data.message || msg;
          } catch {
            msg = await res.text();
          }
          throw new Error(msg);
        }
        return res.json();
      })
      .then((data) => {
        setStatus("success");
        setMessage(
          data.message || "Thank you, your submission has been updated."
        );
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message || "Something went wrong.");
      });
  }, [id, action]);

  return (
    <div className="flex flex-col items-center w-full max-w-[600px] mx-auto mt-16 bg-white/90 rounded-lg shadow-lg p-10">
      <h1 className="text-3xl font-bold text-[#ff9641] mb-4 font-inria-serif-bold">
        Submission{" "}
        {action === "accept"
          ? "Confirmation"
          : action === "decline"
          ? "Declined"
          : "Update"}
      </h1>
      {status === "pending" && (
        <div className="text-lg text-[#abafb1] font-poppins-regular">
          Processing...
        </div>
      )}
      {status !== "pending" && (
        <div className="text-lg text-[#33475b] font-poppins-regular">
          {message}
        </div>
      )}
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="w-full flex justify-center pb-10"></div>
        <Suspense fallback={<div className="text-white mt-16">Loading...</div>}>
          <ConfirmContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
