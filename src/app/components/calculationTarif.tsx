import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function CalculationTarif() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState("electricity");
  const [customerType, setCustomerType] = useState("private");

  return (
    <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col items-center justify-start w-full max-w-[1076px] pb-6 sm:pb-8 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 bg-black/50 text-white font-poppins text-sm sm:text-base font-normal">
      {/* Top selection box */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 sm:mt-8 w-full max-w-[800px] h-12 sm:h-16 bg-[#EEEEEE2B] p-2 sm:p-3 gap-2 sm:gap-0">
        {/* Electricity Button */}
        <button
          className={`flex items-center justify-center w-full sm:w-[400px] h-11 font-inter text-sm sm:text-base font-normal transition-colors duration-300 ease-in-out px-3 sm:px-4 ${
            selected === "electricity"
              ? "bg-[#FF9641] text-white"
              : "bg-transparent text-white hover:bg-white/10"
          }`}
          onClick={() => setSelected("electricity")}
        >
          <Image
            src="/zap.svg"
            alt="Zap Logo"
            width={12}
            height={16}
            className="mr-2 w-3 h-4 sm:w-3 sm:h-4"
          />
          {t('calculation.electricity')}
        </button>

        {/* Gas Button */}
        <button
          className={`flex items-center justify-center w-full sm:w-[400px] h-11 font-inter text-sm sm:text-base font-normal transition-colors duration-300 ease-in-out px-3 sm:px-4 ${
            selected === "gas"
              ? "bg-[#FF9641] text-white"
              : "bg-transparent text-white hover:bg-white/10"
          }`}
          onClick={() => setSelected("gas")}
        >
          <Image
            src="/gas.svg"
            alt="Gas Logo"
            width={12}
            height={16}
            className="mr-2 w-3 h-4 sm:w-3 sm:h-4"
          />
          {t('calculation.gas')}
        </button>
      </div>

      {/* Customer type */}
      <div className="flex items-center gap-2 mt-4 sm:mt-5">
        <Image src="/infoI.svg" alt="Info Icon" width={12} height={16} className="w-3 h-4 sm:w-3 sm:h-4" />
        <span className="font-poppins text-sm sm:text-base font-normal">
          {t('calculation.customerType')}
        </span>
      </div>

      {/* Private / Company Switch */}
      <div className="ml-2 sm:ml-4 md:ml-6 flex items-center gap-3 sm:gap-4 md:gap-8 mt-3 sm:mt-4">
        <div className="flex items-center">
          <Image src="/person.svg" alt="Person" width={12} height={16} className="w-3 h-4 sm:w-3 sm:h-4" />
          <span className="ml-1 font-poppins text-xs sm:text-sm font-normal text-white">
            {t('calculation.private')}
          </span>
        </div>

        <div
          className="flex items-center justify-center w-[45px] sm:w-[55px] h-[20px] sm:h-[25px] bg-[#FF9641] rounded-full shadow cursor-pointer relative"
          onClick={() =>
            setCustomerType(customerType === "private" ? "company" : "private")
          }
        >
          <div
            className={`w-[17px] sm:w-[21px] h-[17px] sm:h-[21px] bg-white rounded-full shadow absolute top-[1.5px] sm:top-[2px] transition-all duration-300 ease-in-out ${
              customerType === "private" ? "left-[1.5px] sm:left-[2px]" : "left-[26px] sm:left-[32px]"
            }`}
            style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)" }}
          ></div>
        </div>

        <div className="flex items-center">
          <Image src="/company.svg" alt="Company" width={12} height={16} className="w-3 h-4 sm:w-3 sm:h-4" />
          <span className="ml-1 font-poppins text-xs sm:text-sm font-normal text-white">
            {t('calculation.company')}
          </span>
        </div>
      </div>

      {/* Annual consumption text */}
      <span className="mt-3 sm:mt-4 font-poppins text-sm sm:text-base font-normal text-center px-2">
        {t('calculation.consumption')}
      </span>

      {/* Form grid */}
      <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-4 sm:gap-y-6 w-full max-w-[800px] px-2 sm:px-0">
        {/* Postal code */}
        <div className="flex flex-col w-full max-w-[380px]">
          <label
            htmlFor="postalCode"
            className="text-xs sm:text-sm font-normal text-white mb-1 sm:mb-2"
          >
            {t('calculation.zipCode')}
          </label>
          <div className="relative">
            <input
              id="postalCode"
              type="text"
              placeholder={t('calculation.zipCodePlaceholder')}
              className="w-full h-[45px] sm:h-[50px] rounded-lg border border-[#E0E0E0] bg-white px-3 sm:px-4 pr-8 sm:pr-10 text-[#171717] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9641] focus:border-transparent"
            />
            <Image
              src="/location.svg"
              alt="Location"
              width={12}
              height={16}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none w-3 h-4 sm:w-3 sm:h-4"
            />
          </div>
        </div>

        {/* Annual consumption */}
        <div className="flex flex-col w-full max-w-[380px]">
          <label
            htmlFor="annualConsumption"
            className="text-xs sm:text-sm font-normal text-white mb-1 sm:mb-2"
          >
            {t('calculation.consumption')}
          </label>
          <input
            id="annualConsumption"
            type="text"
            placeholder={t('calculation.consumptionPlaceholder')}
            className="w-full h-[45px] sm:h-[50px] rounded-lg border border-[#E0E0E0] bg-white px-3 sm:px-4 text-[#171717] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9641] focus:border-transparent"
          />
        </div>

        {/* Tariff key */}
        <div className="flex flex-col w-full max-w-[380px]">
          <label
            htmlFor="tariffKey"
            className="text-xs sm:text-sm font-normal text-white mb-1 sm:mb-2"
          >
            {t('calculation.tariffKey')}
          </label>
          <input
            id="tariffKey"
            type="text"
            placeholder={t('calculation.tariffKeyPlaceholder')}
            className="w-full h-[45px] sm:h-[50px] rounded-lg border border-[#E0E0E0] bg-white px-3 sm:px-4 text-[#171717] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9641] focus:border-transparent"
          />
        </div>

        {/* Transaction key */}
        <div className="flex flex-col w-full max-w-[380px]">
          <label
            htmlFor="transactionKey"
            className="text-xs sm:text-sm font-normal text-white mb-1 sm:mb-2"
          >
            {t('calculation.transactionKey')}
          </label>
          <input
            id="transactionKey"
            type="text"
            placeholder={t('calculation.transactionKeyPlaceholder')}
            className="w-full h-[45px] sm:h-[50px] rounded-lg border border-[#E0E0E0] bg-white px-3 sm:px-4 text-[#171717] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9641] focus:border-transparent"
          />
        </div>

        {/* Calculate button */}
        <div className="col-span-1 sm:col-span-2 flex justify-center mt-6 sm:mt-8">
          <button className="w-full sm:w-[300px] h-[45px] sm:h-[50px] bg-[#FF9641] text-white rounded-lg font-poppins font-medium text-sm sm:text-base hover:bg-[#e88537] transition-colors duration-200 shadow-lg">
            {t('calculation.calculate')}
          </button>
        </div>
      </div>

      {/* Help text */}
      <div className="flex items-center mt-3 sm:mt-4 px-2">
        <Image
          src="/question.svg"
          alt="Help"
          width={14}
          height={14}
          className="mr-2 w-3 h-3 sm:w-3.5 sm:h-3.5"
        />
        <span className="font-poppins text-xs sm:text-sm font-normal text-white">
          {t('calculation.helpText')}
        </span>
      </div>
    </div>
  );
}
