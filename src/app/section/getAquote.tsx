import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

export default function GetAquote() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src="/getAquote.png"
            alt="Get a quote background"
            fill
            quality={100}
            className="object-cover object-center"
          />
        </div>
        {/* Right-side overlay box */}
        <div className="flex w-full h-full">
          {/* Left empty space (40%) */}
          <div className="w-[40%] hidden md:block" />
          {/* Right content box (60%) */}
          <div className="w-full md:w-[60%] flex items-center min-h-[280px] sm:min-h-[320px] mr-1">
            <div className="w-full px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 bg-black/50 shadow-2xl mx-4 md:mx-0">
              <h2 className="font-inter-regular text-2xl sm:text-3xl md:text-4xl text-[#FF9641] mb-4 sm:mb-6 text-left">
                {t("getQuote.title")}
              </h2>
              <p className="font-poppins-regular text-base sm:text-lg  text-white text-left leading-relaxed">
                {t("getQuote.description")}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* New text section below image */}
      <section className="w-full flex bg-white items-start py-8 sm:py-10 md:py-12 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
        <div className="w-full max-w-6xl mx-14 text-justify px-4 sm:px-6 mt-14 mb-14">
          <h2 className="font-source-serif text-2xl sm:text-3xl md:text-3xl text-[#FF9641] text-left mb-3 sm:mb-4">
            <span className="font-semibold">
              {t("getQuote.referral.title")}
            </span>
            <br />
            <span className="font-source-serif font-normal md:text-2xl">
              {t("getQuote.referral.subtitle")}
            </span>
          </h2>
          <p className="font-ibm-plex-sans font-normal text-lg sm:text-xl md:text-xl text-gray-700 text-left mb-0 leading-relaxed mt-4">
            {t("getQuote.referral.description")}
          </p>
        </div>
      </section>
      {/* World image section with centered transparent container - Centered on image */}
      <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[800px] flex items-center justify-center mt-0  ">
        {/* Background world image */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src="/worldimage.png"
            alt="World Background"
            fill
            quality={100}
            className="object-fill object-center"
          />
        </div>
        {/* Cards half on image, half above */}
        <div className="absolute top-0 left-2/5 -translate-x-1/2 -translate-y-5/12 w-full max-w-4xl sm:max-w-5xl px-3 sm:px-4 md:px-6 lg:px-8 z-10 hidden sm:block">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-80">
            {/* Card 1 */}
            <div className="relative bg-black rounded-xl sm:rounded-2xl h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] xl:h-[260px] xl:w-[400px] flex flex-col justify-between p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg">
              {/* Top left icon */}
              <Image
                src="/orangeUserPlus.svg"
                alt="Recommend"
                width={60}
                height={60}
                quality={100}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-[60px] xl:h-[60px]"
              />
              {/* Top right number */}
              <span className="absolute top-1 sm:top-2 md:top-3 lg:top-4 right-1 sm:right-2 md:right-3 lg:right-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[80px] text-[#EBEEF7] font-normal font-inria-serif-regular leading-none">
                01
              </span>
              {/* Bottom center text */}
              <div className="flex flex-1 items-baseline justify-center">
                <span className="text-center mt-5 pb-2 sm:pb-3 md:pb-4 lg:pb-6 xl:pb-8 2xl:pb-14 text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-inria-serif-regular font-normal leading-tight">
                  {t("getQuote.step1")}
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative bg-black rounded-xl sm:rounded-2xl h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] xl:h-[260px] xl:w-[400px] flex flex-col justify-between p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg">
              <Image
                src="/orangeScript.svg"
                alt="Contract"
                width={60}
                height={60}
                quality={100}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-[60px] xl:h-[60px]"
              />
              <span className="absolute top-1 sm:top-2 md:top-3 lg:top-4 right-1 sm:right-2 md:right-3 lg:right-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[80px] text-[#EBEEF7] font-normal font-inria-serif-regular leading-none">
                02
              </span>
              <div className="flex flex-1 items-baseline justify-center">
                <span className="text-center mt-5 pb-2 sm:pb-3 md:pb-4 lg:pb-6 xl:pb-8 text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-inria-serif-regular font-normal leading-tight">
                  {t("getQuote.step2")}
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative bg-black rounded-xl sm:rounded-2xl h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] xl:h-[260px] xl:w-[400px] flex flex-col justify-between p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg sm:col-span-2 lg:col-span-1">
              <Image
                src="/orangeContainer.svg"
                alt="Bonus"
                width={60}
                height={60}
                quality={100}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-[60px] xl:h-[60px]"
              />
              <span className="absolute top-1 sm:top-2 md:top-3 lg:top-4 right-1 sm:right-2 md:right-3 lg:right-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[80px] text-[#EBEEF7] font-normal font-inria-serif-regular leading-none">
                03
              </span>
              <div className="flex flex-1 items-baseline justify-center">
                <span className="text-center mt-5 pb-2 sm:pb-3 md:pb-4 lg:pb-6 xl:pb-8 2xl:pb-12 text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-inria-serif-regular font-normal leading-tight">
                  {t("getQuote.step3")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
