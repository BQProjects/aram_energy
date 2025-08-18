import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

export default function OurPartner() {
  const { t } = useLanguage();
  return (
    <section className="w-full min-h-[250px] sm:min-h-[300px] md:min-h-[350px] bg-black flex flex-col items-center py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-start px-4 sm:px-6">
        <div className="text-[#FF9641] font-inria-serif-bold text-2xl sm:text-3xl md:text-4xl font-normal mb-6 sm:mb-8 text-left">
          {t("ourPartner.heading")}
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-around items-center gap-6 sm:gap-8 mt-6 sm:mt-8 md:mt-10">
          <Image
            src="/partner1.png"
            alt="Stadtwerke Duisburg"
            width={220}
            height={60}
            className="w-40 h-12 sm:w-48 sm:h-14 md:w-56 md:h-16 lg:w-[220px] lg:h-[60px] object-contain"
          />
          <Image
            src="/partner2.png"
            alt="Plugman"
            width={120}
            height={120}
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-[120px] lg:h-[120px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
