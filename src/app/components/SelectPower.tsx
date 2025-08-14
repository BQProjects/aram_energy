import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SelectPower = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // You can extract any needed params here if you want to pass them forward
  const handleSelect = () => {
    // Example: go to next step, pass along params if needed
    router.push("/calculator/personaldetails?" + searchParams.toString());
  };

  const [selectedTariff, setSelectedTariff] = useState<number | null>(null);

  // Store selected tariff in localStorage
  const handleTariffSelect = (id: number) => {
    setSelectedTariff(id);
    const tariff = tariffs.find((t) => t.id === id);
    if (tariff) {
      try {
        localStorage.setItem("selectedTariff", JSON.stringify(tariff));
      } catch {}
    }
  };

  const tariffs = [
    {
      id: 1,
      name: "R(H)EINPOWER Direct Electricity Tariff",
      basePrice: "249.70 EUR/year",
      laborPrice: "32.72 cents/kWh",
      typeOfCurrent: "Standard electricity",
      contractTerm: "24 months",
      priceGuarantee: "24 months",
      downPayment: "Monthly installments",
      total: "1,067.70 EUR/year",
    },
    {
      id: 2,
      name: "R(H)EINPOWER MeinStrom Heat Pump 24 Tariff",
      basePrice: "99.82 EUR/year",
      laborPrice: "28.31 cents/kWh",
      typeOfCurrent: "Standard electricity",
      contractTerm: "24 months",
      priceGuarantee: "24 months",
      downPayment: "Monthly installments",
      total: "807.57 EUR/year",
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-[800px]">
      {tariffs.map((tariff) => (
        <div
          key={tariff.id}
          className="flex items-start self-stretch py-4 px-8 bg-white/10 gap-[34px] cursor-pointer"
          onClick={() => handleTariffSelect(tariff.id)}
        >
          {/* Select dot */}
          <svg
            width={34}
            height={34}
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 23.375C18.6908 23.375 20.3123 22.7034 21.5078 21.5078C22.7034 20.3123 23.375 18.6908 23.375 17C23.375 15.3092 22.7034 13.6877 21.5078 12.4922C20.3123 11.2966 18.6908 10.625 17 10.625C15.3092 10.625 13.6877 11.2966 12.4922 12.4922C11.2966 13.6877 10.625 15.3092 10.625 17C10.625 18.6908 11.2966 20.3123 12.4922 21.5078C13.6877 22.7034 15.3092 23.375 17 23.375ZM17 4.25C15.3256 4.25 13.6677 4.57979 12.1208 5.22054C10.5739 5.86128 9.16834 6.80044 7.98439 7.98439C6.80044 9.16834 5.86128 10.5739 5.22054 12.1208C4.57979 13.6677 4.25 15.3256 4.25 17C4.25 18.6744 4.57979 20.3323 5.22054 21.8792C5.86128 23.4261 6.80044 24.8317 7.98439 26.0156C9.16834 27.1996 10.5739 28.1387 12.1208 28.7795C13.6677 29.4202 15.3256 29.75 17 29.75C20.3815 29.75 23.6245 28.4067 26.0156 26.0156C28.4067 23.6245 29.75 20.3815 29.75 17C29.75 13.6185 28.4067 10.3755 26.0156 7.98439C23.6245 5.5933 20.3815 4.25 17 4.25ZM6.375 17C6.375 14.1821 7.49442 11.4796 9.48699 9.48699C11.4796 7.49442 14.1821 6.375 17 6.375C19.8179 6.375 22.5204 7.49442 24.513 9.48699C26.5056 11.4796 27.625 14.1821 27.625 17C27.625 19.8179 26.5056 22.5204 24.513 24.513C22.5204 26.5056 19.8179 27.625 17 27.625C14.1821 27.625 11.4796 26.5056 9.48699 24.513C7.49442 22.5204 6.375 19.8179 6.375 17Z"
              fill={selectedTariff === tariff.id ? "#FF9641" : "#E5E7EB"}
            />
          </svg>

          {/* Tariff info */}
          <div className="flex flex-col items-start gap-[17px] w-[629px]">
            <div className="text-[#ff9641] font-inria-serif-bold text-2xl font-bold leading-normal">
              {tariff.name}
            </div>
            <div className="flex flex-col items-end self-stretch gap-[17px]">
              <div className="flex items-center gap-[95px]">
                <div className="w-40 h-[8.9375rem] text-[#abafb1] font-poppins-regular leading-normal">
                  Base Price :<br />
                  Labor Price :<br />
                  Type Of Current :<br />
                  Contract Term :<br />
                  Price Guarantee :<br />
                  Down Payment :
                </div>
                <div className="w-[22.75rem] h-[8.9375rem] text-white text-right font-poppins-regular">
                  {tariff.basePrice}
                  <br />
                  {tariff.laborPrice}
                  <br />
                  {tariff.typeOfCurrent}
                  <br />
                  {tariff.contractTerm}
                  <br />
                  {tariff.priceGuarantee}
                  <br />
                  {tariff.downPayment}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end self-stretch gap-[17px]">
              <div className="w-[629px] h-px bg-white/40" />
            </div>
            <div className="flex items-center gap-[63px]">
              <div className="w-[17.375rem] h-[1.4375rem] text-[#d9d9d9] font-poppins-semibold  leading-normal">
                Total
              </div>
              <div className="w-[17.375rem] h-[1.4375rem] text-white text-right font-poppins-semibold leading-normal">
                {tariff.total}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Select Button */}
      <div className="flex justify-end w-full mt-8">
        <button
          className="bg-[#FF9641] text-white font-poppins px-8 py-3 w-[240.41px] h-[62px] shadow hover:bg-[#e88537] transition-colors text-base font-semibold"
          onClick={handleSelect}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default SelectPower;
