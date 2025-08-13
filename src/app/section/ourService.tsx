import Image from "next/image";

export default function OurService() {
  return (
    <section className="w-full min-h-screen bg-black flex flex-col items-center py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-7xl flex flex-col gap-6 sm:gap-8 px-4 sm:px-6">
        {/* Top left heading and button */}
        <div className="flex flex-col sm:flex-row w-full items-start justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
          <div className="flex flex-col items-start">
            <div className="text-white font-inria-serif-bold text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">
              Our Services
            </div>
            <button className="flex items-center justify-between w-full sm:w-64 md:w-80 lg:w-[310px] h-12 sm:h-14 md:h-[65px] bg-[#FF9641] text-white font-inter text-base sm:text-lg font-normal border-none outline-none cursor-pointer px-6 sm:px-8 md:px-8 rounded-lg hover:bg-[#e88537] transition-colors duration-200">
              <span className="text-left flex-1">Arrange a call</span>
              <Image
                src="/whiteRightArrow.svg"
                alt="Right Arrow"
                width={28}
                height={28}
                className="w-6 h-6 sm:w-7 sm:h-7"
              />
            </button>
          </div>
        </div>
        {/* 3 image cards row */}
        <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center mt-6 sm:mt-8">
          {["Home Visit", "Telephone Appointment", "Online Meeting"].map(
            (label, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden flex flex-col items-start w-full sm:w-80 md:w-96 lg:w-[377px] h-[300px] sm:h-[400px] md:h-[511px] bg-gray-800 shadow-lg"
              >
                {/* Card image */}
                <Image
                  src={`/ourService-${i + 1}.png`}
                  alt={label}
                  fill
                  className="object-cover"
                />
                {/* Text above button, left-aligned */}
                <span className="absolute left-4 sm:left-6 md:left-8 bottom-16 sm:bottom-20 md:bottom-24 text-white font-inria-serif-regular text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-left z-10 tracking-wide">
                  {label}
                </span>
                {/* Book button inside card, left-aligned */}
                <button className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 flex items-center justify-between w-32 sm:w-40 md:w-48 lg:w-[200px] h-10 sm:h-12 md:h-12 bg-[#FF9641] text-white font-poppins text-sm sm:text-base md:text-lg font-semibold border-none outline-none cursor-pointer px-4 sm:px-6 md:px-6 rounded-lg hover:bg-[#e88537] transition-colors duration-200 shadow-lg z-10">
                  <span className="text-left flex-1">Book</span>
                  <Image
                    src="/whiteRightArrow.svg"
                    alt="Right Arrow"
                    width={22}
                    height={22}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
