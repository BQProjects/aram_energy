import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="w-full flex flex-col items-center justify-center"
    >
      {/* Top 25% black section */}
      <div className="w-full flex items-center bg-black h-24 sm:h-32 md:h-40 lg:h-48 xl:h-52 min-h-[120px] sm:min-h-[150px] md:min-h-[180px]">
        <span className="ml-3 sm:ml-4 md:ml-6 lg:ml-8 text-[#FF9641] font-quando text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal tracking-wide px-2">
          {t('about.title')}
        </span>
      </div>
      {/* Bottom white section */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center bg-white py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-16 min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
        {/* Image on left */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 lg:mb-0 lg:mr-8 xl:mr-12 w-full lg:w-auto">
          <Image
            src="/aboutimage.png"
            alt="About Section Image"
            width={735}
            height={458}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-none lg:w-[735px] h-auto rounded-2xl object-cover shadow-lg"
          />
        </div>
        {/* Right: 3 paragraphs with icon circles */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 max-w-xl w-full px-2 sm:px-4">
          {/* 1st para */}
          <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[85px] lg:h-16 rounded-full bg-[#F2F2F2] flex-shrink-0 mt-1">
              <Image
                src="/ribbon.svg"
                alt="Ribbon Icon"
                width={18}
                height={24}
                className="object-contain w-4 h-5 sm:w-5 sm:h-6 md:w-6 md:h-8 lg:w-[18px] lg:h-[24px]"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-poppins-regular text-sm sm:text-base md:text-lg font-medium text-[#171717] leading-relaxed">
                <span className="text-lg sm:text-xl md:text-2xl font-bold block font-inria-serif-bold mb-1 sm:mb-2">
                  {t('about.affordableRates')}
                </span>
                {t('about.affordableRatesDesc')}
              </span>
            </div>
          </div>
          {/* 2nd para */}
          <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-16 md:h-16 rounded-full bg-[#F2F2F2] flex-shrink-0 mt-1">
              <Image
                src="/personcheck.svg"
                alt="Personcheck Icon"
                width={30}
                height={24}
                className="object-contain w-5 h-4 sm:w-6 sm:h-5 md:w-7 md:h-6 lg:w-[30px] lg:h-[24px]"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-poppins-regular text-sm sm:text-base md:text-lg font-medium text-[#171717] leading-relaxed">
                <span className="text-lg sm:text-xl md:text-2xl font-bold block font-inria-serif-bold mb-1 sm:mb-2">
                  {t('about.contactPerson')}
                </span>
                {t('about.contactPersonDesc')}
              </span>
            </div>
          </div>
          {/* 3rd para */}
          <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-16 md:h-16 rounded-full bg-[#F2F2F2] flex-shrink-0 mt-1">
              <Image
                src="/clock.svg"
                alt="Clock Icon"
                width={24}
                height={24}
                className="object-contain w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-[24px] lg:h-[24px]"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-poppins-regular text-sm sm:text-base md:text-lg font-medium text-[#171717] leading-relaxed">
                <span className="text-lg sm:text-xl md:text-2xl font-bold block font-inria-serif-bold mb-1 sm:mb-2">
                  {t('about.reliablePartner')}
                </span>
                {t('about.reliablePartnerDesc')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
