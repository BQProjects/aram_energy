"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import LogoutButton from "@/app/components/LogoutButton";

interface Submission {
  _id: string;
  calculationTarif: {
    selected: string;
    customerType: string;
    postalCode: string;
    annualConsumption: string;
    postalOptions: unknown[];
  };
  personalDetails: {
    salutation: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    birthDate?: string;
  };
  selectedTariff: {
    selectedTariffId: number;
    selectedTariffData: {
      id: number;
      name: string;
      basePrice: string;
      laborPrice: string;
      typeOfCurrent: string;
      contractTerm: string;
      priceGuarantee: string;
      total: string;
    };
  };
  addressDetails: {
    billing: string;
    billingStreet?: string;
    billingCity?: string;
    postalCode?: string;
    street?: string;
    houseNumber?: string;
    desiredStart?: string;
  };
  sepaForm: {
    iban: string;
    accountHolder: string;
    status: string;
  };
  emailConfirmed: boolean;
  submittedAt: { $date: { $numberLong: string } } | string;
  status: string;
  [key: string]: string | number | boolean | object | undefined;
}

function ViewSubmissionContent() {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    if (!id) {
      router.push("/admin/submissions");
      return;
    }

    const fetchSubmission = async () => {
      try {
        // Use credentials: 'include' to send httpOnly cookies
        const response = await fetch(`/api/admin/submissions/${id}`, {
          credentials: "include", // This sends httpOnly cookies
        });

        if (response.ok) {
          const data = await response.json();
          setSubmission(data);
        } else {
          console.error("Failed to fetch submission - redirecting to login");
          router.push("/admin");
        }
      } catch (error) {
        console.error("Error fetching submission:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [id, router]);

  const renderValue = (
    value: unknown,
    key: string = "",
    depth: number = 0
  ): React.JSX.Element => {
    if (value === null || value === undefined) {
      return <span className="text-gray-500">N/A</span>;
    }

    if (typeof value === "boolean") {
      return (
        <span className={value ? "text-green-400" : "text-red-400"}>
          {value ? "Yes" : "No"}
        </span>
      );
    }

    if (typeof value === "string" || typeof value === "number") {
      // Special handling for dates
      if (
        key.toLowerCase().includes("date") ||
        key.toLowerCase().includes("at")
      ) {
        try {
          const date = new Date(value);
          if (!isNaN(date.getTime())) {
            return <span>{date.toLocaleString()}</span>;
          }
        } catch {}
      }
      return <span>{String(value)}</span>;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <span className="text-gray-500">Empty array</span>;
      }
      return (
        <div className="ml-4">
          {value.map((item: unknown, index: number) => (
            <div key={index} className="mb-2">
              <span className="text-orange-400">[{index}]: </span>
              {renderValue(item, "", depth + 1)}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === "object") {
      return (
        <div
          className={`ml-4 ${depth > 0 ? "border-l border-gray-600 pl-4" : ""}`}
        >
          {Object.entries(value as Record<string, unknown>).map(([k, v]) => (
            <div key={k} className="mb-2">
              <span className="text-orange-400 font-medium">{k}: </span>
              {renderValue(v, k, depth + 1)}
            </div>
          ))}
        </div>
      );
    }

    return <span>{String(value)}</span>;
  };

  const renderSubmissionDetails = () => {
    if (!submission) return null;

    const formatDate = (
      dateValue: string | { $date: { $numberLong: string } }
    ) => {
      try {
        let dateString: string;
        if (typeof dateValue === "string") {
          dateString = dateValue;
        } else if (
          dateValue &&
          dateValue.$date &&
          dateValue.$date.$numberLong
        ) {
          dateString = new Date(
            parseInt(dateValue.$date.$numberLong)
          ).toISOString();
        } else {
          return "Invalid Date";
        }
        return new Date(dateString).toLocaleDateString();
      } catch {
        return "Invalid Date";
      }
    };

    return (
      <div className="space-y-8">
        {/* Status Overview Card */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gray-700">
            <h2 className="text-xl font-poppins-regular text-gray-400 flex items-center">
              <span className="mr-3">📊</span>
              Submission Overview
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white mb-2">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="text-md font-poppins-regular text-gray-400">
                  Submitted
                </h3>
                <p className="text-gray-400 font-poppins-regular">
                  {formatDate(submission.submittedAt)}
                </p>
              </div>
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                    submission.emailConfirmed ? "bg-green-500" : "bg-red-500"
                  } text-white mb-2`}
                >
                  <span className="text-2xl font-poppins-regular">
                    {submission.emailConfirmed ? "✓" : "✗"}
                  </span>
                </div>
                <h3 className="text-md font-poppins-regular text-gray-400">
                  Email Confirmed
                </h3>
                <p className="text-gray-400 font-poppins-regular">
                  {submission.emailConfirmed ? "Yes" : "No"}
                </p>
              </div>
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-700
                  text-white font-bold text-lg mb-2`}
                >
                  👍
                </div>
                <h3 className="text-md font-poppins-regular text-gray-400">
                  Status
                </h3>
                <p className="text-gray-400 capitalize font-poppins-regular">
                  {submission.status}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Details */}
        <div className=" shadow-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gray-700">
            <h3 className="text-lg font-poppins-regular text-gray-400 flex items-center">
              <span className="mr-3">🧮</span>
              Calculation Details
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(submission.calculationTarif).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="bg-gray-800/50 p-4 border border-gray-600"
                  >
                    <div className="flex justify-between space-x-2">
                      <label className="text-md font-poppins-regular text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      <div className="text-white text-md font-poppins-regular">
                        {renderValue(value, key)}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border shadow-xl border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gray-700">
            <h3 className="text-lg font-poppins-regular text-gray-400 flex items-center">
              <span className="mr-3">👤</span>
              Personal Information
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(submission.personalDetails).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="bg-gray-800/50 p-4 border border-gray-600"
                  >
                    <div className="flex justify-between space-x-2">
                      <label className="block text-md font-poppins-regular text-gray-400 mb-2 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      <div className="text-white text-md font-poppins-regular">
                        {renderValue(value, key)}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Selected Tariff */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gray-700">
            <h3 className="text-lg font-poppins-regular text-gray-400 flex items-center">
              <span className="mr-3">⚡</span>
              Selected Tariff
            </h3>
          </div>
          <div className="p-6">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(submission.selectedTariff.selectedTariffData)
                  .filter(([key]) => !key.endsWith("Value")) // Filter out basePriceValue, laborPriceValue, totalValue
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-gray-800/50 p-4 border border-gray-600"
                    >
                      <div className="flex justify-between space-x-2">
                        <label className="block text-md font-poppins-regular text-gray-400 mb-2 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        <div className="text-white font-poppins-regular text-md">
                          {renderValue(value, key)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gray-700">
            <h3 className="text-lg font-poppins-regular text-gray-400 flex items-center">
              <span className="mr-3">🏠</span>
              Address Information
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(submission.addressDetails)
                .filter(([key]) => {
                  // Hide billing details if billing is same as main address, but keep the billing field itself
                  if (
                    submission.addressDetails.billing === "same" &&
                    key.startsWith("billing") &&
                    key !== "billing"
                  ) {
                    return false;
                  }
                  return true;
                })
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-gray-800/50 p-4 border border-gray-600"
                  >
                    <div className="flex justify-between space-x-2">
                      <label className="block text-md font-poppins-regular text-gray-400 mb-2 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      <div className="text-white font-poppins-regular text-md">
                        {renderValue(value, key)}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border shadow-xl border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gray-700">
            <h3 className="text-lg font-poppins-regular text-gray-400 flex items-center">
              <span className="mr-3">💳</span>
              Payment Information
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(submission.sepaForm).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-gray-800/50 p-4 border border-gray-600"
                >
                  <div className="flex justify-between space-x-2">
                    <label className="block text-md font-poppins-regular text-gray-400 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <div className="text-white font-poppins-regular text-md">
                      {key === "iban" ? (
                        <span className="font-poppins-regular text-md">
                          {renderValue(value, key)}
                        </span>
                      ) : (
                        renderValue(value, key)
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Submission not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 text-orange-400 hover:text-orange-300 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="text-xl">←</span>
              </button>
              <div className="flex flex-col space-y-1 ml-4">
                <h1 className="text-lg font-poppins-regular text-gray-400">
                  Submissions
                </h1>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <span>ID: {id}</span>
                </div>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
        {renderSubmissionDetails()}
      </main>
    </div>
  );
}

export default function ViewSubmission() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
        </div>
      }
    >
      <ViewSubmissionContent />
    </Suspense>
  );
}
