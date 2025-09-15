"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ObjectId } from "mongodb";
import LogoutButton from "@/app/components/LogoutButton";

interface Tariff {
  Service: string;
  Grundpreis: string;
  Arbeitspreis: string;
}

interface TariffData {
  _id: ObjectId;
  PLZ: string;
  Bundesland: string;
  Kreis: string;
  Typ: string;
  Tariffs: Tariff[];
}

interface TariffFormData {
  PLZ: string;
  Bundesland: string;
  Kreis: string;
  Typ: string;
  Tariffs: Tariff[];
}

export default function ManageTariff() {
  const [tariffs, setTariffs] = useState<TariffData[]>([]);
  const [filteredTariffs, setFilteredTariffs] = useState<TariffData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedLocations, setExpandedLocations] = useState<Set<string>>(
    new Set()
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTariff, setEditingTariff] = useState<TariffData | null>(null);
  const [formData, setFormData] = useState<TariffFormData>({
    PLZ: "",
    Bundesland: "",
    Kreis: "",
    Typ: "",
    Tariffs: [
      {
        Service: "R(H)EINPOWER Strom Direkt",
        Grundpreis: " ",
        Arbeitspreis: " ",
      },
      {
        Service: "R(H)EINPOWER MeinStrom Wärmepumpe 24",
        Grundpreis: " ",
        Arbeitspreis: " ",
      },
      {
        Service: "R(H)EINPOWER Erdgas direkt",
        Grundpreis: " ",
        Arbeitspreis: " ",
      },
      {
        Service: "SWDU Energie Service Pool Strom",
        Grundpreis: " ",
        Arbeitspreis: " ",
      },
      {
        Service: "SWDU Energie Service Pool Gas",
        Grundpreis: " ",
        Arbeitspreis: " ",
      },
    ],
  });
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default to 10
  // Reset to page 1 when search term or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);
  // Calculate pagination
  const totalPages = Math.ceil(filteredTariffs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTariffs = filteredTariffs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchTariffs = useCallback(async () => {
    try {
      // Use credentials: 'include' to send httpOnly cookies
      const response = await fetch("/api/admin/tariffs", {
        credentials: "include", // This sends httpOnly cookies
      });

      if (response.ok) {
        const data = await response.json();
        setTariffs(data);
        setFilteredTariffs(data);
      } else {
        console.error("Failed to fetch tariffs - redirecting to login");
        router.push("/admin");
      }
    } catch (error) {
      console.error("Error fetching tariffs:", error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchTariffs();
  }, [fetchTariffs]);

  // Filter tariffs based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTariffs(tariffs);
    } else {
      const filtered = tariffs.filter(
        (tariffData) =>
          tariffData.PLZ.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tariffData.Bundesland.toLowerCase().includes(
            searchTerm.toLowerCase()
          ) ||
          tariffData.Kreis.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTariffs(filtered);
    }
  }, [searchTerm, tariffs]);

  const toggleLocation = (locationId: string) => {
    const newExpanded = new Set(expandedLocations);
    if (newExpanded.has(locationId)) {
      newExpanded.delete(locationId);
    } else {
      newExpanded.add(locationId);
    }
    setExpandedLocations(newExpanded);
  };

  const handleAddTariff = () => {
    setFormData({
      PLZ: "",
      Bundesland: "",
      Kreis: "",
      Typ: "",
      Tariffs: [
        {
          Service: "R(H)EINPOWER Strom Direkt",
          Grundpreis: " ",
          Arbeitspreis: " ",
        },
        {
          Service: "R(H)EINPOWER MeinStrom Wärmepumpe 24",
          Grundpreis: " ",
          Arbeitspreis: " ",
        },
        {
          Service: "R(H)EINPOWER Erdgas direkt",
          Grundpreis: " ",
          Arbeitspreis: " ",
        },
        {
          Service: "SWDU Energie Service Pool Strom",
          Grundpreis: " ",
          Arbeitspreis: " ",
        },
        {
          Service: "SWDU Energie Service Pool Gas",
          Grundpreis: " ",
          Arbeitspreis: " ",
        },
      ],
    });
    setEditingTariff(null);
    setShowAddForm(true);
  };

  const handleEditTariff = (tariff: TariffData) => {
    setFormData({
      PLZ: tariff.PLZ,
      Bundesland: tariff.Bundesland,
      Kreis: tariff.Kreis,
      Typ: tariff.Typ,
      Tariffs: tariff.Tariffs,
    });
    setEditingTariff(tariff);
    setShowAddForm(true);
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    setEditingTariff(null);
    setFormData({
      PLZ: "",
      Bundesland: "",
      Kreis: "",
      Typ: "",
      Tariffs: [
        {
          Service: "R(H)EINPOWER Strom Direkt",
          Grundpreis: " ",
          Arbeitspreis: " ",
        },
        {
          Service: "R(H)EINPOWER MeinStrom Wärmepumpe 24",
          Grundpreis: " ",
          Arbeitspreis: " ",
        },
        {
          Service: "R(H)EINPOWER Erdgas direkt",
          Grundpreis: " ",
          Arbeitspreis: " ",
        },
        {
          Service: "SWDU Energie Service Pool Strom",
          Grundpreis: " ",
          Arbeitspreis: " ",
        },
        {
          Service: "SWDU Energie Service Pool Gas",
          Grundpreis: " ",
          Arbeitspreis: " ",
        },
      ],
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingTariff ? "/api/admin/tariffs" : "/api/admin/tariffs";
      const method = editingTariff ? "PUT" : "POST";

      const body = editingTariff
        ? { ...formData, id: editingTariff._id.toString() }
        : formData;

      const response = await fetch(url, {
        method,
        credentials: "include", // Send httpOnly cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // Refresh the tariffs list
        await fetchTariffs();
        handleCancelForm();
      } else {
        console.error("Failed to save tariff");
      }
    } catch (error) {
      console.error("Error saving tariff:", error);
    } finally {
      setSaving(false);
    }
  };

  // const handleAddTariffService = () => {
  //   setFormData({
  //     ...formData,
  //     Tariffs: [
  //       ...formData.Tariffs,
  //       { Service: "", Grundpreis: "", Arbeitspreis: "" },
  //     ],
  //   });
  // };

  // const handleRemoveTariffService = (index: number) => {
  //   if (formData.Tariffs.length > 1) {
  //     setFormData({
  //       ...formData,
  //       Tariffs: formData.Tariffs.filter((_, i) => i !== index),
  //     });
  //   }
  // };

  const handleTariffServiceChange = (
    index: number,
    field: keyof Tariff,
    value: string
  ) => {
    // Prevent changes to service names
    if (field === "Service") return;

    const updatedTariffs = formData.Tariffs.map((tariff, i) =>
      i === index ? { ...tariff, [field]: value } : tariff
    );
    setFormData({ ...formData, Tariffs: updatedTariffs });
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
      // Special handling for prices
      if (
        key.toLowerCase().includes("price") ||
        key.toLowerCase().includes("preis") ||
        key.toLowerCase().includes("total")
      ) {
        const numValue = typeof value === "string" ? parseFloat(value) : value;
        if (!isNaN(numValue)) {
          return (
            <span className="text-green-400 font-medium">
              €{(numValue / 100).toFixed(2)}
            </span>
          );
        }
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
                onClick={() => router.back()}
                className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 text-orange-400 hover:text-orange-300 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="text-xl">←</span>
              </button>
              <div className="flex flex-col space-y-1 ml-4">
                <h1 className="text-xl font-poppins-regular text-gray-400">
                  Manage Tariffs
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddTariff}
                className="border border-orange-400 hover:bg-orange-700 text-gray-400 hover:text-white px-4 py-2 text-sm font-poppins-regular"
              >
                + Add New Tariff
              </button>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Modal Overlay */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-poppins-regular text-gray-400">
                    {editingTariff ? "Edit Tariff" : "Add New Tariff"}
                  </h3>
                  <button
                    onClick={handleCancelForm}
                    className="text-gray-400 hover:text-white text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="px-6 py-6">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="PLZ"
                        className="block text-sm font-poppins-regular text-gray-400"
                      >
                        Postal Code (PLZ)
                      </label>
                      <input
                        type="text"
                        id="PLZ"
                        value={formData.PLZ}
                        onChange={(e) =>
                          setFormData({ ...formData, PLZ: e.target.value })
                        }
                        required
                        className="mt-1 block w-full border font-poppins-regular text-sm border-gray-600 shadow-sm placeholder-gray-400 hover:bg-gray-700 bg-gray-800 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-white px-3 py-2"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Bundesland"
                        className="block text-sm font-poppins-regular text-gray-400"
                      >
                        State (Bundesland)
                      </label>
                      <input
                        type="text"
                        id="Bundesland"
                        value={formData.Bundesland}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            Bundesland: e.target.value,
                          })
                        }
                        required
                        className="mt-1 block w-full border font-poppins-regular text-sm border-gray-600 shadow-sm placeholder-gray-400 hover:bg-gray-700 bg-gray-800 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-white px-3 py-2"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Kreis"
                        className="block text-sm font-poppins-regular text-gray-400"
                      >
                        District (Kreis)
                      </label>
                      <input
                        type="text"
                        id="Kreis"
                        value={formData.Kreis}
                        onChange={(e) =>
                          setFormData({ ...formData, Kreis: e.target.value })
                        }
                        required
                        className="mt-1 block w-full border font-poppins-regular text-sm border-gray-600 shadow-sm placeholder-gray-400 hover:bg-gray-700 bg-gray-800 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-white px-3 py-2"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Typ"
                        className="block text-sm font-poppins-regular text-gray-400"
                      >
                        Type (Typ)
                      </label>
                      <input
                        type="text"
                        id="Typ"
                        value={formData.Typ}
                        onChange={(e) =>
                          setFormData({ ...formData, Typ: e.target.value })
                        }
                        required
                        className="mt-1 block w-full border font-poppins-regular text-sm border-gray-600 shadow-sm placeholder-gray-400 hover:bg-gray-700 bg-gray-800 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-white px-3 py-2"
                      />
                    </div>
                  </div>

                  {/* Tariffs/Services */}
                  <div>
                    {/* <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="text-md font-poppins-regular text-white">
                          Services
                        </h4>
                        <p className="text-sm font-poppins-regular text-gray-400">
                          Standard energy services (service names are fixed,
                          prices can be modified)
                        </p>
                      </div>
                    </div> */}
                    <div className="mt-6">
                      <table className="w-full table-auto border-collapse border border-gray-600">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left text-sm font-poppins-regular text-gray-300">
                              Service Name
                            </th>
                            <th className="border border-gray-600 px-4 py-2 text-left text-sm font-poppins-regular text-gray-300">
                              Grundpreis (€)
                            </th>
                            <th className="border border-gray-600 px-4 py-2 text-left text-sm font-poppins-regular text-gray-300">
                              Arbeitspreis (€)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {formData.Tariffs.map((tariff, index) => (
                            <tr key={index} className="hover:bg-gray-750">
                              <td className="border border-gray-600 px-4 py-2 text-sm font-poppins-regular text-white">
                                <input
                                  type="text"
                                  value={tariff.Service}
                                  readOnly
                                  className="w-full bg-transparent border-none text-white cursor-not-allowed opacity-75"
                                />
                              </td>
                              <td className="border border-gray-600 px-4 py-2 text-sm font-poppins-regular text-orange-400">
                                <input
                                  type="number"
                                  step="0.01"
                                  value={tariff.Grundpreis}
                                  onChange={(e) =>
                                    handleTariffServiceChange(
                                      index,
                                      "Grundpreis",
                                      e.target.value
                                    )
                                  }
                                  required
                                  placeholder="Enter Grundpreis (e.g. 12.34)"
                                  className="w-full bg-transparent border-none text-orange-400 focus:outline-none placeholder-gray-500"
                                />
                              </td>
                              <td className="border border-gray-600 px-4 py-2 text-sm font-poppins-regular text-green-400">
                                <input
                                  type="number"
                                  step="0.01"
                                  value={tariff.Arbeitspreis}
                                  onChange={(e) =>
                                    handleTariffServiceChange(
                                      index,
                                      "Arbeitspreis",
                                      e.target.value
                                    )
                                  }
                                  required
                                  placeholder="Enter Arbeitspreis (e.g. 25.50)"
                                  className="w-full bg-transparent border-none text-green-400 focus:outline-none placeholder-gray-500"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                    <button
                      type="button"
                      onClick={handleCancelForm}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 text-sm font-poppins-regular"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-800 text-white px-4 py-2 text-sm font-poppins-regular"
                    >
                      {saving
                        ? "Saving..."
                        : editingTariff
                        ? "Update"
                        : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Stats and Search */}
        <div>
          <div className="mb-8 space-y-4">
            <div>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h1 className="text-lg font-poppins-regular text-gray-400 ">
                    Showing {currentTariffs.length} of {filteredTariffs.length}{" "}
                    tariff locations
                  </h1>
                  {/* <div className="text-sm font-poppins-regular text-gray-400">
                    Showing: {filteredTariffs.length}{" "}
                    {searchTerm && `filtered from ${tariffs.length}`}
                  </div> */}
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="w-full">
              {/* <label
                htmlFor="search"
                className="block text-sm font-poppins-regular text-gray-400 mb-2"
              >
                Search by Postal Code, State, or District
              </label> */}
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by Postal Code, State, or District"
                  className="w-full px-4 py-2 border font-poppins-regular border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-700 text-white"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tariffs List */}
        <div className="space-y-4">
          {filteredTariffs.length === 0 ? (
            <div className="bg-gray-800 shadow">
              <div className="px-4 py-5 sm:p-6 text-center">
                <p className="text-gray-400">
                  {searchTerm
                    ? `No locations found matching "${searchTerm}"`
                    : "No tariff data found."}
                </p>
              </div>
            </div>
          ) : (
            currentTariffs.map((tariffData) => {
              const locationId = tariffData._id.toString();
              const isExpanded = expandedLocations.has(locationId);

              return (
                <div
                  key={locationId}
                  className="bg-gray-800 shadow overflow-hidden"
                >
                  {/* Collapsible Header */}
                  <div
                    className="px-4 py-4 cursor-pointer hover:bg-gray-750 transition-colors"
                    onClick={() => toggleLocation(locationId)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-start">
                          <h3 className="text-md font-poppins-regular text-white">
                            {tariffData.PLZ} - {tariffData.Bundesland}
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditTariff(tariffData);
                            }}
                            className="group flex items-center justify-center w-8 h-8 rounded-full hover:bg-orange-400 transition-colors ml-4"
                            title="Edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 text-gray-400 group-hover:text-white"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-2">
                          <div>
                            <span className="text-gray-400 font-poppins-regular">
                              Kreis:{" "}
                            </span>
                            <span className="text-gray-400 font-poppins-regular">
                              {tariffData.Kreis}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400 font-poppins-regular">
                              Typ:{" "}
                            </span>
                            <span className="text-gray-400 font-poppins-regular">
                              {tariffData.Typ}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400 font-poppins-regular ">
                              Available Services:{" "}
                            </span>
                            <span className="text-gray-400 font-poppins-regular">
                              {tariffData.Tariffs.length}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end items-start space-x-2">
                        <button className="text-orange-400 hover:text-orange-300 transition-colors">
                          {isExpanded ? "▼" : "▶"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  {isExpanded && (
                    <div className="px-4 pb-6 border-t border-gray-700">
                      {/* Tariffs for this location */}
                      <div className="mt-6">
                        <table className="w-full table-auto border-collapse border border-gray-600">
                          <thead>
                            <tr className="bg-gray-700">
                              <th className="border border-gray-600 px-4 py-2 text-left text-sm font-poppins-light text-gray-400">
                                Service Name
                              </th>
                              <th className="border border-gray-600 px-4 py-2 text-left text-sm font-poppins-light text-gray-400">
                                Grundpreis
                              </th>
                              <th className="border border-gray-600 px-4 py-2 text-left text-sm font-poppins-light text-gray-400">
                                Arbeitspreis
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {tariffData.Tariffs.map((tariff, index) => (
                              <tr key={index} className="hover:bg-gray-750">
                                <td className="border border-gray-600 px-4 py-2 text-sm font-poppins-regular text-gray-300">
                                  {tariff.Service}
                                </td>
                                <td className="border border-gray-600 px-4 py-2 text-sm font-poppins-regular text-orange-400">
                                  €{tariff.Grundpreis}
                                </td>
                                <td className="border border-gray-600 px-4 py-2 text-sm font-poppins-regular text-green-400">
                                  €
                                  {(
                                    parseFloat(tariff.Arbeitspreis) / 100
                                  ).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Additional Details */}
                      {Object.entries(tariffData).filter(
                        ([key]) =>
                          ![
                            "_id",
                            "PLZ",
                            "Bundesland",
                            "Kreis",
                            "Typ",
                            "Tariffs",
                          ].includes(key)
                      ).length > 0 && (
                        <div className="border-t border-gray-700 pt-4 mt-6">
                          <h4 className="text-lg font-poppins-regular text-white mb-3">
                            Additional Details
                          </h4>
                          <div className="text-sm space-y-2">
                            {Object.entries(tariffData)
                              .filter(
                                ([key]) =>
                                  ![
                                    "_id",
                                    "PLZ",
                                    "Bundesland",
                                    "Kreis",
                                    "Typ",
                                    "Tariffs",
                                  ].includes(key)
                              )
                              .map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-gray-400 capitalize">
                                    {key.replace(/([A-Z])/g, " $1").trim()}:
                                  </span>
                                  <span className="text-white">
                                    {renderValue(value, key)}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-8">
            {/* Items per page selector */}
            <div className="flex items-center space-x-2">
              <label
                htmlFor="itemsPerPage"
                className="text-sm font-poppins-regular text-gray-400"
              >
                Show:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm font-poppins-regular text-gray-400">
                per page
              </span>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center justify-center space-x-2 mt-4">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg bg-gray-700 text-white 
               disabled:opacity-50 disabled:cursor-not-allowed
               hover:bg-gray-600 transition-colors"
              >
                Previous
              </button>

              {/* Page numbers */}
              {(() => {
                const pages = [];
                const maxVisible = 7;

                if (totalPages <= maxVisible) {
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                  }
                } else {
                  const start = Math.max(2, currentPage - 2);
                  const end = Math.min(totalPages - 1, currentPage + 2);

                  pages.push(1);
                  if (start > 2) pages.push("...");
                  for (let i = start; i <= end; i++) pages.push(i);
                  if (end < totalPages - 1) pages.push("...");
                  pages.push(totalPages);
                }

                return pages.map((page, idx) =>
                  page === "..." ? (
                    <span key={idx} className="px-2 py-2 text-gray-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={idx}
                      onClick={() => handlePageChange(page as number)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        page === currentPage
                          ? "bg-orange-500 text-white"
                          : "bg-gray-700 text-white hover:bg-gray-600"
                      }`}
                    >
                      {page}
                    </button>
                  )
                );
              })()}

              {/* Next button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg bg-gray-700 text-white 
               disabled:opacity-50 disabled:cursor-not-allowed
               hover:bg-gray-600 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
