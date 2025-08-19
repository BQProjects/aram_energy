"use client";

import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

export default function TermConditionPage() {
  const { t } = useLanguage();

  return (
    <div>
      <div className="min-h-screen w-full flex flex-col">
        <div className="relative w-full h-screen">
          <Image
            src="/termncondition.png"
            alt="Terms and Conditions Background"
            fill
            quality={100}
            className="object-cover w-full"
            priority
          />
          <Header />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-center font-quando text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-medium leading-tight text-[#FF9641] drop-shadow-lg px-4">
              {t("terms.title")}
            </h1>
          </div>
        </div>
        <div className="w-full flex-1 flex-col max-w-10/12 mx-auto mt-20 bg-black/80 rounded-xl p-6 md:p-10 shadow-lg">
          {/* Scope of Application */}
          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("terms.scope")}
          </h2>
          <p className="font-poppins-regular text-white text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("terms.scope.content")}
          </p>

          {/* Contract Subject */}
          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("terms.contract")}
          </h2>
          <p className="font-poppins-regular text-white text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("terms.contract.content")}
          </p>

          {/* Contract Duration */}
          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("terms.duration")}
          </h2>
          <p className="font-poppins-regular text-white text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("terms.duration.content")}
          </p>

          {/* Credit Check */}
          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("terms.creditCheck")}
          </h2>
          <p className="font-poppins-regular text-white text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("terms.creditCheck.content")}
          </p>

          {/* Delivery and Payment */}
          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("terms.delivery")}
          </h2>
          <p className="font-poppins-regular text-white text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("terms.delivery.content")}
          </p>

          {/* Pricing */}
          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("terms.pricing")}
          </h2>
          <p className="font-poppins-regular text-white text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("terms.pricing.content")}
          </p>

          {/* Price Guarantee */}
          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("terms.guarantee")}
          </h2>
          <p className="font-poppins-regular text-white text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("terms.guarantee.content")}
          </p>

          {/* Billing */}
          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("terms.billing")}
          </h2>
          <p className="font-poppins-regular text-white text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("terms.billing.content")}
          </p>

          {/* Supply Interruption */}
          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("terms.interruption")}
          </h2>
          <p className="font-poppins-regular text-white text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("terms.interruption.content")}
          </p>

          {/* Bonus Payment */}
          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("terms.bonus")}
          </h2>
          <p className="font-poppins-regular text-white text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("terms.bonus.content")}
          </p>

          {/* Liability */}
          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("terms.liability")}
          </h2>
          <p className="font-poppins-regular text-white text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("terms.liability.content")}
          </p>

          {/* Changes to Terms */}
          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("terms.changes")}
          </h2>
          <p className="font-poppins-regular text-white text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("terms.changes.content")}
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
