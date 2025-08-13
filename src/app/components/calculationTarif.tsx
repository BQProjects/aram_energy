import Image from "next/image";
import { useState } from "react";

export default function CalculationTarif() {
  const [selected, setSelected] = useState("electricity");
  const [customerType, setCustomerType] = useState("private");

  return (
    <div
      className="
        mt-8 flex flex-col items-center justify-start 
        w-full max-w-[1076px] pb-8 px-4 sm:px-8 lg:px-12 
        bg-black/50 text-white font-poppins text-[16px] font-normal
      "
    >
      {/* Top selection box */}
      <div
        className="
          flex items-center justify-between mt-8 
          w-full max-w-[740px] h-16 
          bg-[#EEEEEE2B] p-2
        "
      >
        {/* Electricity Button */}
        <button
          className={`
            flex items-center justify-center w-[360px] h-12 
            font-inter text-[16px] font-normal transition-colors duration-300 ease-in-out
            ${
              selected === "electricity"
                ? "bg-[#FF9641] text-white"
                : "bg-transparent text-white"
            }
          `}
          onClick={() => setSelected("electricity")}
        >
          <Image
            src="/zap.svg"
            alt="Zap Logo"
            width={12}
            height={16}
            className="mr-2"
          />
          Electricity
        </button>

        {/* Gas Button */}
        <button
          className={`
            flex items-center justify-center w-[346px] h-12 
            font-inter text-[16px] font-normal transition-colors duration-500 ease-in-out
            ${
              selected === "gas"
                ? "bg-[#FF9641] text-white"
                : "bg-transparent text-white"
            }
          `}
          onClick={() => setSelected("gas")}
        >
          <Image
            src="/gas.svg"
            alt="Gas Logo"
            width={12}
            height={16}
            className="mr-2"
          />
          Gas
        </button>
      </div>

      {/* Customer type */}
      <div className="flex items-center gap-2 mt-4">
        <Image src="/infoI.svg" alt="Info Icon" width={12} height={16} />
        <span className="font-poppins text-[16px] font-normal">
          Customer type
        </span>
      </div>

      {/* Private / Company Switch */}
      <div className="ml-6 flex items-center gap-8 mt-4">
        <div className="flex items-center">
          <Image src="/person.svg" alt="Person" width={12} height={16} />
          <span className="ml-1 font-poppins text-[14px] font-normal text-white">
            Private
          </span>
        </div>

        <div
          className="flex items-center justify-center w-[55px] h-[25px] bg-[#FF9641] rounded-full shadow cursor-pointer relative"
          onClick={() =>
            setCustomerType(customerType === "private" ? "company" : "private")
          }
        >
          <div
            className={`w-[21px] h-[21px] bg-white rounded-full shadow absolute top-[2px] transition-all duration-300 ease-in-out ${
              customerType === "private" ? "left-[2px]" : "left-[32px]"
            }`}
            style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)" }}
          ></div>
        </div>

        <div className="flex items-center">
          <Image src="/company.svg" alt="Company" width={12} height={16} />
          <span className="ml-1 font-poppins text-[14px] font-normal text-white">
            Company
          </span>
        </div>
      </div>

      {/* Annual consumption text */}
      <span className="mt-4 font-poppins text-[16px] font-normal">
        Annual consumption in kWh
      </span>

      {/* Form grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 w-full max-w-[800px]">
        {/* Postal code */}
        <div className="flex flex-col w-full max-w-[380px]">
          <label
            htmlFor="postalCode"
            className="text-[14px] font-normal text-white mb-1"
          >
            Postal code
          </label>
          <div className="relative">
            <input
              id="postalCode"
              type="text"
              placeholder="Enter postal code"
              className="w-full h-[50px] rounded-lg border border-[#E0E0E0] bg-white px-4 pr-10 text-[#171717] text-[14px]"
            />
            <Image
              src="/location.svg"
              alt="Location"
              width={12}
              height={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>

        {/* Annual consumption */}
        <div className="flex flex-col w-full max-w-[380px]">
          <label
            htmlFor="annualConsumption"
            className="text-[14px] font-normal text-white mb-1"
          >
            Annual consumption in kWh
          </label>
          <input
            id="annualConsumption"
            type="text"
            placeholder="Enter annual consumption"
            className="w-full h-[50px] rounded-lg border border-[#E0E0E0] bg-white px-4 text-[#171717] text-[14px]"
          />
        </div>

        {/* Tariff key */}
        <div className="flex flex-col w-full max-w-[380px]">
          <label
            htmlFor="tariffKey"
            className="text-[14px] font-normal text-white mb-1"
          >
            Tariff key
          </label>
          <input
            id="tariffKey"
            type="text"
            placeholder="Enter tariff key"
            className="w-full h-[50px] rounded-lg border border-[#E0E0E0] bg-white px-4 text-[#171717] text-[14px]"
          />
        </div>

        {/* Transaction key */}
        <div className="flex flex-col w-full max-w-[380px]">
          <label
            htmlFor="transactionKey"
            className="text-[14px] font-normal text-white mb-1"
          >
            Transaction key
          </label>
          <input
            id="transactionKey"
            type="text"
            placeholder="Enter transaction key"
            className="w-full h-[50px] rounded-lg border border-[#E0E0E0] bg-white px-4 text-[#171717] text-[14px]"
          />
        </div>

        {/* Calculate button */}
        <div className="col-span-1 sm:col-span-2 flex justify-center mt-8">
          <button className="w-[300px] h-[50px] bg-[#FF9641] text-white rounded-lg font-poppins font-medium text-[16px]">
            Calculate Tariff
          </button>
        </div>
      </div>

      {/* Help text */}
      <div className="flex items-center mt-4">
        <Image
          src="/question.svg"
          alt="Help"
          width={14}
          height={14}
          className="mr-2"
        />
        <span className="font-poppins text-[14px] font-normal text-white">
          Do you need help calculating your consumption?
        </span>
      </div>
    </div>
  );
}
