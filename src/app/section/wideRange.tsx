import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";
import { useEffect, useState } from "react";

const featureKeys = [
  {
    heading: "wideRange.feature1.heading",
    desc: "wideRange.feature1.desc",
  },
  {
    heading: "wideRange.feature2.heading",
    desc: "wideRange.feature2.desc",
  },
  {
    heading: "wideRange.feature3.heading",
    desc: "wideRange.feature3.desc",
  },
  {
    heading: "wideRange.feature4.heading",
    desc: "wideRange.feature4.desc",
  },
];

export default function WideRange() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!animating) {
        setDirection("right");
        setAnimating(true);
        setTimeout(() => {
          setCurrent((prev) =>
            prev === featureKeys.length - 1 ? 0 : prev + 1
          );
          setAnimating(false);
        }, 600); // match animation duration
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [animating]);

  const prevSlide = () => {
    if (animating) return;
    setDirection("left");
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? featureKeys.length - 1 : prev - 1));
      setAnimating(false);
    }, 600);
  };

  const nextSlide = () => {
    if (animating) return;
    setDirection("right");
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev === featureKeys.length - 1 ? 0 : prev + 1));
      setAnimating(false);
    }, 600);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center md:justify-end">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/wideRange.png"
          alt="Wide Range Background"
          width={1920}
          height={1080}
          quality={100}
          className="object-contain w-full"
        />
      </div>

      {/* Bottom content */}
      <div className="w-full flex flex-col items-start px-4 sm:px-6 md:px-8 lg:px-20 pb-6 sm:pb-8 md:pb-16 gap-5 mt-80">
        <h2 className="font-quando text-2xl sm:text-3xl md:text-4xl text-[#FF9641]">
          {t("wideRange.title")}
        </h2>
        <div className="font-poppins-light text-lg sm:text-xl md:text-xl text-white">
          {t("wideRange.subtitle")}
        </div>
        <button
          onClick={() => {
            window.location.hash = "#contact";
          }}
          className="flex items-center justify-between w-full sm:w-80 md:w-96 lg:w-[550px] h-12 sm:h-14 md:h-[55px] bg-[#FF9641] font-poppins-light text-sm sm:text-base text-white border-none outline-none cursor-pointer px-6 sm:px-8 md:px-8 hover:bg-[#e88537] transition-colors duration-200 mt-6 mb-6"
        >
          <span className="text-left">{t("wideRange.cta")}</span>
          <Image
            src="/whiteRightArrow.svg"
            alt="Right Arrow"
            width={32}
            height={32}
            quality={100}
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-6 md:h-6"
          />
        </button>
        <div className="font-poppins-light text-base sm:text-lg md:text-lg text-white text-justify max-w-6xl pb-4">
          {t("wideRange.description")}
        </div>
      </div>
      <section className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center w-[1024px] h-[375px] bg-[#0C0C0C] shadow-lg relative">
          {/* Text Content with animation */}
          <div className="flex flex-col justify-evenly w-full h-full px-0">
            <div
              className={`transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] transform
                ${
                  animating
                    ? direction === "right"
                      ? "translate-x-full opacity-0"
                      : "-translate-x-full opacity-0"
                    : "translate-x-0 opacity-100"
                }
              `}
              key={current}
            >
              <div className="pl-10">
                <h2 className="font-quando text-4xl md:text-4xl font-bold text-[#FF9641] mb-8 text-left">
                  {t(featureKeys[current].heading)}
                </h2>
                <p className="font-poppins-light text-2xl md:text-2xl text-white text-left ">
                  {t(featureKeys[current].desc)}
                </p>
              </div>
            </div>

            {/* Controls Row: Left Arrow, Dots, Right Arrow */}
            <div className="flex items-center w-full px-8 gap-0 justify-between left-0 right-0 bottom-6 z-10">
              {/* Left Arrow */}
              <button
                onClick={prevSlide}
                className="flex hover:opacity-80 transition-opacity justify-start"
                aria-label="Previous"
              >
                <Image
                  src="/leftScroll.svg"
                  alt="Scroll Left"
                  width={22}
                  height={15}
                  quality={100}
                  className="w-7 h-7"
                />
              </button>
              {/* Dots */}
              <div className="flex justify-center gap-3 flex-1">
                {featureKeys.map((_, idx) => (
                  <button
                    key={idx}
                    className={`transition-all duration-300 rounded-full focus:outline-none
                          ${
                            idx === current
                              ? "w-4 h-4 bg-gray-300"
                              : "w-3 h-3 bg-gray-600"
                          }
                        `}
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => {
                      if (animating || idx === current) return;
                      setDirection(idx > current ? "right" : "left");
                      setAnimating(true);
                      setTimeout(() => {
                        setCurrent(idx);
                        setAnimating(false);
                      }, 600);
                    }}
                    type="button"
                  ></button>
                ))}
              </div>
              {/* Right Arrow */}
              <button
                onClick={nextSlide}
                className="flex hover:opacity-80 transition-opacity justify-end"
                aria-label="Next"
              >
                <Image
                  src="/rightScroll.svg"
                  alt="Scroll Right"
                  width={22}
                  height={15}
                  quality={100}
                  className="w-7 h-7"
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
