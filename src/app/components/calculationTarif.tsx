import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";

export default function CalculationTarif() {
  const { t } = useLanguage();
  const router = useRouter();
  const [selected, setSelected] = useState("electricity");
  const [customerType, setCustomerType] = useState("private");
  const [postalCode, setPostalCode] = useState("");
  const [postalOptions, setPostalOptions] = useState<
    { plz: string; city: string; district?: string }[]
  >([]);
  const [annualConsumption, setAnnualConsumption] = useState("");
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("calculationTarif");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.selected) setSelected(data.selected);
        if (data.customerType) setCustomerType(data.customerType);
        if (data.postalCode) setPostalCode(data.postalCode);
        if (data.annualConsumption)
          setAnnualConsumption(data.annualConsumption);
        if (Array.isArray(data.postalOptions))
          setPostalOptions(data.postalOptions);
      }
    } catch {}
  }, []);

  // Store to localStorage on change
  useEffect(() => {
    const data = {
      selected,
      customerType,
      postalCode,
      annualConsumption,
      postalOptions,
    };
    try {
      localStorage.setItem("calculationTarif", JSON.stringify(data));
    } catch {}
  }, [selected, customerType, postalCode, annualConsumption, postalOptions]);

  useEffect(() => {
    if (postalCode.length < 2) {
      setPostalOptions([]);
      return;
    }
    const fetchPostalCodes = async () => {
      const res = await fetch(`/api/postal-codes?q=${postalCode}`);
      const data = await res.json();
      setPostalOptions(data);
    };
    fetchPostalCodes();
  }, [postalCode]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col items-center justify-start w-full max-w-[1070px] pb-8 sm:pb-10 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 bg-black/50 text-white font-poppins text-sm sm:text-base font-normal">
      {/* Top selection box */}
      <div className="flex flex-col sm:flex-row items-center justify-center mt-6 sm:mt-8 w-full max-w-[800px] h-auto bg-[#EEEEEE2B] p-2 gap-2">
        {/* Electricity Button */}
        <button
          className={`flex items-center justify-center w-full h-12 sm:h-12 min-h-[48px] min-w-[120px] font-poppins-regular text-base  transition-colors duration-300 ease-in-out px-4 ${
            selected === "electricity"
              ? "bg-[#FF9641] text-white"
              : "bg-transparent text-white hover:bg-white/10"
          }`}
          style={{ minWidth: 0 }}
          onClick={() => setSelected("electricity")}
        >
          <Image
            src="/zap.svg"
            alt="Zap Logo"
            width={12}
            height={16}
            quality={100}
            className="mr-2 w-3 h-4 sm:w-3 sm:h-4"
          />
          {t("calculation.electricity")}
        </button>

        {/* Gas Button */}
        <button
          className={`flex items-center justify-center w-full h-12 sm:h-12 min-h-[48px] min-w-[120px] font-poppins-regular text-base transition-colors duration-300 ease-in-out px-4 ${
            selected === "gas"
              ? "bg-[#FF9641] text-white"
              : "bg-transparent text-white hover:bg-white/10"
          }`}
          style={{ minWidth: 0 }}
          onClick={() => setSelected("gas")}
        >
          <Image
            src="/gas.svg"
            alt="Gas Logo"
            width={12}
            height={16}
            quality={100}
            className="mr-2 w-3 h-4 sm:w-3 sm:h-4"
          />
          {t("calculation.gas")}
        </button>
      </div>

      {/* Customer type */}
      <div className="flex items-center gap-2 mt-6 sm:mt-8">
        <Image
          src="/infoI.svg"
          alt="Info Icon"
          width={12}
          height={16}
          quality={100}
          className="w-3 h-4 sm:w-3 sm:h-4"
        />
        <span className="font-poppins-light text-sm sm:text-base">
          {t("calculation.customerType")}
        </span>
      </div>

      {/* Private / Company Switch */}
      <div className="ml-0 sm:ml-4 md:ml-6 flex items-center gap-4 sm:gap-4 md:gap-8 mt-3 sm:mt-4 w-full justify-center">
        <div className="flex items-center">
          <Image
            src="/person.svg"
            alt="Person"
            width={12}
            height={16}
            quality={100}
            className="w-3 h-4 sm:w-3 sm:h-4"
          />
          <span className="ml-1 font-poppins-light text-xs sm:text-sm text-white">
            {t("calculation.private")}
          </span>
        </div>

        <div
          className="flex items-center w-[50px] sm:w-[65px] h-[28px] sm:h-[30px] rounded-full cursor-pointer transition-colors duration-300 bg-[#FF9641]"
          onClick={() =>
            setCustomerType(customerType === "private" ? "company" : "private")
          }
        >
          <div className="relative w-full h-full px-1 flex items-center">
            <div
              className={`absolute left-1 top-1 w-[18px] sm:w-[22px] h-[18px] sm:h-[22px] bg-white rounded-full shadow transition-transform duration-300 ease-in-out`}
              style={{
                transform:
                  customerType === "private"
                    ? "translateX(0)"
                    : "translateX(32px)", // slightly less for mobile
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
              }}
            ></div>
          </div>
        </div>

        <div className="flex items-center">
          <Image
            src="/company.svg"
            alt="Company"
            width={12}
            height={16}
            quality={100}
            className="w-3 h-4 sm:w-3 sm:h-4"
          />
          <span className="ml-1 font-poppins-light text-xs sm:text-sm text-white">
            {t("calculation.company")}
          </span>
        </div>
      </div>

      {/* Annual consumption text */}
      <span className="mt-4 sm:mt-4 font-poppins-light text-base sm:text-sm text-white text-center px-2">
        {t("calculation.consumption")}
      </span>

      {/* Form grid */}
      <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-5 sm:gap-y-6 w-full max-w-[800px] px-0">
        {/* Postal code */}
        <div className="flex flex-col w-full max-w-full sm:max-w-[380px] relative">
          <label
            htmlFor="postalCode"
            className="text-xs sm:text-sm font-poppins-light text-[#F9FAFB] mb-1 sm:mb-2"
          >
            {t("calculation.zipCode")}
          </label>
          <div className="relative">
            <input
              id="postalCode"
              type="text"
              value={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value);
                setShowDropdown(true);
              }}
              placeholder={t("calculation.zipCodePlaceholder")}
              autoComplete="off"
              className="w-full h-[48px] sm:h-[50px] border border-[#E0E0E0] bg-[#F9FAFB] placeholder-text-[#ADAEBC] placeholder-font-poppins-light font-poppins-light px-3 sm:px-4 pr-8 sm:pr-10 text-[#171717] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9641] focus:border-transparent"
            />
            <Image
              src="/location.svg"
              alt="Location"
              width={12}
              height={16}
              quality={100}
              className="absolute mr-2 right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none w-3 h-4 sm:w-3 sm:h-4"
            />
            {showDropdown && postalOptions.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-56 overflow-y-auto"
              >
                {postalOptions.map((option) => (
                  <div
                    key={option.plz + option.city + (option.district || "")}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-black"
                    onClick={() => {
                      setPostalCode(option.plz);
                      setShowDropdown(false);
                    }}
                  >
                    <span className="font-semibold">{option.plz}</span>
                    {option.city && <span className="ml-2">{option.city}</span>}
                    {option.district && (
                      <span className="ml-2 text-gray-500 text-xs">
                        ({option.district})
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Annual consumption */}
        <div className="flex flex-col w-full max-w-full sm:max-w-[380px]">
          <label
            htmlFor="annualConsumption"
            className="text-xs sm:text-sm font-poppins-light text-[#F9FAFB] mb-1 sm:mb-2"
          >
            {t("calculation.consumption")}
          </label>
          <input
            id="annualConsumption"
            type="text"
            value={annualConsumption}
            onChange={(e) => setAnnualConsumption(e.target.value)}
            placeholder={t("calculation.consumptionPlaceholder")}
            className="w-full h-[48px] sm:h-[50px] border border-[#E0E0E0] bg-[#F9FAFB] placeholder-text-[#ADAEBC] placeholder-font-poppins-light font-poppins-light px-3 sm:px-4 text-[#171717] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9641] focus:border-transparent"
          />
        </div>

        {/* Tariff key */}
        <div className="flex flex-col w-full max-w-full sm:max-w-[380px]">
          <label
            htmlFor="tariffKey"
            className="text-xs sm:text-sm font-poppins-light text-[#F9FAFB] mb-1 sm:mb-2"
          >
            {t("calculation.tariffKey")}
          </label>
          <input
            id="tariffKey"
            type="text"
            value="77509"
            readOnly
            className="w-full h-[48px] sm:h-[50px] border border-[#E0E0E0] bg-[#F9FAFB] placeholder-text-[#ADAEBC] placeholder-font-poppins-light font-poppins-light px-3 sm:px-4 text-[#171717] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9641] focus:border-transparent"
          />
        </div>

        {/* Transaction key */}
        <div className="flex flex-col w-full max-w-full sm:max-w-[380px]">
          <label
            htmlFor="transactionKey"
            className="text-xs sm:text-sm font-poppins-light text-[#F9FAFB] mb-1 sm:mb-2"
          >
            {t("calculation.transactionKey")}
          </label>
          <input
            id="transactionKey"
            type="text"
            placeholder={t("calculation.transactionKeyPlaceholder")}
            className="w-full h-[48px] sm:h-[50px] border border-[#E0E0E0] bg-[#F9FAFB] placeholder-text-[#ADAEBC] placeholder-font-poppins-light font-poppins-light px-3 sm:px-4 text-[#171717] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9641] focus:border-transparent"
          />
        </div>

        {/* Calculate button */}
        <div className="col-span-1 sm:col-span-2 flex flex-col items-center justify-center w-full ">
          <button
            className="w-full h-[48px] sm:w-[300px] sm:h-[47px] bg-[#FF9641] text-white font-poppins-light text-base shadow-lg relative overflow-hidden group transition-colors duration-300"
            onClick={() => {
              if (!annualConsumption.trim() || !postalCode.trim()) {
                setError(t("calculation.validationError"));
                return;
              }
              setError("");
              // Find district for the selected postal code
              const selectedOption = postalOptions.find(
                (opt) => opt.plz === postalCode
              );
              const location = selectedOption?.district || "";
              const division =
                selected === "electricity" ? "Electricity" : "Gas";
              const customerCategory =
                customerType === "private" ? "Private" : "Company";
              const params = new URLSearchParams({
                postalCode,
                location,
                division,
                customerCategory,
              });
              router.push(`/calculator/selectoption?${params.toString()}`);
            }}
          >
            <span className="relative z-10 duration-300 group-hover:text-[#FF9641] transition-transform group-hover:translate-x-1">
              {t("calculation.calculate")}
            </span>
            <span className="absolute left-0 top-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></span>
          </button>
          {error && <span className="text-red-400 text-xs mt-2">{error}</span>}
        </div>
      </div>

      {/* Help text */}
      <div className="flex items-center mt-5 sm:mt-8 px-2">
        <Image
          src="/question.svg"
          alt="Help"
          width={14}
          height={14}
          quality={100}
          className="mr-2 w-3 h-3 sm:w-3.5 sm:h-3.5"
        />
        <span className="font-poppins text-xs sm:text-sm font-poppins-light text-[#E5E7EB]">
          {t("calculation.helpText")}
        </span>
      </div>
    </div>
  );
}
