import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";
import { useEffect, useState } from "react";

export default function WhatisSub() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("submetering-cards");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);
  const cards = [
    {
      svg: "/sub1.svg",
      title: t("submetering.card1.title"),
      para: t("submetering.card1.para"),
    },
    {
      svg: "/sub2.svg",
      title: t("submetering.card2.title"),
      para: t("submetering.card2.para"),
    },
    {
      svg: "/sub3.svg",
      title: t("submetering.card3.title"),
      para: t("submetering.card3.para"),
    },
  ];
  return (
    <section className="w-full min-h-screen bg-white flex flex-col items-center py-8 sm:py-12 md:py-28">
      <div className="w-full max-w-11/12 flex flex-col">
        {/* Top row: left heading, right button */}
        <div className="flex flex-col sm:flex-row w-full items-start justify-between mb-6 sm:mb-8 gap-4 sm:gap-0 px-4">
          <div className="flex flex-col items-start min-w-[280px] sm:min-w-[340px]">
            <div className="text-[#FF9641] font-poppins-light text-lg sm:text-2xl md:text-xl mb-3">
              {t("submetering.heading")}
            </div>
            <div className="text-[#111827] font-quando text-2xl sm:text-3xl md:text-3xl mb-0">
              {t("submetering.title")}
            </div>
          </div>
          <button
            onClick={() => {
              window.location.hash = "#Calculate";
            }}
            className="flex items-center justify-between w-full sm:w-64 md:w-80 lg:w-[280px] h-12 sm:h-14 md:h-[60px] bg-[#FF9641] text-white font-poppins-light text-lg sm:text-xl border-none outline-none cursor-pointer px-6 sm:px-8 md:px-8 relative overflow-hidden group transition-colors duration-300"
          >
            <span className="text-left flex-1 relative z-10 duration-300 group-hover:text-[#FF9641] transition-transform group-hover:translate-x-1">
              {t("submetering.button")}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 sm:w-6 sm:h-6 relative z-10 duration-300 transition-all group-hover:translate-x-1 text-white group-hover:text-[#FF9641]"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            <span className="absolute left-0 top-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></span>
          </button>
        </div>
        {/* Cards row: centered below button */}
        <div
          id="submetering-cards"
          className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-6 sm:mb-8"
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className={`rounded flex flex-col justify-between items-start px-4 sm:px-6 py-4 sm:py-6 bg-black w-full sm:w-80 md:w-96 lg:w-[380px] h-[180px] sm:h-[200px] min-w-[400px] shadow-lg cursor-pointer group transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex flex-row items-center gap-3 mb-2">
                <div className="relative overflow-hidden rounded-full p-2 group-hover:bg-orange-500/20 transition-colors duration-300">
                  <Image
                    src={card.svg}
                    alt={card.title}
                    width={48}
                    height={48}
                    quality={100}
                    className="w-10 h-10 sm:w-12 sm:h-12 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"
                  />
                </div>
                <span className="text-[#FFFFFF] font-quando text-sm sm:text-sm text-left group-hover:text-[#FF9641] transition-colors duration-300">
                  {card.title}
                </span>
              </div>
              <p className="text-[#D1D5DB] pt-4 font-poppins-light text-sm sm:text-sm text-justify flex flex-1 items-baseline justify-center group-hover:text-gray-100 transition-colors duration-300">
                {card.para}
              </p>
              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF9641] to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
      {/* Info text below cards */}
      <div className=" w-11/12 flex flex-col items-start mt-8 sm:mt-12 px-4 sm:px-4">
        <div className="text-[#FF9641] font-poppins-light text-lg sm:text-2xl md:text-xl mb-3">
          {t("submetering.whoCanUse")}
        </div>
        <div className="text-[#111827] font-quando text-2xl sm:text-3xl md:text-3xl mb-0">
          {t("submetering.whoCanUseDesc")}
        </div>
      </div>
    </section>
  );
}
