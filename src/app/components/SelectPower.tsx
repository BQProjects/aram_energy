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

        // Auto-select the first tariff if none is selected
        if (
          data.tariffs &&
          data.tariffs.length > 0 &&
          !selectedTariff.selectedTariffId
        ) {
          updateSelectedTariff({ selectedTariffId: data.tariffs[0].id });
          updateSelectedTariffData(data.tariffs[0]);
        }
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
    selectedTariff.selectedTariffId,
    updateSelectedTariff,
    updateSelectedTariffData,
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
                  width={28}
                  height={28}
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke={
                      selectedTariff.selectedTariffId === tariff.id
                        ? "#FF9641"
                        : "#FFFFFF"
                    }
                    strokeWidth="2"
                    fill="none"
                  />
                  {selectedTariff.selectedTariffId === tariff.id && (
                    <circle cx="12" cy="12" r="5" fill="#FF9641" />
                  )}
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
