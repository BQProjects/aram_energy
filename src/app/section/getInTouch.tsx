import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

import { useState } from "react";

export default function GetInTouch() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value, type } = e.target;
    let newValue: string | boolean = value;
    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    }
    setForm((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/contact-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: "",
          message: "",
          agree: false,
        });
      } else {
        setError(t("getInTouch.error"));
      }
    } catch {
      setError(t("getInTouch.error"));
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    {
      icon: "/orangePhone.svg",
      title: t("getInTouch.phone"),
      content: "+495251 4032589",
    },
    {
      icon: "/orangeMail.svg",
      title: t("getInTouch.email"),
      content: (
        <a
          href="mailto:support@aram-energy-solution.com"
          className="underline hover:text-[#FF9641] transition-colors duration-200"
        >
          support@aram-energy-solution.com
        </a>
      ),
    },
    {
      icon: "/orangeLocation.svg",
      title: t("getInTouch.office"),
      content: t("getInTouch.officeLocation"),
    },
    {
      icon: "/orangeClock.svg",
      title: t("getInTouch.hours"),
      content: (
        <>
          <p>{t("getInTouch.hoursWeek")}</p>
          <p>{t("getInTouch.hoursSat")}</p>
        </>
      ),
    },
  ];
  const formFields = [
    {
      id: "firstName",
      label: t("getInTouch.firstName"),
      placeholder: t("getInTouch.firstName"),
    },
    {
      id: "lastName",
      label: t("getInTouch.lastName"),
      placeholder: t("getInTouch.lastName"),
    },
  ];
  return (
    <div className="bg-black flex flex-col justify-center items-center min-h-screen p-6 sm:p-10 md:p-16 pb-16 sm:pb-20 md:pb-28">
      {/* Frame106-style heading OUTSIDE the cards */}
      <div className="flex flex-col justify-center items-start mb-10 w-full max-w-[830px]">
        <div className="font-quando text-[#ff9641] text-4xl leading-10 mb-2">
          {t("getInTouch.title") || "Get in touch"}
        </div>
        <div className="w-full text-white font-poppins-light text-xl leading-7 max-w-[647px] mt-5">
          {t("getInTouch.subtitle") ||
            "Ready for your energy journey? Contact us today for a free consultation."}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-[830px] mt-10">
        {/* Left: Contact Card */}
        <div className="bg-[#0F0F0F] text-white rounded-xl p-8 flex flex-col md:w-1/2">
          <h2 className="mb-8 text-2xl font-quando">
            {t("getInTouch.contactInfo")}
          </h2>

          <div className="flex flex-col gap-12">
            {contactItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                  quality={100}
                  className="w-10 h-10 flex-shrink-0"
                />
                <div>
                  <p className="font-poppins-regular text-sm text-[#ABAFB1]">
                    {item.title}
                  </p>
                  <div className="font-poppins-light text-sm text-[#F9FAFB]">
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <hr className="border-[#374151] mb-4" />
            <p className="font-inter text-lg text-[#F9FAFB] mb-4">
              {t("getInTouch.followUs")}
            </p>
            <div className="flex gap-4">
              {[
                "/orangeFacebook.svg",
                "/orangeTwitter.svg",
                "/orangeLinkedIn.svg",
                "/orangeInsta.svg",
              ].map((icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="hover:opacity-80 transition-opacity duration-200"
                >
                  <Image
                    src={icon}
                    alt="Social"
                    width={40}
                    height={40}
                    quality={100}
                    className="w-10 h-10"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Form Card */}
        <div className="bg-white rounded-xl p-8 md:w-1/2">
          <h2 className="mb-6 text-2xl font-quando text-[#2C2C2C]">
            {t("getInTouch.sendMessage")}
          </h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-5">
              {formFields.map((field) => (
                <div key={field.id} className="w-full">
                  <label
                    htmlFor={field.id}
                    className="block font-poppins-light text-sm text-[#374151] mb-1"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full border border-[#ADAEBC] rounded-xl px-3 py-2 bg-[#F9FAFB] text-black placeholder-[#ADAEBC] font-poppins-light text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9641] focus:border-transparent"
                    value={form[field.id as keyof typeof form] as string}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-poppins-light text-sm text-[#374151] mb-1"
              >
                {t("getInTouch.emailAddress")}
              </label>
              <input
                id="email"
                type="email"
                placeholder={t("getInTouch.emailPlaceholder")}
                className="w-full border border-[#ADAEBC] rounded-xl px-3 py-2 bg-[#F9FAFB] text-black placeholder-[#ADAEBC] font-poppins-light text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9641] focus:border-transparent"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block font-poppins-light text-sm text-[#374151] mb-1"
              >
                {t("getInTouch.phoneNumber")}
              </label>
              <input
                id="phone"
                type="tel"
                placeholder={t("getInTouch.phonePlaceholder")}
                className="w-full border border-[#ADAEBC] rounded-xl px-3 py-2 bg-[#F9FAFB] text-black placeholder-[#ADAEBC] font-poppins-light text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9641] focus:border-transparent"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="service"
                className="block font-poppins-light text-sm text-[#374151] mb-1"
              >
                {t("getInTouch.serviceType")}
              </label>
              <select
                id="service"
                className="w-full border border-[#ADAEBC] rounded-xl px-3 py-2 bg-[#F9FAFB] text-[#ADAEBC] font-poppins-light text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9641] focus:border-transparent"
                value={form.service}
                onChange={handleChange}
              >
                <option value="">{t("getInTouch.selectService")}</option>
                <option value={t("getInTouch.service1")}>
                  {t("getInTouch.service1")}
                </option>
                <option value={t("getInTouch.service2")}>
                  {t("getInTouch.service2")}
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-poppins-light text-sm text-[#374151] mb-1"
              >
                {t("getInTouch.message")}
              </label>
              <textarea
                id="message"
                placeholder={t("getInTouch.messagePlaceholder")}
                className="w-full border text-[#374151] border-[#ADAEBC] rounded-xl px-3 py-2 h-28 bg-[#F9FAFB] placeholder-[#ADAEBC] font-poppins-light text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9641] focus:border-transparent resize-none"
                value={form.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <label className="flex items-start gap-2 text-sm text-[#6C757D]">
              <input
                type="checkbox"
                id="agree"
                className="mt-1"
                checked={form.agree}
                onChange={handleChange}
              />
              <span className="font-poppins-light">
                {t("getInTouch.agree")}
              </span>
            </label>

            {error && (
              <div className="text-red-600 font-semibold text-center mb-2">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-600 font-semibold text-center mb-2">
                {t("getInTouch.success")}
              </div>
            )}
            <button
              type="submit"
              className="bg-[#FF9641] w-full text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-poppins-regular text-base hover:bg-[#e88537] transition-colors duration-200"
              disabled={loading}
            >
              <Image
                src="/sendSvg.svg"
                alt="Send"
                width={16}
                height={16}
                quality={100}
                className="w-4 h-4"
              />
              {loading ? t("getInTouch.sending") : t("getInTouch.send")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
