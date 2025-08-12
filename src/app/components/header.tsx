"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Schedule a call", href: "#schedule" },
  { name: "Contact", href: "#contact" },
];

const flagIcons: Record<"en" | "de", string> = {
  en: "/engFlag.png", // Place your UK flag image in public/uk-flag.png
  de: "/engFlag.png", // Place your German flag image in public/de-flag.png
};

export default function Header() {
  const [lang, setLang] = useState<"en" | "de">("en");
  return (
    <header className="w-full flex items-center px-8 py-3 bg-transparent relative z-10">
      <div className="flex items-center">
        <Image
          src="/mainLogo.png"
          alt="Aram Energy Solution Logo"
          width={168}
          height={98}
        />
      </div>
      <nav
        className="flex items-center gap-3 flex-1 justify-end"
        style={{
          fontFamily: "Poppins-Regular",
          fontSize: 16,
          fontWeight: 400,
        }}
      >
        <ul className="flex gap-8 list-none m-0 p-0 mr-10">
          {navLinks.map((link) => (
            <li key={link.name} className="flex items-center">
              <Link
                href={link.href}
                scroll={true}
                className="text-gray-100 px-2 py-1 rounded transition-colors duration-200 hover:text-orange-400 flex items-center"
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  fontWeight: 400,
                }}
              >
                {link.name}
                {link.name === "Services" && (
                  <Image
                    src="/circleDown.svg"
                    alt="Circle Down Icon"
                    width={18}
                    height={18}
                    style={{ marginLeft: 6 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
        <div
          className="ml-3 flex items-center justify-center relative"
          style={{
            width: 127,
            height: 48,
            borderRadius: 11,
            background: "rgba(0,0,0,0.11)",
            overflow: "hidden",
            fontFamily: "Poppins-Regular",
            fontSize: 16,
            fontWeight: 400,
          }}
        >
          <button
            className="flex items-center justify-between w-full h-full px-4 py-2 rounded-[11px] focus:outline-none"
            style={{
              background: "rgba(0,0,0,0.11)",
              color: "#fff",
              fontFamily: "Poppins-Regular",
              fontSize: 16,
              fontWeight: 400,
            }}
            type="button"
            onClick={() => {}}
          >
            <Image
              src={flagIcons[lang]}
              alt={lang === "en" ? "EN" : "DE"}
              width={29}
              height={29}
              style={{ borderRadius: "50%", marginRight: 8 }}
            />
            <span
              className="mx-2 text-white"
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 16,
                fontWeight: 400,
              }}
            >
              {lang === "en" ? "EN" : "DE"}
            </span>
            <svg
              width="8.5"
              height="8.5"
              viewBox="0 0 8.5 8.5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginLeft: 8 }}
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
          <select
            className="absolute text-white bg-black top-0 left-0 w-[127px] h-[48px] text-center cursor-pointer opacity-0"
            value={lang}
            onChange={(e) => setLang(e.target.value as "en" | "de")}
            style={{
              borderRadius: 11,
              fontFamily: "Poppins-Regular",
              fontSize: 16,
              fontWeight: 400,
            }}
          >
            <option value="en">EN</option>
            <option value="de">DE</option>
          </select>
        </div>
        <button
          className="flex items-center justify-center bg-brand-orange font-medium"
          style={{
            width: 233,
            height: 64,
            background: "#FF9641",
            color: "#fff",
            fontFamily: "Poppins-Medium",
            fontSize: 16,
            fontWeight: 400,
            marginLeft: 15,
          }}
        >
          Get a quote
        </button>
      </nav>
    </header>
  );
}
