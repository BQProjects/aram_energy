"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

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

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchSubmissions = useCallback(async () => {
    try {
      // Get token from cookie
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("adminToken="))
        ?.split("=")[1];

      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch("/api/admin/submissions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      } else {
        if (response.status === 401) {
          document.cookie =
            "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          router.push("/admin");
        }
      }
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    // Check if user is authenticated
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("adminToken="))
      ?.split("=")[1];

    if (!token) {
      router.push("/admin");
      return;
    }

    fetchSubmissions();
  }, [router, fetchSubmissions]);

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.personalDetails?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      submission.personalDetails?.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      submission.personalDetails?.phone?.includes(searchTerm) ||
      submission.personalDetails?.surname
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    document.cookie =
      "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="mr-4 text-orange-500 hover:text-orange-400"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-white">
                Manage Submissions
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Search and Stats */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="text-white">
              <h2 className="text-xl font-semibold">
                Total Submissions: {submissions.length}
              </h2>
            </div>
            <div className="w-64">
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-700 text-white"
              />
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-700">
            {filteredSubmissions.length === 0 ? (
              <li className="px-6 py-8 text-center text-gray-400">
                {searchTerm
                  ? "No submissions found matching your search."
                  : "No submissions found."}
              </li>
            ) : (
              filteredSubmissions.map((submission) => (
                <li
                  key={submission._id}
                  className="px-6 py-4 cursor-pointer hover:bg-gray-700 transition-colors"
                  onClick={() =>
                    router.push(`/admin/submissions/${submission._id}`)
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {submission.personalDetails?.name &&
                            submission.personalDetails?.surname
                              ? `${submission.personalDetails.name} ${submission.personalDetails.surname}`
                              : submission.personalDetails?.name || "Anonymous"}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {submission.personalDetails?.email} •{" "}
                            {submission.personalDetails?.phone}
                          </p>
                          <p className="text-sm text-gray-400">
                            {submission.addressDetails?.billingCity ||
                              submission.addressDetails?.street}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-orange-400 font-medium">
                            {submission.selectedTariff?.selectedTariffData
                              ?.name || submission.calculationTarif?.selected}
                          </p>
                          <p className="text-sm text-gray-400">
                            Consumption:{" "}
                            {submission.calculationTarif?.annualConsumption} kWh
                          </p>
                          <p className="text-xs text-gray-500">
                            {typeof submission.submittedAt === "object" &&
                            submission.submittedAt?.$date?.$numberLong
                              ? new Date(
                                  parseInt(
                                    submission.submittedAt.$date.$numberLong
                                  )
                                ).toLocaleDateString()
                              : new Date().toLocaleDateString()}{" "}
                            {typeof submission.submittedAt === "object" &&
                            submission.submittedAt?.$date?.$numberLong
                              ? new Date(
                                  parseInt(
                                    submission.submittedAt.$date.$numberLong
                                  )
                                ).toLocaleTimeString()
                              : new Date().toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
