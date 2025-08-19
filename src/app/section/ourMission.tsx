/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

export default function OurMission() {
  const { t } = useLanguage();

  const features = [
    {
      title: t("mission.transparentPricing"),
      desc: t("mission.transparentPricingDesc"),
    },
    {
      title: t("mission.sustainableEnergy"),
      desc: t("mission.sustainableEnergyDesc"),
    },
    {
      title: t("mission.fastSwitching"),
      desc: t("mission.fastSwitchingDesc"),
    },
    {
      title: t("mission.customerSatisfaction"),
      desc: t("mission.customerSatisfactionDesc"),
    },
  ];

  return (
    <section className="w-full bg-black flex flex-col lg:flex-row items-stretch justify-evenly px-4 sm:px-4 md:px-8 pt-10 pb-10 sm:pt-20 sm:pb-20 gap-10 sm:gap-0">
      <div className="flex flex-col justify-evenly bg-black px-2 sm:px-6 lg:px-16 py-4 sm:py-6 gap-10 sm:gap-7 w-full lg:w-1/2 ">
        <div>
          <h2 className="font-inria-serif-bold text-2xl sm:text-3xl md:text-3xl text-white mb-6 sm:mb-8">
            {t("mission.title")}
          </h2>
          <div className="flex flex-col gap-8 sm:gap-8">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="flex items-start gap-4 sm:gap-5 py-2 sm:py-0"
              >
                <div>
                  <Image
                    src="/orangeTick.svg"
                    alt="Tick Icon"
                    width={24}
                    height={24}
                    quality={100}
                  />
                </div>
                <div>
                  <div className="font-inria-serif-bold text-base sm:text-base text-[#F9FAFB] mb-1">
                    {f.title}
                  </div>
                  <div className="font-poppins-regular text-sm sm:text-sm text-[#9CA3AF]">
                    {f.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Button at bottom */}
        <div className="mt-10 sm:mt-10 flex items-center">
          <button
            onClick={() => {
              window.location.hash = "#Calculate";
            }}
            className="flex items-center justify-between w-full sm:w-80 md:w-96 h-14 md:h-16 bg-white font-inter font-medium text-base md:text-lg text-[#FF9641] border-none outline-none cursor-pointer px-4 sm:px-6 hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="font-inter-regular">{t("header.getQuote")}</span>
            <span className="flex items-center gap-2">
              <Image
                src="/rightArrow.svg"
                alt="Right Arrow"
                width={24}
                height={24}
                quality={100}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Right: image */}
      <div className="w-full lg:w-1/2 flex items-center justify-center mt-8 lg:mt-0">
        <Image
          src="/ourMission.png"
          alt="Mission Section Image"
          width={697}
          height={533}
          quality={100}
          className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none h-auto rounded-md object-cover pr-0 lg:pr-7"
        />
      </div>
    </section>
  );
}
