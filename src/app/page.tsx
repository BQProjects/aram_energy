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
        className="min-h-screen w-full flex flex-col bg-cover bg-no-repeat"
        style={{ backgroundImage: "url(/homebg.png)" }}
      >
        <Header />
        <div className="flex-1 flex flex-col justify-start items-center pt-2">
          <h2
            className="text-center font-normal text-white font-quando"
            style={{
              fontSize: 50,
              fontWeight: 500,
            }}
          >
            Welcome
          </h2>
          <h1
            className="text-center font-normal font-quando"
            style={{
              color: "#FF9641",
              fontSize: 50,
              fontWeight: 500,
            }}
          >
            Aram Energy Solution
          </h1>
          <button
            className="mt-5 flex items-center justify-center rounded-[11px]"
            style={{
              width: 196,
              height: 64,
              background: "#fff",
              color: "#FF9641",
              fontFamily: "Inter, sans-serif",
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Learn more
          </button>
          <CalculationTarif />
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
