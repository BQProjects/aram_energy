import React from "react";
import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

export default function HowItWorkSection() {
  const { t } = useLanguage();

  return (
    <div className="bg-cover bg-center min-h-screen p-0 m-0 w-full" style={{ backgroundImage: "url('/howItWork.png')" }}>
      <div className="max-w-6xl mx-auto pt-12 sm:pt-16 md:pt-20 lg:pt-[60px] px-4 sm:px-6 md:px-8 lg:px-24 flex flex-col items-center sm:items-start">
        {/* Top Left Texts */}
        <div className="text-[#FF9641] font-poppins-medium text-lg sm:text-xl md:text-2xl font-normal mb-3 text-center sm:text-left">
          {t('howItWorks.interested')}
        </div>
        <div className="text-white font-inria-serif-regular text-2xl sm:text-3xl md:text-4xl font-normal mb-4 sm:mb-5 text-center sm:text-left">
          {t('howItWorks.solarEnergy')}
        </div>
        <div className="text-white font-inria-serif-regular text-base sm:text-lg md:text-xl font-normal mb-6 sm:mb-7 leading-relaxed max-w-4xl text-center sm:text-left">
          {t('howItWorks.description')}
        </div>
        <div className="text-[#FF9641] font-inria-serif-bold text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center sm:text-left">
          {t('howItWorks.title')}:
        </div>

        {/* SVG Row - Centered column on mobile, row on larger screens */}
        <div className="flex flex-col sm:flex-row mb-12 sm:mb-16 md:mb-20 lg:mb-[60px] w-full justify-center sm:justify-evenly items-center sm:items-start gap-8 sm:gap-6 md:gap-8">
          <div className="flex flex-col items-center flex-1 min-w-0 max-w-[280px] sm:max-w-none">
            <Image
              src="/GetInstantOffer.svg"
              alt="Step 1"
              width={100}
              height={100}
              className="w-20 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[100px] lg:h-[100px] max-w-full h-auto"
              priority
            />
            <span className="text-gray-300 font-poppins-light text-sm sm:text-sm mt-3 sm:mt-2 text-center max-w-[280px] sm:max-w-[320px] block">
              {t('howItWorks.step1')}
            </span>
          </div>
          <div className="flex flex-col items-center flex-1 min-w-0 max-w-[280px] sm:max-w-none">
            <Image
              src="/GetInstantOffer-1.svg"
              alt="Step 2"
              width={100}
              height={100}
              className="w-20 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[100px] lg:h-[100px] max-w-full h-auto"
              priority
            />
            <span className="text-gray-300 font-poppins-light text-sm sm:text-sm mt-3 sm:mt-2 text-center max-w-[280px] sm:max-w-[320px] block">
              {t('howItWorks.step2')}
            </span>
          </div>
          <div className="flex flex-col items-center flex-1 min-w-0 max-w-[280px] sm:max-w-none">
            <Image
              src="/GetInstantOffer-2.svg"
              alt="Step 3"
              width={100}
              height={100}
              className="w-20 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[100px] lg:h-[100px] max-w-full h-auto"
              priority
            />
            <span className="text-gray-300 font-poppins-light text-sm sm:text-sm mt-3 sm:mt-2 text-center max-w-[280px] sm:max-w-[320px] block">
              {t('howItWorks.step3')}
            </span>
          </div>
          <div className="flex flex-col items-center flex-1 min-w-0 max-w-[280px] sm:max-w-none">
            <Image
              src="/GetInstantOffer-3.svg"
              alt="Step 4"
              width={100}
              height={100}
              className="w-20 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[100px] lg:h-[100px] max-w-full h-auto"
              priority
            />
            <span className="text-gray-300 font-poppins-light text-sm sm:text-sm mt-3 sm:mt-2 text-center max-w-[280px] sm:max-w-[320px] block">
              {t('howItWorks.step4')}
            </span>
          </div>
        </div>
      </div>
      {/* Bottom Centered Text */}
      <div className="w-full text-center mt-8 sm:mt-10 md:mt-12 lg:mt-10 mb-8 sm:mb-10 md:mb-12 lg:mb-10 pb-16 sm:pb-20 md:pb-24 lg:pb-20">
        <span className="text-[#E7EBF3] font-inria-serif-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl inline-block max-w-4xl px-4">
          {t('howItWorks.cta')}
        </span>
      </div>
    </div>
  );
}
