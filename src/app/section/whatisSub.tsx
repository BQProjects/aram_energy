import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

export default function WhatisSub() {
  const { t } = useLanguage();
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
            <div className="text-[#FF9641] font-quando text-lg sm:text-2xl md:text-xl mb-3">
              {t("submetering.heading")}
            </div>
            <div className="text-[#111827] font-poppins-light text-2xl sm:text-3xl md:text-3xl mb-0">
              {t("submetering.title")}
            </div>
          </div>
          <button
            onClick={() => {
              window.location.hash = "#Calculate";
            }}
            className="flex items-center justify-between w-full sm:w-64 md:w-80 lg:w-[280px] h-12 sm:h-14 md:h-[60px] bg-[#FF9641] text-white font-poppins-light text-lg sm:text-xl border-none outline-none cursor-pointer px-6 sm:px-8 md:px-8 hover:bg-[#e88537] transition-colors duration-200"
          >
            <span className="text-left flex-1">{t("submetering.button")}</span>
            <Image
              src="/whiteRightArrow.svg"
              alt="Right Arrow"
              width={18}
              height={18}
              quality={100}
              className="w-6 h-6 sm:w-6 sm:h-6"
            />
          </button>
        </div>
        {/* Cards row: centered below button */}
        <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-6 sm:mb-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className="rounded-2xl flex flex-col justify-between items-start px-4 sm:px-6 py-4 sm:py-6 bg-black w-full sm:w-80 md:w-96 lg:w-[380px] h-[180px] sm:h-[200px] min-w-[400px] shadow-lg"
            >
              <div className="flex flex-row items-center gap-3 mb-2">
                <Image
                  src={card.svg}
                  alt={card.title}
                  width={48}
                  height={48}
                  quality={100}
                  className="w-10 h-10 sm:w-12 sm:h-12"
                />
                <span className="text-[#FFFFFF] font-quando text-sm sm:text-sm text-left">
                  {card.title}
                </span>
              </div>
              <p className="text-[#D1D5DB] pt-4 font-poppins-light text-sm sm:text-sm text-justify flex flex-1 items-baseline justify-center">
                {card.para}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Info text below cards */}
      <div className=" w-11/12 flex flex-col items-start mt-8 sm:mt-12 px-4 sm:px-4">
        <div className="text-[#FF9641] font-quando text-lg sm:text-2xl md:text-xl mb-3">
          {t("submetering.whoCanUse")}
        </div>
        <div className="text-[#111827] font-poppins-light text-2xl sm:text-3xl md:text-3xl mb-0">
          {t("submetering.whoCanUseDesc")}
        </div>
      </div>
    </section>
  );
}
