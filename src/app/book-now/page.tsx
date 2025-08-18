"use client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/app/contexts/LanguageContext";

const timeSlots = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

function getTodayISO() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString().split("T")[0];
}

export default function BookNowPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [date, setDate] = useState(getTodayISO());
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const s = searchParams.get("service");
    if (s) setService(s);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/book-now", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, slot, name, email, phone, service }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setSlot("");
        // Don't clear service so user sees what they booked
      } else {
        setError("Buchung fehlgeschlagen. Bitte versuchen Sie es erneut.");
      }
    } catch {
      setError("Buchung fehlgeschlagen. Bitte versuchen Sie es erneut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-12 min-h-[70vh] flex flex-col items-center justify-start">
        <div className="w-full bg-black rounded-3xl shadow-2xl p-0 sm:p-1 md:p-2 border border-[#FF9641]">
          <div className="w-full rounded-2xl p-0 sm:p-10 md:p-12 flex flex-col items-center">
            <h1 className="text-4xl font-inria-serif-bold mb-2 text-[#FF9641] tracking-tight text-center">
              {t("bookNow.title")}
            </h1>
            <p className="text-gray-200 text-lg mb-8 text-center max-w-xl">
              {t("bookNow.subtitle")}
            </p>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-6"
            >
              {/* Service type (if present) */}
              {service && (
                <div>
                  <label className="block font-semibold mb-2 text-gray-200">
                    {t("bookNow.service")}
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-700 rounded-lg px-4 py-3 bg-[#23272f] text-white focus:ring-2 focus:ring-[#FF9641] focus:outline-none transition"
                    value={service}
                    readOnly
                  />
                </div>
              )}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className="block font-semibold mb-2 text-gray-200">
                    {t("bookNow.date")}
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-700 rounded-lg px-4 py-3 bg-[#23272f] text-white focus:ring-2 focus:ring-[#FF9641] focus:outline-none transition"
                    value={date}
                    min={getTodayISO()}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold mb-2 text-gray-200">
                    {t("bookNow.time")}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((ts) => (
                      <button
                        type="button"
                        key={ts}
                        className={`px-0 py-0 rounded-lg border-2 font-semibold text-base h-12 transition-all duration-150 ${
                          slot === ts
                            ? "bg-[#FF9641] text-white border-[#FF9641] shadow-lg scale-105"
                            : "bg-[#23272f] text-gray-200 border-gray-700 hover:bg-[#181818]"
                        }`}
                        onClick={() => setSlot(ts)}
                      >
                        {ts}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className="block font-semibold mb-2 text-gray-200">
                    {t("bookNow.name")}
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-700 rounded-lg px-4 py-3 bg-[#23272f] text-white focus:ring-2 focus:ring-[#FF9641] focus:outline-none transition"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold mb-2 text-gray-200">
                    {t("bookNow.email")}
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-700 rounded-lg px-4 py-3 bg-[#23272f] text-white focus:ring-2 focus:ring-[#FF9641] focus:outline-none transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-200">
                  {t("bookNow.phone")}
                </label>
                <input
                  type="tel"
                  className="w-full border border-gray-700 rounded-lg px-4 py-3 bg-[#23272f] text-white focus:ring-2 focus:ring-[#FF9641] focus:outline-none transition"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="text-red-600 font-semibold text-center">
                  {t("bookNow.error")}
                </div>
              )}
              {success && (
                <div className="text-green-600 font-semibold text-center">
                  {t("bookNow.success")}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-[#FF9641] text-white font-bold py-4 rounded-lg text-lg hover:bg-[#e88537] transition-colors duration-200 shadow-md mt-2"
                disabled={loading}
              >
                {loading ? t("bookNow.loading") : t("bookNow.submit")}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
