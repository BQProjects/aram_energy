"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

interface PostalOption {
  plz: string;
  district?: string;
  division: string;
  type: string;
}

interface PersonalDetails {
  salutation: string;
  name: string;
  surname: string;
  billing: string;
  birthDate: string;
  email: string;
  repeatEmail: string;
  phone: string;
}

interface SelectedTariff {
  selectedTariffId: number;
}

interface SelectedTariffData {
  id: number;
  name: string;
  basePrice: string;
  laborPrice: string;
  typeOfCurrent: string;
  contractTerm: string;
  priceGuarantee: string;
  downPayment: string;
  total: string;
}

interface AddressDetails {
  billingStreet: string;
  billingHouseNumber: string;
  billingHouseNumberSuffix: string;
  billingCity: string;
  billingPostal: string;
  billingCountry: string;
  postalCode: string;
  location: string;
  street: string;
  houseNumber: string;
  houseNumberSuffix: string;
  desiredStart: string;
  previousSupplier: string;
  previousCustomerNo: string;
  meterNo: string;
  meterLocationNo: string;
  moveInStatus: string;
  billing: string;
}

interface SepaForm {
  iban: string;
  accountHolder: string;
  sepaAgreement: boolean;
  emailConfirmed: boolean;
  emailConfirmedAt?: Date;
  submittedAt?: Date;
  status: string;
  originalSessionId: string;
}

interface CalculationTarifState {
  _id?: string;
  calculationTarif: {
    postalOptions: never[];
    selected: string;
    customerType: string;
    postalCode: string;
    annualConsumption: string;
  };
  postalOptions: PostalOption[];
  personalDetails: PersonalDetails;
  selectedTariff: SelectedTariff;
  selectedTariffData: SelectedTariffData;
  addressDetails: AddressDetails;
  sepaForm: SepaForm;
  sessionId: string | null;
}

interface CalculationTarifContextProps {
  state: CalculationTarifState;
  updateState: (newState: Partial<CalculationTarifState>) => void;
  loading: boolean;
  isInitialized: boolean;
}

const defaultState: CalculationTarifState = {
  calculationTarif: {
    selected: "electricity",
    customerType: "private",
    postalCode: "",
    annualConsumption: "",
    postalOptions: []
  },
  postalOptions: [],
  personalDetails: {
    salutation: "",
    name: "",
    surname: "",
    billing: "same",
    birthDate: "",
    email: "",
    repeatEmail: "",
    phone: "",
  },
  selectedTariff: {
    selectedTariffId: 0,
  },
  selectedTariffData: {
    id: 0,
    name: "",
    basePrice: "",
    laborPrice: "",
    typeOfCurrent: "",
    contractTerm: "",
    priceGuarantee: "",
    downPayment: "",
    total: "",
  },
  addressDetails: {
    billingStreet: "",
    billingHouseNumber: "",
    billingHouseNumberSuffix: "",
    billingCity: "",
    billingPostal: "",
    billingCountry: "",
    postalCode: "",
    location: "",
    street: "",
    houseNumber: "",
    houseNumberSuffix: "",
    desiredStart: "",
    previousSupplier: "",
    previousCustomerNo: "",
    meterNo: "",
    meterLocationNo: "",
    moveInStatus: "",
    billing: "same",
  },
  sepaForm: {
    iban: "",
    accountHolder: "",
    sepaAgreement: false,
    emailConfirmed: false,
    status: "draft",
    originalSessionId: "",
  },
  sessionId: null,
};

const CalculationTarifContext =
  createContext<CalculationTarifContextProps | null>(null);

export const CalculationTarifProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, setState] = useState<CalculationTarifState>(defaultState);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Generate ObjectId compatible string
  const generateObjectId = (): string => {
    const timestamp = Math.floor(Date.now() / 1000);
    const timestampHex = timestamp.toString(16);
    const randomHex = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    return (timestampHex + randomHex).slice(0, 24);
  };

  // Get ObjectId from URL
  const getObjectIdFromUrl = (): string | null => {
    if (typeof window === "undefined") return null;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
  };

  // Update URL with ObjectId
  const updateUrlWithObjectId = (objectId: string) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("id", objectId);
    window.history.replaceState(null, "", url.toString());
  };

  // Save data to MongoDB
  const saveData = useCallback(
    async (data: CalculationTarifState): Promise<void> => {
      try {
        if (!data.sessionId && !data._id) return;

        const response = await fetch("/api/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Failed to save session data");
        }
      } catch (error) {
        console.error("Failed to save session data:", error);
      }
    },
    []
  );

  // Debounce function specifically for CalculationTarifState
  const debounceStateUpdate = (
    func: (data: CalculationTarifState) => void,
    delay: number
  ) => {
    let timer: NodeJS.Timeout;
    return (data: CalculationTarifState) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(data), delay);
    };
  };

  // Create debounced version of saveData
  const debouncedSaveData = useCallback(
    (() => {
      const debounceFunc = debounceStateUpdate(
        (data: CalculationTarifState) => {
          saveData(data);
        },
        1000
      );
      return debounceFunc;
    })(),
    [saveData]
  );

  // Fetch data from MongoDB
  const fetchSessionData = useCallback(
    async (objectId: string): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch(`/api/session?id=${objectId}`);
        const data = await response.json();

        if (data.session && data.session._id) {
          setState(data.session);
        } else {
          // If no session found, create new one with this ObjectId
          const newState = {
            ...defaultState,
            _id: objectId,
            sessionId: objectId,
          };
          setState(newState);
          await saveData(newState);
        }
      } catch (error) {
        console.error("Failed to fetch session data:", error);
        // On error, create new session
        const newState = {
          ...defaultState,
          _id: objectId,
          sessionId: objectId,
        };
        setState(newState);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    },
    [saveData]
  );

  // Update state and trigger save
  const updateState = useCallback(
    (newState: Partial<CalculationTarifState>) => {
      setState((prevState) => {
        const updatedState = { ...prevState, ...newState };
        // Only save if initialized to avoid saving default state
        if (isInitialized) {
          debouncedSaveData(updatedState);
        }
        return updatedState;
      });
    },
    [isInitialized, debouncedSaveData]
  );

  // Initialize session on component mount
  useEffect(() => {
    const initializeSession = async () => {
      let objectId = getObjectIdFromUrl();

      if (!objectId) {
        // Generate new ObjectId and update URL
        objectId = generateObjectId();
        updateUrlWithObjectId(objectId);
        const newState = {
          ...defaultState,
          _id: objectId,
          sessionId: objectId,
        };
        setState(newState);
        setIsInitialized(true);
        // Save the initial state
        await saveData(newState);
      } else {
        // Fetch existing session data
        await fetchSessionData(objectId);
      }
    };

    initializeSession();
  }, [fetchSessionData, saveData]);

  return (
    <CalculationTarifContext.Provider
      value={{ state, updateState, loading, isInitialized }}
    >
      {children}
    </CalculationTarifContext.Provider>
  );
};

export const useCalculationTarif = () => {
  const context = useContext(CalculationTarifContext);
  if (!context) {
    throw new Error(
      "useCalculationTarif must be used within a CalculationTarifProvider"
    );
  }
  return context;
};
