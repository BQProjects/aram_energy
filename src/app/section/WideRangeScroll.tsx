import Image from "next/image";
import { useState, useEffect } from "react";

const features = [
  {
    heading: "Wide range conditions for all",
    desc: "through intelligent bundling",
  },
  {
    heading: "Reliable energy suppliers",
    desc: "e.g. Stadtwerke Duisburg AG",
  },
  {
    heading: "Personal support",
    desc: "fixed contact person instead of hotline",
  },
  {
    heading: "All-round service",
    desc: "We take care of the change of provider and all formalities",
  },
];

export default function WideRangeScroll() {
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
          setCurrent((prev) => (prev === features.length - 1 ? 0 : prev + 1));
          setAnimating(false);
        }, 500); // match animation duration
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [animating]);

  const prevSlide = () => {
    if (animating) return;
    setDirection("left");
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? features.length - 1 : prev - 1));
      setAnimating(false);
    }, 350);
  };

  const nextSlide = () => {
    if (animating) return;
    setDirection("right");
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev === features.length - 1 ? 0 : prev + 1));
      setAnimating(false);
    }, 350);
  };

  return (
    <section className="w-full flex items-center justify-center py-16 bg-[#0C0C0C]">
      <div className="w-full max-w-6xl mx-auto relative flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
          aria-label="Previous"
        >
          <Image
            src="/leftScroll.svg"
            alt="Scroll Left"
            width={22}
            height={15}
          />
        </button>

        {/* Text Content with animation */}
        <div className="text-left px-6 min-h-[180px] overflow-x-hidden">
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
            <h2
              style={{
                fontFamily: "InriaSerif-Bold",
                fontSize: "48px",
                fontWeight: 700,
                color: "#FF9641",
                marginBottom: "1rem",
              }}
            >
              {features[current].heading}
            </h2>
            <p
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: "32px",
                color: "#fff",
              }}
            >
              {features[current].desc}
            </p>
          </div>
          {/* Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {features.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === current ? "bg-gray-300" : "bg-gray-600"
                }`}
              ></span>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
          aria-label="Next"
        >
          <Image
            src="/rightScroll.svg"
            alt="Scroll Right"
            width={22}
            height={4150}
          />
        </button>
      </div>
    </section>
  );
}
