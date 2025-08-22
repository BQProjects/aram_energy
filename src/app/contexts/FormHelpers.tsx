"use client";
import { useCallback } from "react";
import { useCalculationTarif } from "./CalculationTarifContext";

// Helper hooks for accessing specific sections of the form
export const useCalculationTarifSection = () => {
  const { state, updateState } = useCalculationTarif();

  const update = useCallback(
    (newData: Partial<typeof state.calculationTarif>) => {
      updateState({
        calculationTarif: { ...state.calculationTarif, ...newData },
      });
    },
    [state.calculationTarif, updateState]
  );

  return {
    data: state.calculationTarif,
    update,
  };
};

export const usePersonalDetailsSection = () => {
  const { state, updateState } = useCalculationTarif();

  const update = useCallback(
    (newData: Partial<typeof state.personalDetails>) => {
      updateState({
        personalDetails: { ...state.personalDetails, ...newData },
      });
    },
    [state.personalDetails, updateState]
  );

  return {
    data: state.personalDetails,
    update,
  };
};

export const useAddressDetailsSection = () => {
  const { state, updateState } = useCalculationTarif();

  const update = useCallback(
    (newData: Partial<typeof state.addressDetails>) => {
      updateState({ addressDetails: { ...state.addressDetails, ...newData } });
    },
    [state.addressDetails, updateState]
  );

  return {
    data: state.addressDetails,
    update,
  };
};

export const useSepaFormSection = () => {
  const { state, updateState } = useCalculationTarif();

  const update = useCallback(
    (newData: Partial<typeof state.sepaForm>) => {
      updateState({ sepaForm: { ...state.sepaForm, ...newData } });
    },
    [state.sepaForm, updateState]
  );

  return {
    data: state.sepaForm,
    update,
  };
};

export const useSelectedTariffSection = () => {
  const { state, updateState } = useCalculationTarif();

  const updateSelectedTariff = useCallback(
    (newData: Partial<typeof state.selectedTariff>) => {
      updateState({ selectedTariff: { ...state.selectedTariff, ...newData } });
    },
    [state.selectedTariff, updateState]
  );

  const updateSelectedTariffData = useCallback(
    (newData: Partial<typeof state.selectedTariffData>) => {
      updateState({
        selectedTariffData: { ...state.selectedTariffData, ...newData },
      });
    },
    [state.selectedTariffData, updateState]
  );

  return {
    selectedTariff: state.selectedTariff,
    selectedTariffData: state.selectedTariffData,
    updateSelectedTariff,
    updateSelectedTariffData,
  };
};

export const usePostalOptionsSection = () => {
  const { state, updateState } = useCalculationTarif();

  const update = useCallback(
    (newData: typeof state.postalOptions) => {
      updateState({ postalOptions: newData });
    },
    [updateState]
  );

  return {
    data: state.postalOptions,
    update,
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
