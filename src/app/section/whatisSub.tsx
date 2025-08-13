import Image from "next/image";

export default function WhatisSub() {
  return (
    <section className="w-full min-h-screen bg-white flex flex-col items-center py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-6xl flex flex-col gap-6 sm:gap-8 px-4 sm:px-6">
        {/* Top row: left heading, right button */}
        <div className="flex flex-col sm:flex-row w-full items-start justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
          <div className="flex flex-col items-start min-w-[280px] sm:min-w-[340px]">
            <div className="text-[#FF9641] font-poppins-regular text-lg sm:text-xl md:text-2xl font-bold mb-3">
              Submetering
            </div>
            <div className="text-[#111] font-inria-serif-bold text-2xl sm:text-3xl md:text-4xl mb-0">
              What is submetering?
            </div>
          </div>
          <button className="flex items-center justify-between w-full sm:w-64 md:w-80 lg:w-[280px] h-12 sm:h-14 md:h-[60px] bg-[#FF9641] text-white font-poppins text-lg sm:text-xl font-semibold border-none outline-none cursor-pointer px-6 sm:px-8 md:px-8 rounded-lg hover:bg-[#e88537] transition-colors duration-200">
            <span className="text-left flex-1">Click to start</span>
            <Image
              src="/whiteRightArrow.svg"
              alt="Right Arrow"
              width={28}
              height={28}
              className="w-6 h-6 sm:w-7 sm:h-7"
            />
          </button>
        </div>
        {/* Cards row: centered below button */}
        <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-6 sm:mb-8">
          {[
            {
              svg: "/sub1.svg",
              title: "Transparent consumption thanks to submetering",
              para: "Submetering is the individual recording of consumption of resources such as water, heat or electricity in multi-unit buildings.",
            },
            {
              svg: "/sub2.svg",
              title: "Pay fairly – only what you use",
              para: "It enables fair and transparent billing, as each user only pays for what they actually consume.",
            },
            {
              svg: "/sub3.svg",
              title: "Save energy, reduce costs",
              para: "This promotes energy efficiency and cost savings.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="rounded-2xl flex flex-col justify-between items-start px-4 sm:px-6 py-4 sm:py-6 bg-black w-full sm:w-80 md:w-96 lg:w-[380px] h-[180px] sm:h-[200px] min-w-[220px] shadow-lg"
            >
              <div className="flex flex-row items-center gap-3 mb-2">
                <Image src={card.svg} alt={card.title} width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12" />
                <span className="text-white font-inria-serif-regular text-sm sm:text-base font-medium text-left">
                  {card.title}
                </span>
              </div>
              <p className="text-gray-300 font-inria-serif-regular text-sm sm:text-base font-normal text-justify">
                {card.para}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Info text below cards */}
      <div className="w-full max-w-6xl flex flex-col items-start mt-8 sm:mt-12 px-4 sm:px-6">
        <div className="text-[#FF9641] font-poppins-medium text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
          Who can use this?
        </div>
        <div className="text-gray-900 font-inria-serif-bold text-lg sm:text-xl md:text-2xl font-bold text-left max-w-[900px]">
          Property managers, homeowners, housing associations and other relevant
          contacts are potential customers.
        </div>
      </div>
    </section>
  );
}
