import Image from "next/image";
import WideRangeScroll from "./WideRangeScroll";

export default function WideRange() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/wideRange.png"
          alt="Wide Range Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Top content */}
      <div className="w-full flex flex-col items-start px-4 sm:px-6 md:px-8 lg:px-24 pb-16 sm:pb-24 md:pb-32 lg:pb-[200px] gap-5">
        <h2 className="font-inria-serif-bold text-2xl sm:text-3xl md:text-4xl font-bold text-[#FF9641] mb-4 sm:mb-5">
          Bundle energy cleverly – with Aram Energy Solution
        </h2>
        <div className="font-poppins-regular text-lg sm:text-xl md:text-2xl font-normal text-white mb-4 sm:mb-6">
          Energy that suits you – for businesses and private households
        </div>
        <button className="flex items-center justify-between w-full sm:w-80 md:w-96 lg:w-[470px] h-12 sm:h-14 md:h-[55px] bg-[#FF9641] font-inter font-medium text-sm sm:text-base text-white border-none outline-none cursor-pointer px-6 sm:px-8 md:px-8 mb-6 sm:mb-8 rounded-lg hover:bg-[#e88537] transition-colors duration-200">
          <span className="text-left">
            Contact us now and secure a framework agreement!
          </span>
          <Image
            src="/whiteRightArrow.svg"
            alt="Right Arrow"
            width={32}
            height={32}
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8"
          />
        </button>
        <div className="font-poppins-regular text-base sm:text-lg md:text-xl font-normal text-white text-justify max-w-4xl">
          As an independent energy optimizer based in Paderborn, we offer
          attractive electricity and gas contracts – regardless of whether you
          are billed according to the RLM or SLP. Whether you are a small
          business, medium-sized company, or private household – Aram Energy
          Solution offers customized electricity and gas contracts at
          consistently favorable terms.
        </div>
      </div>
    </section>
  );
}
