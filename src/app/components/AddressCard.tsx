import React, { useEffect, useState } from "react";

interface PersonalDetails {
  salutation?: string;
  name?: string;
  surname?: string;
  billing?: string;
  birthDate?: string;
  email?: string;
  repeatEmail?: string;
  phone?: string;
}

const AddressCard: React.FC = () => {
  const [personal, setPersonal] = useState<PersonalDetails>({});

  useEffect(() => {
    // Function to load from localStorage
    const load = () => {
      try {
        const saved = localStorage.getItem("personalDetails");
        if (saved) {
          setPersonal(JSON.parse(saved));
        }
      } catch {}
    };
    load();
    // Poll every 500ms for changes
    const interval = setInterval(load, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card_2 flex-shrink-0 w-[21.8125rem] h-[611px] bg-white shadow-[0_1px_5px_0_rgba(45,62,80,0.12)] rounded-lg flex flex-col relative ml-0 p-0">
      {/* Orange vertical bar */}
      <div className="absolute left-0 top-0 w-1.5 h-full bg-[#ff9641] rounded-tl-lg rounded-bl-lg" />
      {/* Content */}
      <div className="pl-6 pr-4 py-6 flex flex-col justify-between h-full gap-0">
        <div>
          <div className="text-[#33475b] font-poppins text-sm font-light leading-6 mb-1">
            Personal information:
          </div>
          <div className="text-[#33475b] font-poppins text-sm font-semibold leading-6 mb-1 mt-4">
            Salutation: {personal.salutation || "-"}
          </div>
          <div className="text-[#33475b] font-poppins text-sm font-semibold leading-6 mb-3 mt-2">
            Name: {personal.name || "-"} {personal.surname || ""}
          </div>
          <div className="w-full h-0.5 bg-green-500 mb-3" />
          <div className="text-[#33475b] font-poppins text-sm font-light leading-6 mb-1 mt-4">
            Further information
          </div>
          <div className="text-[#33475b] font-poppins text-sm font-semibold leading-6 mb-1 mt-4">
            Birth date: {personal.birthDate || "-"}
          </div>
          <div className="text-[#33475b] font-poppins text-sm font-semibold leading-6 mb-3 mt-2">
            E-mail address: {personal.email || "-"}
          </div>
          <div className="text-[#33475b] font-poppins text-sm font-semibold leading-6 mb-3 mt-2">
            Telephone number: {personal.phone || "-"}
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

export default AddressCard;
