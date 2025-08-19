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

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleLanguageDropdown = () =>
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);

  const handleLanguageChange = (newLang: "en" | "de") => {
    setLanguage(newLang);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <header className="w-full px-7 sm:px-10 md:px-16 py-3 bg-transparent relative z-10">
      <div className="flex items-center justify-between w-full">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Image
            src="/AramLogo1.svg"
            alt="Aram Energy Solution Logo"
            width={188}
            height={118}
            className="w-28 h-16 sm:w-32 sm:h-20 md:w-[145px] md:h-[120px]"
          />
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center ml-48">
          <ul className="flex gap-6 xl:gap-4 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.nameKey} className="flex items-center">
                <Link
                  href={link.href}
                  scroll={true}
                  className="group text-[#F9FAFB] px-3 py-1 rounded transition-colors duration-200 hover:text-orange-400 hover:font-light flex items-center font-poppins-light text-base font-regular"
                >
                  {t(link.nameKey)}
                  {link.nameKey === "nav.services" && (
                    <span className="ml-1.5 flex items-center">
                      <svg
                        width={18}
                        height={18}
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-colors duration-200 group-hover:text-orange-400 text-[#F9FAFB]"
                      >
                        <path d="M9 13L4 8H14L9 13Z" fill="currentColor" />
                      </svg>
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Language Selector & Get Quote */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Language Selector */}
          <div className="flex items-center justify-center relative">
            <div className="dropdown inline-block relative">
              <button
                className="flex items-center justify-center w-24 sm:w-28 h-10 bg-black/10 hover:bg-black/20 transition-colors duration-200 focus:outline-none border border-transparent hover:border-black focus:border-black"
                onClick={toggleLanguageDropdown}
                aria-haspopup="true"
                aria-expanded={isLanguageDropdownOpen}
                tabIndex={0}
                type="button"
              >
                <Image
                  src={flagIcons[language]}
                  alt={languages[language].name}
                  width={20}
                  height={20}
                  quality={100}
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
              <div
                className={`origin-top-right absolute top-full right-0 min-w-full shadow-lg border border-gray-700 bg-black/90 backdrop-blur-sm z-50 transition-all duration-200 ${
                  isLanguageDropdownOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
                role="menu"
                aria-orientation="vertical"
                tabIndex={-1}
              >
                {Object.entries(languages).map(([code, langData]) => (
                  <button
                    key={code}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-white/10 transition-colors duration-200 ${
                      language === code ? "bg-[#FF9641]" : ""
                    }`}
                    onClick={() => handleLanguageChange(code as "en" | "de")}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <Image
                      src={langData.flag}
                      alt={langData.name}
                      width={20}
                      height={20}
                      quality={100}
                      className="rounded-full mr-2"
                    />
                    <span className="mx-1 sm:mx-2 text-white font-poppins-regular text-base font-normal">
                      {langData.name === "English" ? "EN" : "DE"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Get Quote Button */}
          <button
            onClick={() => {
              window.location.hash = "#Calculate";
            }}
            className="flex items-center justify-center bg-[#FF9641] text-white font-poppins-light text-base w-28 sm:w-36 md:w-50 h-11 md:h-14 relative overflow-hidden group transition-colors duration-300"
          >
            <span className="relative z-10 duration-300 group-hover:text-[#FF9641] transition-transform group-hover:translate-x-1">
              {t("header.getQuote")}
            </span>
            <span className="absolute left-0 top-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></span>
          </button>
        </div>

        {/* Mobile Right Side */}
        <div className="lg:hidden flex items-center gap-3 ml-auto">
          {/* Language Selector (Mobile) */}
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
                quality={100}
                className="rounded-full mr-1"
              />
              <span className="text-white font-poppins-regular text-sm">
                {languages[language].name === "English" ? "EN" : "DE"}
              </span>
            </button>

            {isLanguageDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 bg-black/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 min-w-[120px] z-50">
                {Object.entries(languages).map(([code, langData]) => (
                  <button
                    key={code}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-white/10 transition-colors duration-200 ${
                      language === code ? "bg-[#FF9641]" : ""
                    }`}
                    onClick={() => handleLanguageChange(code as "en" | "de")}
                  >
                    <Image
                      src={langData.flag}
                      alt={langData.name}
                      width={20}
                      height={20}
                      quality={100}
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
                          quality={100}
                          className="ml-2"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile Get Quote Button */}
              <button
                onClick={() => {
                  window.location.hash = "#Calculate";
                }}
                className="w-full mt-8 bg-[#FF9641] text-white font-poppins-medium text-lg py-4 rounded-lg hover:bg-[#e88537] transition-colors duration-200"
              >
                {t("header.getQuote")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
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
