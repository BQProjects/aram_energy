import Image from "next/image";
// import WideRangeScroll from "./WideRangeScroll";
import { useLanguage } from "../contexts/LanguageContext";

export default function WideRange() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/wideRange.png"
          alt="Wide Range Background"
          fill
          quality={100}
          className="object-cover"
        />
      </div>

      {/* Bottom content */}
      <div className="w-full flex flex-col items-start px-4 sm:px-6 md:px-8 lg:px-20 pb-6 sm:pb-8 md:pb-52 gap-5">
        <h2 className="font-inria-serif-bold text-2xl sm:text-3xl md:text-4xl text-[#FF9641]">
          {t("wideRange.title")}
        </h2>
        <div className="font-poppins-regular text-lg sm:text-xl md:text-xl text-white">
          {t("wideRange.subtitle")}
        </div>
        <button
          onClick={() => {
            window.location.hash = "#contact";
          }}
          className="flex items-center justify-between w-full sm:w-80 md:w-96 lg:w-[550px] h-12 sm:h-14 md:h-[55px] bg-[#FF9641] font-inter font-medium text-sm sm:text-base text-white border-none outline-none cursor-pointer px-6 sm:px-8 md:px-8 hover:bg-[#e88537] transition-colors duration-200 mt-6 mb-6"
        >
          <span className="text-left">{t("wideRange.cta")}</span>
          <Image
            src="/whiteRightArrow.svg"
            alt="Right Arrow"
            width={32}
            height={32}
            quality={100}
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8"
          />
        </button>
        <div className="font-poppins-regular text-base sm:text-lg md:text-xl text-white text-justify max-w-6xl pb-4">
          {t("wideRange.description")}
        </div>
      </div>
    </section>
  );

}
