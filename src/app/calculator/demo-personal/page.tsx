"use client";
import React from "react";
import {
  usePersonalDetailsSection,
  useSessionInfo,
} from "../../contexts/FormHelpers";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function PersonalDetailsNewExample() {
  const { data, update } = usePersonalDetailsSection();
  const { sessionId, objectId, loading, isInitialized } = useSessionInfo();

  if (loading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading session data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-black rounded-lg shadow-md p-6">
          {/* Session Info Display */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Session Information
            </h3>
            <p className="text-sm text-blue-600">
              <strong>ObjectId:</strong> {objectId}
            </p>
            <p className="text-sm text-blue-600">
              <strong>Session ID:</strong> {sessionId}
            </p>
            <p className="text-xs text-blue-500 mt-2">
              ✅ Data is automatically saved as you type (with 1-second delay)
            </p>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Personal Details
          </h1>

          <div className="space-y-4">
            {/* Salutation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salutation
              </label>
              <select
                value={data.salutation}
                onChange={(e) => update({ salutation: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select salutation</option>
                <option value="mr">Mr.</option>
                <option value="mrs">Mrs.</option>
                <option value="ms">Ms.</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => update({ name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your first name"
              />
            </div>

            {/* Surname */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={data.surname}
                onChange={(e) => update({ surname: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your last name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => update({ email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>

            {/* Repeat Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Email Address
              </label>
              <input
                type="email"
                value={data.repeatEmail}
                onChange={(e) => update({ repeatEmail: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm your email address"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => update({ phone: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={data.birthDate}
                onChange={(e) => update({ birthDate: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Billing Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Billing Address
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="billing"
                    value="same"
                    checked={data.billing === "same"}
                    onChange={(e) => update({ billing: e.target.value })}
                    className="mr-2"
                  />
                  Same as service address
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="billing"
                    value="different"
                    checked={data.billing === "different"}
                    onChange={(e) => update({ billing: e.target.value })}
                    className="mr-2"
                  />
                  Different billing address
                </label>
              </div>
            </div>
          </div>

          {/* Demo Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              🚀 Demo Instructions
            </h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>
                • Start typing in any field - data is automatically saved after
                1 second
              </li>
              <li>
                • Refresh the page - your data will be restored from MongoDB
              </li>
              <li>
                • Copy the URL and open in a new tab - same data will be loaded
              </li>
              <li>
                • Clear your browser cache - data persists because it&apos;s in
                MongoDB
              </li>
              <li>
                • Check your browser&apos;s Network tab to see the API calls
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
