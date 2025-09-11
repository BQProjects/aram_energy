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

interface DashboardStats {
  totalContacts: number;
  totalTariffs: number;
  totalSubmissions: number;
  recentSubmissions: Submission[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showClearDataModal, setShowClearDataModal] = useState(false);
  const [showUpdateCredentialsModal, setShowUpdateCredentialsModal] =
    useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [clearDataConfirm, setClearDataConfirm] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const router = useRouter();

  const fetchDashboardStats = useCallback(async () => {
    console.log("Dashboard: Fetching dashboard stats...");
    try {
      // Get token from cookie
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("adminToken="))
        ?.split("=")[1];

      console.log(
        "Dashboard: Using token:",
        token ? "Token present" : "No token"
      );

      if (!token) {
        console.log("Dashboard: No token found, redirecting to login");
        router.push("/admin");
        return;
      }

      const response = await fetch("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Dashboard: API response status:", response.status);
      if (response.ok) {
        const data = await response.json();
        console.log("Dashboard: Received data:", data);
        setStats(data);
      } else {
        const errorData = await response.json();
        console.log("Dashboard: API error:", errorData);
        // Token might be invalid - clear cookie
        document.cookie =
          "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/admin");
      }
    } catch (error) {
      console.error("Dashboard: Fetch error:", error);
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

    console.log(
      "Dashboard: Checking token:",
      token ? "Token exists" : "No token"
    );
    if (!token) {
      console.log("Dashboard: No token found, redirecting to login");
      router.push("/admin");
      return;
    }

    // Fetch dashboard stats
    fetchDashboardStats();
  }, [router, fetchDashboardStats]);

  const handleLogout = () => {
    document.cookie =
      "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin");
  };

  const handleClearData = async () => {
    if (clearDataConfirm !== "CLEAR ALL DATA") {
      alert("Please type 'CLEAR ALL DATA' to confirm");
      return;
    }

    setModalLoading(true);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("adminToken="))
        ?.split("=")[1];

      const response = await fetch("/api/admin/clear-data", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("All data cleared successfully!");
        setShowClearDataModal(false);
        setClearDataConfirm("");
        // Refresh the dashboard
        fetchDashboardStats();
      } else {
        alert("Failed to clear data");
      }
    } catch (error) {
      console.error("Error clearing data:", error);
      alert("Error clearing data");
    } finally {
      setModalLoading(false);
    }
  };

  const handleUpdateCredentials = async () => {
    if (!newUsername.trim() || !newPassword.trim()) {
      alert("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    setModalLoading(true);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("adminToken="))
        ?.split("=")[1];

      const response = await fetch("/api/admin/update-credentials", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newUsername: newUsername.trim(),
          newPassword,
        }),
      });

      if (response.ok) {
        alert("Credentials updated successfully! Please login again.");
        // Clear token and redirect to login
        document.cookie =
          "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/admin");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update credentials");
      }
    } catch (error) {
      console.error("Error updating credentials:", error);
      alert("Error updating credentials");
    } finally {
      setModalLoading(false);
    }
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
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
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
        {/* Quick Actions */}
        <div className="bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-white mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <button
                onClick={() => router.push("/admin/submissions")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Manage Submissions
              </button>
              <button
                onClick={() => router.push("/admin/ManageTarrif")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Manage Tariffs
              </button>
              <button
                onClick={() => setShowClearDataModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Clear Mongo Data
              </button>
              <button
                onClick={() => setShowUpdateCredentialsModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Update Credentials
              </button>
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        {stats?.recentSubmissions && stats.recentSubmissions.length > 0 && (
          <div className="mt-8 bg-gray-800 shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-white mb-4">
                Recent Submission
              </h3>
              <div className="space-y-4">
                {stats.recentSubmissions
                  .slice(0, 5)
                  .map((submission: Submission, index: number) => (
                    <div
                      key={index}
                      className="border border-gray-700 rounded-md p-4 cursor-pointer hover:bg-gray-700 transition-colors"
                      onClick={() =>
                        router.push(`/admin/submissions/${submission._id}`)
                      }
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-white">
                            {submission.personalDetails.name || "Anonymous"}
                          </p>
                          <p className="text-sm text-gray-400">
                            {submission.personalDetails.email ||
                              submission.personalDetails.phone}
                          </p>
                          <p className="text-sm text-gray-300 mt-1">
                            Tariff:{" "}
                            {submission.selectedTariff?.selectedTariffData
                              ?.name || "N/A"}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {(() => {
                            const date = submission.submittedAt;
                            if (typeof date === "string") {
                              return new Date(date).toLocaleDateString();
                            } else if (
                              date &&
                              typeof date === "object" &&
                              "$date" in date
                            ) {
                              return new Date(
                                parseInt(date.$date.$numberLong)
                              ).toLocaleDateString();
                            }
                            return "N/A";
                          })()}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Clear Data Modal */}
      {showClearDataModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-white mb-4">
              Clear Sessions Data
            </h3>
            <p className="text-gray-300 mb-4">
              This action will permanently delete all session data. This cannot
              be undone.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Type &quot;CLEAR ALL DATA&quot; to confirm:
              </label>
              <input
                type="text"
                value={clearDataConfirm}
                onChange={(e) => setClearDataConfirm(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="CLEAR ALL DATA"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowClearDataModal(false);
                  setClearDataConfirm("");
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
                disabled={modalLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleClearData}
                disabled={modalLoading || clearDataConfirm !== "CLEAR ALL DATA"}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {modalLoading ? "Clearing..." : "Clear All Data"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Credentials Modal */}
      {showUpdateCredentialsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-white mb-4">
              Update Admin Credentials
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Username
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowUpdateCredentialsModal(false);
                  setNewUsername("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
                disabled={modalLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCredentials}
                disabled={modalLoading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {modalLoading ? "Updating..." : "Update Credentials"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
