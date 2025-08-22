"use client";
import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  return (
    <div>
      <div className="min-h-screen w-full flex flex-col">
        <div className="relative w-full h-screen">
          <Image
            src="/privacyPolicy.png"
            alt="Terms and Conditions Background"
            fill
            quality={100}
            className="object-cover w-full"
            priority
          />

          <Header />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-center font-quando text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-medium leading-tight text-[#FF9641] drop-shadow-lg px-4">
              {t("privacy.title")}
            </h1>
          </div>
        </div>
        <div className="w-full flex-1 flex-col max-w-10/12 mx-auto mt-20 bg-black/80 rounded-xl p-6 md:p-10 shadow-lg text-white">
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.intro.paragraph1")}
          </p>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.intro.paragraph2")}
          </p>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.intro.paragraph3")}
          </p>
          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("privacy.overview.title")}
          </h2>
          <ul className="list-disc pl-6 mb-6">
            <li>{t("privacy.overview.item1")}</li>
            <li>{t("privacy.overview.item2")}</li>
            <li>{t("privacy.overview.item3")}</li>
            <li>{t("privacy.overview.item4")}</li>
            <li>{t("privacy.overview.item5")}</li>
            <li>{t("privacy.overview.item6")}</li>
            <li>{t("privacy.overview.item7")}</li>
            <li>{t("privacy.overview.item8")}</li>
            <li>{t("privacy.overview.item9")}</li>
          </ul>
          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("privacy.dataCollected.title")}
          </h2>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.dataCollected.paragraph1")}
          </p>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.dataCollected.paragraph2")}
          </p>
          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("privacy.howCollect.title")}
          </h2>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.howCollect.paragraph1")}
          </p>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.howCollect.paragraph2")}
          </p>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.howCollect.paragraph3")}
          </p>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.howCollect.paragraph4")}
          </p>

          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("privacy.whyCollect.title")}
          </h2>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.whyCollect.intro")}
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>{t("privacy.whyCollect.item1")}</li>
            <li>{t("privacy.whyCollect.item2")}</li>
            <li>{t("privacy.whyCollect.item3")}</li>
            <li>{t("privacy.whyCollect.item4")}</li>
            <li>{t("privacy.whyCollect.item5")}</li>
            <li>{t("privacy.whyCollect.item6")}</li>
            <li>{t("privacy.whyCollect.item7")}</li>
            <li>{t("privacy.whyCollect.item8")}</li>
          </ul>

          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("privacy.sharing.title")}
          </h2>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.sharing.paragraph1")}
          </p>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.sharing.paragraph2")}
          </p>
          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("privacy.retention.title")}
          </h2>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.retention.paragraph")}
          </p>

          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("privacy.protection.title")}
          </h2>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.protection.paragraph")}
          </p>

          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("privacy.minors.title")}
          </h2>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.minors.paragraph1")}
          </p>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.minors.paragraph2")}
          </p>

          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("privacy.updates.title")}
          </h2>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.updates.paragraph")}
          </p>
          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("privacy.california.title")}
          </h2>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.california.paragraph1")}
          </p>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.california.paragraph2")}
          </p>

          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("privacy.contact.title")}
          </h2>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.contact.paragraph")}
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>{t("privacy.contact.name")}</li>
            <li>{t("privacy.contact.address")}</li>
            <li>{t("privacy.contact.email")}</li>
          </ul>

          <h2 className="font-quando text-[#FF9641] text-2xl md:text-3xl mb-2">
            {t("privacy.disclaimer.title")}
          </h2>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.disclaimer.paragraph1")}
          </p>
          <p className="font-poppins-regular text-base md:text-lg mb-6 whitespace-pre-line text-justify">
            {t("privacy.disclaimer.paragraph2")}
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
