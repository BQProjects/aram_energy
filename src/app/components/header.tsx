"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const navLinks = [
  { nameKey: "nav.home", href: "/" },
  { nameKey: "nav.services", href: "/#services" },
  { nameKey: "nav.about", href: "/#about" },
  { nameKey: "nav.schedule", href: "/#schedule" },
  { nameKey: "nav.contact", href: "/#contact" },
];

const flagIcons: Record<"en" | "de", string> = {
  en: "/engFlag.png",
  de: "/deFlag.svg",
};

const languages = {
  en: { name: "English", flag: "/engFlag.png" },
  de: { name: "Deutsch", flag: "/deFlag.svg" },
};

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const handleLanguageChange = (newLang: "en" | "de") => {
    setLanguage(newLang);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <header className="w-full flex items-center px-4 sm:px-6 md:px-8 py-3 bg-transparent relative z-10">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/AramLogo.svg"
          alt="Aram Energy Solution Logo"
          width={188}
          height={118}
          className="w-28 h-16 sm:w-32 sm:h-20 md:w-[188px] md:h-[118px] pl-7"
        />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center flex-1 justify-center relative">
        <ul className="flex gap-6 xl:gap-5 list-none m-0 p-0 absolute left-0 right-1/6 mx-auto w-fit">
          {navLinks.map((link) => (
            <li key={link.nameKey} className="flex items-center">
              <Link
                href={link.href}
                scroll={true}
                className="text-gray-100 px-2 py-1 rounded transition-colors duration-200 hover:text-orange-400 hover:font-semibold flex items-center font-poppins-regular text-base font-normal"
              >
                {t(link.nameKey)}
                {link.nameKey === "nav.services" && (
                  <Image
                    src="/circleDown.svg"
                    alt="Circle Down Icon"
                    width={18}
                    height={18}
                    className="ml-1.5"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
        {/* Right side: Language Selector and Get Quote Button */}
        <div className="hidden lg:flex items-center gap-10 absolute right-0">
          {/* Language Selector */}
          <div className="flex items-center justify-center relative">
            <button
              className="flex items-center justify-center w-24 sm:w-28 h-10 bg-black/10 hover:bg-black/20 transition-colors duration-200 rounded-lg"
              onClick={toggleLanguageDropdown}
            >
              <Image
                src={flagIcons[language]}
                alt={languages[language].name}
                width={29}
                height={29}
                className="rounded-full mr-2"
              />
              <span className="mx-1 sm:mx-2 text-white font-poppins-regular text-base font-normal">
                {languages[language].name === "English" ? "EN" : "DE"}
              </span>
              <svg
                width="8.5"
                height="8.5"
                viewBox="0 0 8.5 8.5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`ml-2 transition-transform duration-200 ${
                  isLanguageDropdownOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M1 3L4.25 6.5L7.5 3"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Language Dropdown */}
            {isLanguageDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 bg-black/90 backdrop-blur-sm shadow-lg border border-gray-700 min-w-[140px] z-50">
                {Object.entries(languages).map(([code, langData]) => (
                  <button
                    key={code}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 ${
                      language === code ? "bg-white/20" : ""
                    }`}
                    onClick={() => handleLanguageChange(code as "en" | "de")}
                  >
                    <Image
                      src={langData.flag}
                      alt={langData.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-white font-poppins-regular text-sm">
                      {langData.name === "English" ? "EN" : "DE"}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Get Quote Button */}
          <button className="flex items-center justify-center bg-[#FF9641] text-white font-poppins-medium text-base font-normal w-28 sm:w-36 md:w-56 h-11 md:h-14 hover:bg-[#e88537] transition-colors duration-200">
            {t("header.getQuote")}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex items-center gap-3 ml-auto">
        {/* Language Selector for Mobile */}
        <div className="relative">
          <button
            className="flex items-center justify-center w-20 h-10 bg-black/10 hover:bg-black/20 transition-colors duration-200 rounded-lg"
            onClick={toggleLanguageDropdown}
          >
            <Image
              src={flagIcons[language]}
              alt={languages[language].name}
              width={24}
              height={24}
              className="rounded-full mr-1"
            />
            <span className="text-white font-poppins-regular text-sm">
              {languages[language].name === "English" ? "EN" : "DE"}
            </span>
          </button>

          {/* Mobile Language Dropdown */}
          {isLanguageDropdownOpen && (
            <div className="absolute top-full mt-2 right-0 bg-black/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 min-w-[120px] z-50">
              {Object.entries(languages).map(([code, langData]) => (
                <button
                  key={code}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-white/10 transition-colors duration-200 ${
                    language === code ? "bg-white/20" : ""
                  }`}
                  onClick={() => handleLanguageChange(code as "en" | "de")}
                >
                  <Image
                    src={langData.flag}
                    alt={langData.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span className="text-white font-poppins-regular text-sm">
                    {langData.name === "English" ? "EN" : "DE"}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="flex flex-col justify-center items-center w-10 h-10 bg-black/10 hover:bg-black/20 transition-colors duration-200 rounded-lg"
          onClick={toggleMobileMenu}
        >
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-white transition-colors duration-300 mt-1 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 mt-1 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40">
          <div className="absolute top-0 right-0 w-80 h-full bg-black/95 p-6 transform transition-transform duration-300">
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Mobile Navigation Links */}
            <div className="mt-16">
              <ul className="space-y-6">
                {navLinks.map((link) => (
                  <li key={link.nameKey}>
                    <Link
                      href={link.href}
                      scroll={true}
                      className="text-white text-xl font-poppins-regular hover:text-[#FF9641] transition-colors duration-200 flex items-center"
                      onClick={toggleMobileMenu}
                    >
                      {t(link.nameKey)}
                      {link.nameKey === "nav.services" && (
                        <Image
                          src="/circleDown.svg"
                          alt="Circle Down Icon"
                          width={18}
                          height={18}
                          className="ml-2"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile Get Quote Button */}
              <button className="w-full mt-8 bg-[#FF9641] text-white font-poppins-medium text-lg py-4 rounded-lg hover:bg-[#e88537] transition-colors duration-200">
                {t("header.getQuote")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(isLanguageDropdownOpen || isMobileMenuOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setIsLanguageDropdownOpen(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </header>
  );
}
