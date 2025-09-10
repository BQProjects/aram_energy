import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useSelectedTariffSection,
  useSessionInfo,
} from "@/app/contexts/FormHelpers";
import { useCalculationTarif } from "../contexts/CalculationTarifContext";

interface Tariff {
  id: string;
  name: string;
  basePrice: string;
  laborPrice: string;
  typeOfCurrent: string;
  contractTerm: string;
  priceGuarantee: string;
  downPayment: string;
  total: string;
  basePriceValue: number;
  laborPriceValue: number;
  totalValue: number;
}

interface SelectPowerProps {
  t?: (key: string) => string;
}

const SelectPower: React.FC<SelectPowerProps> = ({ t }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedTariff, updateSelectedTariff, updateSelectedTariffData } =
    useSelectedTariffSection();
  const { sessionId } = useSessionInfo();
  const { state } = useCalculationTarif();
  const { calculationTarif } = state;

  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tariffs when component mounts or when calculation data changes
  useEffect(() => {
    const fetchTariffs = async () => {
      if (!calculationTarif.postalCode || !calculationTarif.annualConsumption) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/tariffs?plz=${calculationTarif.postalCode}&type=${calculationTarif.selected}&consumption=${calculationTarif.annualConsumption}&customerType=${calculationTarif.customerType}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tariffs");
        }

        const data = await response.json();
        setTariffs(data.tariffs || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load tariffs");
        console.error("Error fetching tariffs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTariffs();
  }, [
    calculationTarif.postalCode,
    calculationTarif.selected,
    calculationTarif.annualConsumption,
    calculationTarif.customerType,
  ]);

  const handleSelect = async () => {
    // Navigate to next step with session ID
    const params = new URLSearchParams(searchParams);
    if (sessionId) {
      params.set("id", sessionId);
    }
    router.push(`/calculator/personaldetails?${params.toString()}`);
  };

  // Handle tariff selection
  const handleTariffSelect = (id: string) => {
    const tariff = tariffs.find((t) => t.id === id);
    if (tariff) {
      updateSelectedTariff({ selectedTariffId: id });
      updateSelectedTariffData(tariff);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full md:w-[800px]">
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span className="ml-2 text-white">Loading tariffs...</span>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      ) : tariffs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-white">No tariffs available for your location.</p>
        </div>
      ) : (
        tariffs.map((tariff) => (
          <div
            key={tariff.id}
            className="flex flex-col items-start self-stretch py-4 px-4 md:px-8 bg-white/10 gap-4 cursor-pointer"
            onClick={() => handleTariffSelect(tariff.id)}
          >
            {/* Select dot and name */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex justify-start w-auto">
                <svg
                  width={34}
                  height={34}
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 23.375C18.6908 23.375 20.3123 22.7034 21.5078 21.5078C22.7034 20.3123 23.375 18.6908 23.375 17C23.375 15.3092 22.7034 13.6877 21.5078 12.4922C20.3123 11.2966 18.6908 10.625 17 10.625C15.3092 10.625 13.6877 11.2966 12.4922 12.4922C11.2966 13.6877 10.625 15.3092 10.625 17C10.625 18.6908 11.2966 20.3123 12.4922 21.5078C13.6877 22.7034 15.3092 23.375 17 23.375ZM17 4.25C15.3256 4.25 13.6677 4.57979 12.1208 5.22054C10.5739 5.86128 9.16834 6.80044 7.98439 7.98439C6.80044 9.16834 5.86128 10.5739 5.22054 12.1208C4.57979 13.6677 4.25 15.3256 4.25 17C4.25 18.6744 4.57979 20.3323 5.22054 21.8792C5.86128 23.4261 6.80044 24.8317 7.98439 26.0156C9.16834 27.1996 10.5739 28.1387 12.1208 28.7795C13.6677 29.4202 15.3256 29.75 17 29.75C20.3815 29.75 23.6245 28.4067 26.0156 26.0156C28.4067 23.6245 29.75 20.3815 29.75 17C29.75 13.6185 28.4067 10.3755 26.0156 7.98439C23.6245 5.5933 20.3815 4.25 17 4.25ZM6.375 17C6.375 14.1821 7.49442 11.4796 9.48699 9.48699C11.4796 7.49442 14.1821 6.375 17 6.375C19.8179 6.375 22.5204 7.49442 24.513 9.48699C26.5056 11.4796 27.625 14.1821 27.625 17C27.625 19.8179 26.5056 22.5204 24.513 24.513C22.5204 26.5056 19.8179 27.625 17 27.625C14.1821 27.625 11.4796 26.5056 9.48699 24.513C7.49442 22.5204 6.375 19.8179 6.375 17Z"
                    fill={
                      selectedTariff.selectedTariffId === tariff.id
                        ? "#FF9641"
                        : "#E5E7EB"
                    }
                  />
                </svg>
              </div>
              <div className="text-[#ff9641] font-inria-serif-bold text-xl md:text-2xl font-bold leading-normal flex-1">
                {t ? t(tariff.name) : tariff.name}
              </div>
            </div>
            {/* Tariff details */}
            <div className="flex flex-col gap-[17px] w-full md:w-[629px] mt-4">
              <div className="flex flex-col self-stretch gap-[17px]">
                <div className="flex items-center gap-4">
                  <div className="w-40 h-[8.9375rem] text-[#abafb1] text-base font-poppins-regular leading-normal flex-shrink-0">
                    {t ? t("tariff.basePrice") : "Base Price"} :<br />
                    {t ? t("tariff.laborPrice") : "Labor Price"} :<br />
                    {t ? t("tariff.typeOfCurrent") : "Type Of Current"} :<br />
                    {t ? t("tariff.contractTerm") : "Contract Term"} :<br />
                    {t ? t("tariff.priceGuarantee") : "Price Guarantee"} :<br />
                    {t ? t("tariff.downPayment") : "Down Payment"} :
                  </div>
                  <div className="flex-1 h-[8.9375rem] text-white text-left md:text-right font-poppins-regular">
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
                <div className="w-full md:w-[629px] h-px bg-white/40" />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-[8rem] h-[1.4375rem] text-[#d9d9d9] font-poppins-semibold text-base leading-normal flex-shrink-0">
                  {t ? t("tariff.total") : "Total"}
                </div>
                <div className="flex-1 h-[1.4375rem] text-white text-left md:text-right font-poppins-semibold text-base leading-normal">
                  {tariff.total}
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Select Button */}
      <div className="flex justify-center md:justify-end w-full mt-8">
        <button
          className="bg-[#FF9641] text-white font-poppins-light px-8 py-3 w-full md:w-[240.41px] h-[62px] shadow hover:bg-[#e88537] transition-colors text-base font-semibold flex items-center justify-center gap-3"
          onClick={handleSelect}
        >
          {t ? t("tariff.chooseTariff") : "Choose Tariff"}
          <Image
            src="/whiteRightArrow.svg"
            alt="Right Arrow"
            width={24}
            height={24}
            quality={100}
          />
        </button>
      </div>
    </div>
  );
};

export default SelectPower;
