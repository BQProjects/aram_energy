"use client";
import Header from "./components/header";
import CalculationTarif from "./components/calculationTarif";
import Footer from "./components/footer";
import AboutSection from "./section/aboutSection";
import OurMission from "./section/ourMission";
import WideRange from "./section/wideRange";
// import WideRangeScroll from "./section/WideRangeScroll";
import GetAquote from "./section/getAquote";
import HowItWorkSection from "./section/howItWork";
import WhatisSub from "./section/whatisSub";
import OurService from "./section/ourService";
import OurPartner from "./section/ourPartner";
import GetInTouch from "./section/getInTouch";
import VideoSection from "./section/video";
import { useLanguage } from "./contexts/LanguageContext";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div>
      <div className="relative min-h-screen w-full flex flex-col">
        {/* High-quality background image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/homebg.png"
            alt="Home Background"
            width={1920}
            height={1080}
            quality={100}
            className="object-cover w-full h-full"
          />
        </div>
        <Header />
        <motion.div
          className="flex-1 flex flex-col justify-start items-center pt-4 sm:pt-6 md:pt-8 lg:pt-2 px-4 sm:px-6 md:px-8 pb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-center mt-24 text-[#E5E7EB] font-quando text-2xl sm:text-3xl md:text-6xl lg:text-6xl font-medium leading-tight px-2"
            variants={itemVariants}
          >
            {t("hero.welcome")}
          </motion.h2>
          <motion.h1
            className="text-center font-quando text-2xl sm:text-3xl md:text-6xl lg:text-6xl font-medium leading-tight text-[#FF9641] mt-2 sm:mt-3 md:mt-4 px-2"
            variants={itemVariants}
          >
            {t("hero.title")}
          </motion.h1>
          <motion.button
            onClick={() => {
              window.location.hash = "#about";
            }}
            className="mt-4 sm:mt-5 md:mt-6 lg:mt-10 flex items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-50 h-12 sm:h-14 md:h-16 lg:h-14 bg-white text-[#FF9641] font-poppins-light text-base sm:text-lg  px-6 py-3 shadow-lg relative overflow-hidden group transition-colors duration-300"
            variants={itemVariants}
          >
            <span className="relative z-10 duration-300 group-hover:text-white transition-transform group-hover:translate-x-1">
              {t("hero.learnMore")}
            </span>
            <span className="absolute left-0 top-0 w-full h-full bg-[#FF9641] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></span>
          </motion.button>
          <motion.h1
            className="text-center font-poppins-light text-2xl sm:text-2xl md:text-2xl lg:text-xl text-[#F9FAFB] mt-2 sm:mt-3 md:mt-10 px-2"
            variants={itemVariants}
          >
            {t("hero.description")}
          </motion.h1>
          <motion.div
            id="Calculate"
            className="w-full max-w-5xl mt-4 sm:mt-6 md:mt-2"
            variants={itemVariants}
          >
            <CalculationTarif />
          </motion.div>
        </motion.div>
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <OurMission />
      <WideRange />
      {/* <WideRangeScroll /> */}
      <GetAquote />
      <HowItWorkSection />
      <VideoSection />
      <WhatisSub />
      <div id="services">
        <OurService />
      </div>
      <OurPartner />
      <div id="contact">
        <GetInTouch />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
