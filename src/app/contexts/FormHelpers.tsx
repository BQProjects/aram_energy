"use client";
import { useCalculationTarif } from "./CalculationTarifContext";

// Helper hooks for accessing specific sections of the form
export const useCalculationTarifSection = () => {
  const { state, updateState } = useCalculationTarif();

  return {
    data: state.calculationTarif,
    update: (newData: Partial<typeof state.calculationTarif>) => {
      updateState({
        calculationTarif: { ...state.calculationTarif, ...newData },
      });
    },
  };
};

export const usePersonalDetailsSection = () => {
  const { state, updateState } = useCalculationTarif();

  return {
    data: state.personalDetails,
    update: (newData: Partial<typeof state.personalDetails>) => {
      updateState({
        personalDetails: { ...state.personalDetails, ...newData },
      });
    },
  };
};

export const useAddressDetailsSection = () => {
  const { state, updateState } = useCalculationTarif();

  return {
    data: state.addressDetails,
    update: (newData: Partial<typeof state.addressDetails>) => {
      updateState({ addressDetails: { ...state.addressDetails, ...newData } });
    },
  };
};

export const useSepaFormSection = () => {
  const { state, updateState } = useCalculationTarif();

  return {
    data: state.sepaForm,
    update: (newData: Partial<typeof state.sepaForm>) => {
      updateState({ sepaForm: { ...state.sepaForm, ...newData } });
    },
  };
};

export const useSelectedTariffSection = () => {
  const { state, updateState } = useCalculationTarif();

  return {
    selectedTariff: state.selectedTariff,
    selectedTariffData: state.selectedTariffData,
    updateSelectedTariff: (newData: Partial<typeof state.selectedTariff>) => {
      updateState({ selectedTariff: { ...state.selectedTariff, ...newData } });
    },
    updateSelectedTariffData: (
      newData: Partial<typeof state.selectedTariffData>
    ) => {
      updateState({
        selectedTariffData: { ...state.selectedTariffData, ...newData },
      });
    },
  };
};

export const usePostalOptionsSection = () => {
  const { state, updateState } = useCalculationTarif();

  return {
    data: state.postalOptions,
    update: (newData: typeof state.postalOptions) => {
      updateState({ postalOptions: newData });
    },
  };
};

// Helper to get session info
export const useSessionInfo = () => {
  const { state, loading, isInitialized } = useCalculationTarif();

  return {
    sessionId: state.sessionId,
    objectId: state._id,
    loading,
    isInitialized,
  };
};
