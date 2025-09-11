"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

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
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("adminToken="))
          ?.split("=")[1];

        if (!token) {
          router.push("/admin");
          return;
        }

        const response = await fetch(`/api/admin/submissions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSubmission(data);
        } else {
          if (response.status === 401) {
            document.cookie =
              "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            router.push("/admin");
          } else {
            console.error("Failed to fetch submission");
          }
        }
      } catch (error) {
        console.error("Error fetching submission:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [id, router]);

  const handleLogout = () => {
    document.cookie =
      "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin");
  };

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

    const getStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
        case "pending":
          return "bg-yellow-500";
        case "approved":
          return "bg-green-500";
        case "rejected":
          return "bg-red-500";
        case "completed":
          return "bg-blue-500";
        default:
          return "bg-gray-500";
      }
    };

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
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl rounded-xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-orange-600 to-orange-700">
            <h2 className="text-xl font-bold text-white flex items-center">
              <span className="mr-3">📊</span>
              Submission Overview
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getStatusColor(
                    submission.status
                  )} text-white font-bold text-lg mb-2`}
                >
                  {submission.status.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-lg font-semibold text-white">Status</h3>
                <p className="text-gray-400 capitalize">{submission.status}</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white mb-2">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Submitted</h3>
                <p className="text-gray-400">
                  {formatDate(submission.submittedAt)}
                </p>
              </div>
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                    submission.emailConfirmed ? "bg-green-500" : "bg-red-500"
                  } text-white mb-2`}
                >
                  <span className="text-2xl">
                    {submission.emailConfirmed ? "✓" : "✗"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Email Confirmed
                </h3>
                <p className="text-gray-400">
                  {submission.emailConfirmed ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Details */}
        <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 shadow-xl rounded-xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
            <h3 className="text-lg font-semibold text-white flex items-center">
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
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-600"
                  >
                    <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <div className="text-white font-medium">
                      {renderValue(value, key)}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="bg-gradient-to-br from-green-900/20 to-teal-900/20 shadow-xl rounded-xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-teal-600">
            <h3 className="text-lg font-semibold text-white flex items-center">
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
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-600"
                  >
                    <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <div className="text-white font-medium">
                      {renderValue(value, key)}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Selected Tariff */}
        <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 shadow-xl rounded-xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-yellow-600 to-orange-600">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="mr-3">⚡</span>
              Selected Tariff
            </h3>
          </div>
          <div className="p-6">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(
                  submission.selectedTariff.selectedTariffData
                ).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-2xl font-bold text-orange-400 mb-1">
                      {key === "total"
                        ? "€"
                        : key === "basePrice" || key === "laborPrice"
                        ? "€"
                        : ""}
                      {renderValue(value, key)}
                    </div>
                    <div className="text-sm text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 shadow-xl rounded-xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-600">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="mr-3">🏠</span>
              Address Information
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(submission.addressDetails).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-gray-800/50 rounded-lg p-4 border border-gray-600"
                >
                  <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <div className="text-white font-medium">
                    {renderValue(value, key)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 shadow-xl rounded-xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="mr-3">💳</span>
              Payment Information
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(submission.sepaForm).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-gray-800/50 rounded-lg p-4 border border-gray-600"
                >
                  <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <div className="text-white font-medium">
                    {key === "iban" ? (
                      <span className="font-mono">
                        {renderValue(value, key)}
                      </span>
                    ) : (
                      renderValue(value, key)
                    )}
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
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 text-orange-400 hover:text-orange-300 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="text-xl">←</span>
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Submission Details
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  View and manage customer submission information
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
                <span>📋</span>
                <span>ID: {id}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Logout
              </button>
            </div>
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
