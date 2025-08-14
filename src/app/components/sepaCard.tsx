import React, { useEffect, useState } from "react";

interface PersonalDetails {
  postalCode?: string;
  location?: string;
  street?: string;
  houseNumber?: string;
  houseNumberSuffix?: string;
  previousCustomerNo?: string;
  meterNo?: string;
  meterLocationNo?: string;
  desiredStart?: string;
  previousSupplier?: string;
}

const SepaCard: React.FC = () => {
  const [personal, setPersonal] = useState<PersonalDetails>({});

  useEffect(() => {
    const load = () => {
      try {
        const saved = localStorage.getItem("personalDetails");
        if (saved) {
          setPersonal(JSON.parse(saved));
        }
      } catch {}
    };
    load();
    const interval = setInterval(load, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card_2 flex-shrink-0 w-[21.8125rem] h-[750px] bg-white shadow-[0_1px_5px_0_rgba(45,62,80,0.12)] rounded-lg flex flex-col relative ml-0 p-0">
      {/* Orange vertical bar */}
      <div className="absolute left-0 top-0 w-1.5 h-full bg-[#ff9641] rounded-tl-lg rounded-bl-lg" />
      {/* Content */}
      <div className="pl-6 pr-4 py-6 flex flex-col justify-between h-full gap-0">
        <div>
          <div className="text-[#33475b] font-poppins text-sm font-light leading-6 mb-1">
            Delivery point information:
          </div>
          <div className="text-[#33475b] font-poppins text-sm font-semibold leading-6 mb-1 mt-4">
            Postal code: {personal.postalCode || "-"}
          </div>
          <div className="text-[#33475b] font-poppins text-sm font-semibold leading-6 mb-3 mt-2">
            Location: {personal.location || "-"}
          </div>
          <div className="text-[#33475b] font-poppins text-sm font-semibold leading-6 mb-1 mt-4">
            Street: {personal.street || "-"}
          </div>
          <div className="text-[#33475b] font-poppins text-sm font-semibold leading-6 mb-3 mt-2">
            House number */ House number suffix: {personal.houseNumber || "-"} /{" "}
            {personal.houseNumberSuffix || "-"}
          </div>
          <div className="w-full h-0.5 bg-green-500 mb-3" />
          <div className="text-[#33475b] font-poppins text-sm font-light leading-6 mb-1">
            Further information
          </div>
          <div className="text-[#33475b] font-poppins text-sm font-semibold leading-6 mb-1 mt-4">
            Desired start of delivery: {personal.desiredStart || "-"}
          </div>
          <div className="text-[#33475b] font-poppins text-sm font-semibold leading-6 mb-3 mt-2">
            Previous supplier: {personal.previousSupplier || "-"}
          </div>
          <div className="text-[#33475b] font-poppins text-sm font-semibold leading-6 mb-1 mt-4">
            Previous customer No: {personal.previousCustomerNo || "-"}
          </div>
          <div className="text-[#33475b] font-poppins text-sm font-semibold leading-6 mb-3 mt-2">
            Meter No: {personal.meterNo || "-"}
          </div>
          <div className="text-[#33475b] font-poppins text-sm font-semibold leading-6 mb-3 mt-2">
            Meter location No: {personal.meterLocationNo || "-"}
          </div>
          <div className="w-full h-0.5 bg-green-500 mb-3" />
          <div className="text-[#33475b] font-poppins text-sm font-light leading-6 mb-1">
            Advertising business partner:
            <div className="text-[#33475b] font-poppins text-sm font-semibold leading-6 mb-3 mt-4">
              Aram Energy Solution
            </div>
            <div className="text-[#33475b] font-poppins text-sm font-semibold leading-6 mb-3 mt-2">
              Energie Service Pool GmbH
            </div>
          </div>
        </div>
        {/* Logos */}
        <div className="flex gap-4 mt-2">
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
