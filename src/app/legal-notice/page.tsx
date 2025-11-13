"use client";

import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

export default function LegalNoticePage() {
  const { t } = useLanguage();

  return (
    <div>
      <div className="min-h-screen w-full flex flex-col">
        <div className="relative w-full h-screen">
          <Image
            src="/termncondition.png"
            alt="Impressum Background"
            fill
            quality={100}
            className="object-cover w-full"
            priority
          />
          <Header />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-center font-quando text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-medium leading-tight text-[#FF9641] drop-shadow-lg px-4">
              {t("impressum.title")}
            </h1>
          </div>
        </div>
        <div className="w-full flex-1 flex-col max-w-10/12 mx-auto mt-20 bg-black/80 rounded-xl p-6 md:p-10 shadow-lg text-white">
          {/* Company Info */}
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("impressum.companyInfo")}
          </p>

          {/* Disclaimer */}
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("impressum.disclaimer")}
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
