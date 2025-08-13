"use client";
import Header from "./components/header";
import CalculationTarif from "./components/calculationTarif";
import Footer from "./components/footer";
import AboutSection from "./section/aboutSection";
import OurMission from "./section/ourMission";
import WideRange from "./section/wideRange";
import WideRangeScroll from "./section/WideRangeScroll";
import GetAquote from "./section/getAquote";
import HowItWorkSection from "./section/howItWork";
import WhatisSub from "./section/whatisSub";
import OurService from "./section/ourService";
import OurPartner from "./section/ourPartner";
import GetInTouch from "./section/getInTouch";
import VideoSection from "./section/video";

export default function Home() {
  return (
    <div>
      <div
        className="min-h-screen w-full flex flex-col bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: "url(/homebg.png)" }}
      >
        <Header />
        <div className="flex-1 flex flex-col justify-start items-center pt-4 sm:pt-6 md:pt-8 lg:pt-2 px-4 sm:px-6 md:px-8">
          <h2 className="text-center font-normal text-white font-quando text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight px-2">
            Welcome
          </h2>
          <h1 className="text-center font-normal font-quando text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-[#FF9641] mt-2 sm:mt-3 md:mt-4 px-2">
            Aram Energy Solution
          </h1>
          <button className="mt-4 sm:mt-5 md:mt-6 lg:mt-5 flex items-center justify-center rounded-[11px] w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-48 h-12 sm:h-14 md:h-16 lg:h-16 bg-white text-[#FF9641] font-inter text-base sm:text-lg font-medium hover:bg-gray-50 transition-colors duration-200 px-6 py-3 shadow-lg">
            Learn more
          </button>
          <div className="w-full max-w-4xl mt-4 sm:mt-6 md:mt-8">
            <CalculationTarif />
          </div>
        </div>
      </div>
      <AboutSection />
      <OurMission />
      <WideRange />
      <WideRangeScroll />
      <GetAquote />
      <HowItWorkSection />
      <VideoSection />
      <WhatisSub />
      <OurService />
      <OurPartner />
      <GetInTouch />
      {/* Footer */}
      <Footer />
    </div>
  );
}
