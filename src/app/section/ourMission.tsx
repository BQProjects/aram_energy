import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

export default function OurMission() {
  const { t } = useLanguage();

  const features = [
    {
      title: t('mission.transparentPricing'),
      desc: t('mission.transparentPricingDesc'),
    },
    {
      title: t('mission.sustainableEnergy'),
      desc: t('mission.sustainableEnergyDesc'),
    },
    {
      title: t('mission.fastSwitching'),
      desc: t('mission.fastSwitchingDesc'),
    },
    {
      title: t('mission.customerSatisfaction'),
      desc: t('mission.customerSatisfactionDesc'),
    },
  ];

  return (
    <section className="w-full bg-black flex flex-col lg:flex-row items-stretch justify-center">
      {/* Left: black background, heading, features, button */}
      <div className="flex flex-col justify-between bg-black py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-12 w-full lg:w-5/12 min-h-[500px] sm:min-h-[600px] ml-0 sm:ml-4 md:ml-10 min-w-[320px] sm:min-w-[400px]">
        <div>
          <h2 className="font-inria-serif-bold text-2xl sm:text-3xl md:text-4xl text-white mb-6 sm:mb-8">
            {t("mission.title")}
          </h2>
          <div className="flex flex-col gap-6 sm:gap-8">
            {features.map((f, i) => (
              <div key={f.title} className="flex items-start gap-4 sm:gap-5">
                <div>
                  <Image
                    src="/orangeTick.svg"
                    alt="Tick Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <div className="font-inria-serif-bold text-base sm:text-lg text-white mb-1">
                    {f.title}
                  </div>
                  <div className="font-poppins text-sm sm:text-base font-normal text-gray-400">
                    {f.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Button at bottom */}
        <div className="mt-8 sm:mt-12 flex items-center">
          <button className="flex items-center justify-between w-full sm:w-80 md:w-96 h-14 md:h-16 bg-white font-inter font-medium text-base md:text-lg text-[#FF9641] border-none outline-none cursor-pointer px-4 sm:px-6 hover:bg-gray-50 transition-colors duration-200">
            <span className="font-semibold">{t("header.getQuote")}</span>
            <span className="flex items-center gap-2">
              <Image
                src="/rightarrow.svg"
                alt="Right Arrow"
                width={24}
                height={24}
              />
            </span>
          </button>
        </div>
      </div>
      {/* Right: image */}
      <div className="flex items-center justify-center bg-black w-full lg:w-1/2 py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-12">
        <Image
          src="/ourMission.png"
          alt="Mission Section Image"
          width={697}
          height={533}
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none lg:w-[697px] h-auto rounded-2xl object-cover"
        />
      </div>
    </section>
  );
}
