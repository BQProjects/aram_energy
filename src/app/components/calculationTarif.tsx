import Image from "next/image";
import { useState } from "react";

export default function CalculationTarif() {
  const [selected, setSelected] = useState("electricity");
  const [customerType, setCustomerType] = useState("private");

  return (
    <div
      className="mt-8 flex flex-col items-center justify-start h-auto w-full max-w-[1076px] pb-8 px-4 sm:px-8 lg:px-12"
      style={{
        background: "rgba(0,0,0,0.48)",
        color: "#fff",
        fontFamily: "Poppins-Medium",
        fontSize: 16,
        fontWeight: 400,
      }}
    >
      {/* Top selection box */}
      <div
        className="flex items-center justify-between  mt-8"
        style={{
          width: 740,
          height: 64,
          background: "rgba(238,238,238,0.17)",
          padding: 8,
        }}
      >
        {/* Selection menu */}
        <button
          className="flex items-center justify-center "
          style={{
            width: 360,
            height: 48,
            background: selected === "electricity" ? "#FF9641" : "transparent",
            color: selected === "electricity" ? "#fff" : "#fff",
            fontFamily: "inter",
            fontSize: 16,
            fontWeight: 400,
            border: "none",
            outline: "none",
            transition: "background 0.2s, color 0.2s",
          }}
          onClick={() => setSelected("electricity")}
        >
          <Image
            src="/zap.svg"
            alt="Zap Logo"
            width={12}
            height={16}
            style={{ marginRight: 8 }}
          />
          Electricity
        </button>
        <button
          className="flex items-center justify-center "
          style={{
            width: 346,
            height: 48,
            background: selected === "gas" ? "#FF9641" : "transparent",
            color: selected === "gas" ? "#fff" : "#fff",
            fontFamily: "inter",
            fontSize: 16,
            fontWeight: 400,
            border: "none",
            outline: "none",
            transition: "background 0.2s, color 0.2s",
          }}
          onClick={() => setSelected("gas")}
        >
          <Image
            src="/gas.svg"
            alt="gas Logo"
            width={12}
            height={16}
            style={{ marginRight: 8 }}
          />
          Gas
        </button>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Image
          src="/infoI.svg"
          alt="infoI Logo"
          width={12}
          height={16}
          style={{ marginRight: 8 }}
        />
        <span
          style={{
            fontFamily: "Poppins-Medium",
            fontSize: 16,
            fontWeight: 400,
          }}
        >
          Customer type
        </span>
      </div>
      {/* 3D switch with Private/Company text - moved below Customer type */}
      <div className="ml-6 flex items-center gap-8 mt-4">
        <div className="flex items-center">
          <Image
            src="/person.svg"
            alt="person Logo"
            width={12}
            height={16}
            style={{ marginRight: 0 }}
          />
          <span
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 14,
              fontWeight: 400,
              color: "#fff",
              marginLeft: 4,
            }}
          >
            Private
          </span>
        </div>
        <div
          className="flex items-center justify-center"
          style={{
            width: 55,
            height: 25,
            background: "#FF9641",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            position: "relative",
            cursor: "pointer",
          }}
          onClick={() =>
            setCustomerType(customerType === "private" ? "company" : "private")
          }
        >
          <div
            style={{
              width: 21,
              height: 21,
              background: "#FFFFFF",
              borderRadius: "50%",
              position: "absolute",
              left: customerType === "private" ? 2 : 32,
              top: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              transition: "left 0.2s",
            }}
          ></div>
        </div>
        <div className="flex items-center">
          <Image
            src="/company.svg"
            alt="company Logo"
            width={12}
            height={16}
            style={{ marginRight: 0 }}
          />
          <span
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 14,
              fontWeight: 400,
              color: "#fff",
              marginLeft: 4,
            }}
          >
            Company
          </span>
        </div>
      </div>
      <span
        className="mt-4"
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 16,
          fontWeight: 400,
        }}
      >
        Annual consumption in kWh
      </span>
      {/* 2x2 grid of text fields */}
      <div
        className="mt-6 grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-6"
        style={{ width: 800 }}
      >
        {/* Postal code */}
        <div className="flex flex-col" style={{ width: 380 }}>
          <label
            htmlFor="postalCode"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 14,
              fontWeight: 400,
              color: "#fff",
              marginBottom: 6,
            }}
          >
            Postal code
          </label>
          <div style={{ position: "relative", width: 380 }}>
            <input
              id="postalCode"
              type="text"
              style={{
                width: 380,
                height: 50,
                borderRadius: 8,
                border: "1px solid #E0E0E0",
                background: "#fff",
                fontFamily: "Poppins, sans-serif",
                fontSize: 14,
                fontWeight: 400,
                paddingLeft: 16,
                color: "#171717",
                paddingRight: 40,
              }}
              placeholder="Enter postal code"
            />
            <Image
              src="/location.svg"
              alt="Location Icon"
              width={12}
              height={16}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
        {/* Annual consumption in kWh */}
        <div className="flex flex-col" style={{ width: 380 }}>
          <label
            htmlFor="annualConsumption"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 14,
              fontWeight: 400,
              color: "#fff",
              marginBottom: 6,
            }}
          >
            Annual consumption in kWh
          </label>
          <input
            id="annualConsumption"
            type="text"
            style={{
              width: 380,
              height: 50,
              borderRadius: 8,
              border: "1px solid #E0E0E0",
              background: "#fff",
              fontFamily: "Poppins, sans-serif",
              fontSize: 14,
              fontWeight: 400,
              paddingLeft: 16,
              color: "#171717",
            }}
            placeholder="Enter annual consumption"
          />
        </div>
        {/* Tariff key */}
        <div className="flex flex-col" style={{ width: 380 }}>
          <label
            htmlFor="tariffKey"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 14,
              fontWeight: 400,
              color: "#fff",
              marginBottom: 6,
            }}
          >
            Tariff key
          </label>
          <input
            id="tariffKey"
            type="text"
            style={{
              width: 380,
              height: 50,
              borderRadius: 8,
              border: "1px solid #E0E0E0",
              background: "#fff",
              fontFamily: "Poppins, sans-serif",
              fontSize: 14,
              fontWeight: 400,
              paddingLeft: 16,
              color: "#171717",
            }}
            placeholder="Enter tariff key"
          />
        </div>
        {/* Transaction key */}
        <div className="flex flex-col" style={{ width: 380 }}>
          <label
            htmlFor="transactionKey"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 14,
              fontWeight: 400,
              color: "#fff",
              marginBottom: 6,
            }}
          >
            Transaction key
          </label>
          <input
            id="transactionKey"
            type="text"
            style={{
              width: 380,
              height: 50,
              borderRadius: 8,
              border: "1px solid #E0E0E0",
              background: "#fff",
              fontFamily: "Poppins, sans-serif",
              fontSize: 14,
              fontWeight: 400,
              paddingLeft: 16,
              color: "#171717",
            }}
            placeholder="Enter transaction key"
          />
        </div>
        {/* Calculate Tariff button */}
        <div className="col-span-2 flex justify-center mt-8">
          <button
            style={{
              width: 300,
              height: 50,
              background: "#FF9641",
              color: "#fff",
              borderRadius: 8,
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: 16,
              border: "none",
              outline: "none",
              cursor: "pointer",
            }}
          >
            Calculate Tariff
          </button>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <Image
          src="/question.svg"
          alt="question Logo"
          width={14}
          height={14}
          style={{ marginRight: 10 }}
        />
        <span
          style={{
            fontFamily: "Poppins-Medium",
            fontSize: 14,
            fontWeight: 400,
            color: "#fff",
            marginLeft: 4,
          }}
        >
          Do you need help calculating your consumption?
        </span>
      </div>
    </div>
  );
}
