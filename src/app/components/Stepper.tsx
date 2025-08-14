import React from "react";

interface StepperProps {
  currentStep: number; // 1-based index
}

const steps = [
  { label: "Calculator" },
  { label: "Select one option" },
  { label: "Personal details" },
  { label: "Address details" },
  { label: "Payment method" },
];

const Stepper: React.FC<StepperProps> = ({ currentStep }) => (
  <div className="stepper flex items-center gap-4 pt-7 pr-7 pb-7 pl-7 w-full max-w-[1191px] mx-auto justify-center">
    {steps.map((step, idx) => (
      <React.Fragment key={idx}>
        <div className="steps flex flex-shrink-0 items-center w-[8.125rem]">
          <div
            className={`flex flex-col flex-shrink-0 justify-center items-center gap-2.5 py-2 px-3 w-[1.9375rem] h-[1.9375rem] rounded-lg border-[0.5px] ${
              idx + 1 <= currentStep
                ? "border-[#ff9641] bg-[#ff9641] text-white"
                : "border-[#f1f2f9] bg-white text-[#514f6e]"
            }`}
          >
            {idx === 0 ? (
              // Show checkmark for first step if completed, else icon
              currentStep > 1 ? (
                <svg width={17} height={17} viewBox="0 0 17 17" fill="none">
                  <path
                    d="M4 9l3 3 6-6"
                    stroke="#fff"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              ) : (
                <svg width={17} height={17} viewBox="0 0 17 17" fill="none">
                  <circle
                    cx="8.5"
                    cy="8.5"
                    r="8"
                    stroke="#FF9641"
                    strokeWidth="1.5"
                  />
                </svg>
              )
            ) : (
              <span className="font-semibold">{idx + 1}</span>
            )}
          </div>
          <div
            className={`ml-2 font-poppins-medium text-sm font-medium leading-[115%] ${
              idx + 1 === currentStep
                ? "text-[#ff9641]"
                : idx + 1 < currentStep
                ? "text-[#ff9641]"
                : "text-[#a0a3bd]"
            }`}
          >
            {step.label}
          </div>
        </div>
        {idx < steps.length - 1 && (
          <div
            className={`flex-shrink-0 w-14 h-[0.1875rem] rounded-full ${
              idx + 1 < currentStep
                ? "bg-[#ff9641]"
                : idx + 1 === currentStep
                ? "bg-[#ff9641]"
                : "bg-[#d9dbe9]"
            }`}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);

export default Stepper;
