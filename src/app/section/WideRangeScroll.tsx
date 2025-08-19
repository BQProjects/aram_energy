import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

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

export default function WideRangeScroll() {
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
    <section className="w-full flex items-center justify-center py-8 sm:py-12 md:py-1">
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
                    ${idx === current ? "w-4 h-4 bg-gray-300" : "w-3 h-3 bg-gray-600"}
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
  );
}
