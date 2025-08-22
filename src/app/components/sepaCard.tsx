import React from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { useAddressDetailsSection } from "@/app/contexts/FormHelpers";

const SepaCard: React.FC = () => {
  const { data: addressDetails } = useAddressDetailsSection();
  const { t } = useLanguage();

  return (
    <div className="card_2 flex-shrink-0 w-[21.8125rem] h-[750px] bg-white shadow-[0_1px_5px_0_rgba(45,62,80,0.12)] flex flex-col relative ml-0 p-0">
      {/* Orange vertical bar */}
      <div className="absolute left-0 top-0 w-1.5 h-full bg-[#ff9641]" />
      {/* Content */}
      <div className="pl-6 pr-4 py-6 flex flex-col justify-between h-full gap-0">
        <div>
          <div className="text-[#33475b] font-quando text-base leading-6 mb-2">
            {t("sepaCard.deliveryPointInfo")}
          </div>
          <div className="text-[#33475b] font-poppins-light leading-6 mb-1 mt-4">
            {t("addressdetails.postalCode")}: {addressDetails.postalCode || "-"}
          </div>
          <div className="text-[#33475b] font-poppins-light leading-6 mb-3 mt-2">
            {t("addressdetails.location")}: {addressDetails.location || "-"}
          </div>
          <div className="text-[#33475b] font-poppins-light leading-6 mb-1 mt-4">
            {t("addressdetails.street")}: {addressDetails.street || "-"}
          </div>
          <div className="text-[#33475b] font-poppins-light leading-6 mb-3 mt-2">
            {t("addressdetails.houseNumberAndSuffix")}:{" "}
            {addressDetails.houseNumber || "-"} /{" "}
            {addressDetails.houseNumberSuffix || "-"}
          </div>
          <div className="w-full h-0.5 bg-green-500 mb-4" />
          <div className="text-[#33475b] font-quando text-base leading-6 mb-1 mt-5">
            {t("sepaCard.furtherInfo")}
          </div>
          <div className="text-[#33475b] font-poppins-light leading-6 mb-1 mt-4">
            {t("addressdetails.desiredStart")}:{" "}
            {addressDetails.desiredStart || "-"}
          </div>
          <div className="text-[#33475b] font-poppins-light leading-6 mb-3 mt-2">
            {t("addressdetails.previousSupplier")}:{" "}
            {addressDetails.previousSupplier || "-"}
          </div>
          <div className="text-[#33475b] font-poppins-light leading-6 mb-1 mt-4">
            {t("addressdetails.previousCustomerNo")}:{" "}
            {addressDetails.previousCustomerNo || "-"}
          </div>
          <div className="text-[#33475b] font-poppins-light leading-6 mb-3 mt-2">
            {t("addressdetails.meterNo")}: {addressDetails.meterNo || "-"}
          </div>
          <div className="text-[#33475b] font-poppins-light leading-6 mb-3 mt-2">
            {t("addressdetails.meterLocationNo")}:{" "}
            {addressDetails.meterLocationNo || "-"}
          </div>
          <div className="w-full h-0.5 bg-green-500 mb-4" />
          <div className="text-[#33475b] font-quando text-base leading-6 mb-2">
            {t("addresscard.advertisingPartner")}:
            <div className="text-[#33475b] font-poppins-light text-base leading-6 mb-1 mt-4">
              Aram Energy Solution
            </div>
            <div className="text-[#33475b] font-poppins-light text-base leading-6 mb-3 mt-2">
              Energie Service Pool GmbH
            </div>
          </div>
        </div>
        {/* Logos */}
        <div className="flex justify-around mt-2">
          <div
            className="flex-shrink-0 w-[6.0625rem] h-[3.5625rem] bg-[url('/AramLogoBlack.svg')] bg-cover bg-center rounded"
            style={{ aspectRatio: "97/57" }}
          />
          <div
            className="flex-shrink-0 w-[3.4375rem] h-[3.5625rem] bg-[url('/partner2.png')] bg-cover bg-center rounded"
            style={{ aspectRatio: "55/57" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SepaCard;
