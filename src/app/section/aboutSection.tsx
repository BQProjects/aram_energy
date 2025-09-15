import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";
import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
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
    <section
      id="about"
      className="w-full flex flex-col items-center justify-center"
    >
      {/* Top 25% black section */}
      <div className="w-full flex items-center justify-center md:justify-start bg-black h-24 sm:h-32 md:h-40 lg:h-48 xl:h-52 min-h-[120px] sm:min-h-[150px] md:min-h-[180px]">
        <span className="text-[#FF9641] ml-0 md:ml-20 font-quando text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal tracking-wide px-2 text-center md:text-left w-full md:w-auto">
          {t("about.title")}
        </span>
      </div>

      {/* Bottom white section */}
      <div className="w-full flex flex-col p-6 items-center justify-center lg:flex-row bg-white py-10 px-6 md:px-12 lg:px-20 min-h-[500px]">
        {/* Image on left */}
        <div className="flex items-center justify-center mb-8 lg:mb-0 lg:mr-12 w-full lg:w-auto pb-10 pt-10">
          <Image
            src="/aboutimage.png"
            alt="About Section Image"
            width={715}
            height={458}
            quality={100}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-none lg:w-[660px] h-auto rounded-md object-cover shadow-lg"
          />
        </div>
        {/* Right: 3 paragraphs with icon circles */}
        <motion.div
          className="flex flex-col gap-12 max-w-xl w-full py-8 pl-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* 1st para */}
          <motion.div
            className="flex items-start gap-4"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#F2F2F2] flex-shrink-0 mt-1">
              <Image
                src="/ribbon.svg"
                alt="Ribbon Icon"
                width={18}
                height={24}
                quality={100}
                className="object-contain w-4 h-6"
              />
            </div>
            <div className="flex-1 min-w-0 ">
              <span className="font-inria-serif-bold text-base md:text-sm text-[#171717] leading-relaxed">
                <span className="text-xl md:text-xl block font-quando">
                  {t("about.affordableRates")}
                </span>
                <span className="font-poppins-light">
                  {t("about.affordableRatesDesc")
                    .split("\n")
                    .map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx <
                          t("about.affordableRatesDesc").split("\n").length -
                            1 && <br />}
                      </React.Fragment>
                    ))}
                </span>
              </span>
            </div>
          </motion.div>
          {/* 2nd para */}
          <motion.div
            className="flex items-start gap-4"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#F2F2F2] flex-shrink-0 mt-1">
              <Image
                src="/personcheck.svg"
                alt="Personcheck Icon"
                width={30}
                height={24}
                quality={100}
                className="object-contain w-5 h-4"
              />
            </div>
            <div className="flex-1 min-w-0 ">
              <span className="font-inria-serif-bold text-base md:text-sm text-[#171717] leading-relaxed">
                <span className="text-xl md:text-xl block font-quando">
                  {t("about.contactPerson")}
                </span>
                <span className="font-poppins-light">
                  {t("about.contactPersonDesc")
                    .split("\n")
                    .map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx <
                          t("about.contactPersonDesc").split("\n").length -
                            1 && <br />}
                      </React.Fragment>
                    ))}
                </span>
              </span>
            </div>
          </motion.div>
          {/* 3rd para */}
          <motion.div
            className="flex items-start gap-4"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#F2F2F2] flex-shrink-0 mt-1">
              <Image
                src="/clock.svg"
                alt="Clock Icon"
                width={24}
                height={24}
                quality={100}
                className="object-contain w-4 h-4"
              />
            </div>
            <div className="flex-1 min-w-0 ">
              <span className="font-inria-serif-bold text-base md:text-sm text-[#171717] leading-relaxed">
                <span className="text-xl md:text-xl block font-quando">
                  {t("about.reliablePartner")}
                </span>
                <span className="font-poppins-light">
                  {t("about.reliablePartnerDesc")
                    .split("\n")
                    .map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx <
                          t("about.reliablePartnerDesc").split("\n").length -
                            1 && <br />}
                      </React.Fragment>
                    ))}
                </span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
