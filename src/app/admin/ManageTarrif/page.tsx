"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ObjectId } from "mongodb";

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

  const fetchTariffs = useCallback(async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("adminToken="))
        ?.split("=")[1];

      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch("/api/admin/tariffs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTariffs(data);
        setFilteredTariffs(data);
      } else {
        if (response.status === 401) {
          document.cookie =
            "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          router.push("/admin");
        } else {
          console.error("Failed to fetch tariffs");
        }
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

  const handleLogout = () => {
    document.cookie =
      "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin");
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
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("adminToken="))
        ?.split("=")[1];

      const url = editingTariff ? "/api/admin/tariffs" : "/api/admin/tariffs";
      const method = editingTariff ? "PUT" : "POST";

      const body = editingTariff
        ? { ...formData, id: editingTariff._id.toString() }
        : formData;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  const handleAddTariffService = () => {
    setFormData({
      ...formData,
      Tariffs: [
        ...formData.Tariffs,
        { Service: "", Grundpreis: "", Arbeitspreis: "" },
      ],
    });
  };

  const handleRemoveTariffService = (index: number) => {
    if (formData.Tariffs.length > 1) {
      setFormData({
        ...formData,
        Tariffs: formData.Tariffs.filter((_, i) => i !== index),
      });
    }
  };

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
                className="mr-4 text-orange-500 hover:text-orange-400"
              >
                ← Back
              </button>
              <h1 className="text-2xl font-bold text-white">Manage Tariffs</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddTariff}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                + Add New Tariff
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Modal Overlay */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">
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
                        className="block text-sm font-medium text-gray-400"
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
                        className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-700 text-white px-3 py-2"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Bundesland"
                        className="block text-sm font-medium text-gray-400"
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
                        className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-700 text-white px-3 py-2"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Kreis"
                        className="block text-sm font-medium text-gray-400"
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
                        className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-700 text-white px-3 py-2"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Typ"
                        className="block text-sm font-medium text-gray-400"
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
                        className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-700 text-white px-3 py-2"
                      />
                    </div>
                  </div>

                  {/* Tariffs/Services */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="text-md font-medium text-white">
                          Services
                        </h4>
                        <p className="text-sm text-gray-400">
                          Standard energy services (service names are fixed,
                          prices can be modified)
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddTariffService}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-md text-sm"
                      >
                        + Add Service
                      </button>
                    </div>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {formData.Tariffs.map((tariff, index) => (
                        <div
                          key={index}
                          className="bg-gray-700 p-4 rounded-lg border border-gray-600"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <h5 className="text-sm font-medium text-white">
                              Service {index + 1}
                            </h5>
                            {formData.Tariffs.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveTariffService(index)}
                                className="text-red-400 hover:text-red-300 text-sm"
                                title="Remove this service"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-400 mb-1">
                                Service Name
                              </label>
                              <input
                                type="text"
                                value={tariff.Service}
                                readOnly
                                className="block w-full border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-600 text-white px-3 py-2 cursor-not-allowed opacity-75"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-400 mb-1">
                                Grundpreis (€)
                              </label>
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
                                className="block w-full border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-600 text-white px-3 py-2"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-400 mb-1">
                                Arbeitspreis (€)
                              </label>
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
                                className="block w-full border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-600 text-white px-3 py-2"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                    <button
                      type="button"
                      onClick={handleCancelForm}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-800 text-white px-4 py-2 rounded-md text-sm font-medium"
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
        <div className="mb-8 space-y-4">
          <div className="bg-gray-800 shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="text-lg leading-6 font-medium text-white">
                  Total Tariff Locations: {tariffs.length}
                </h3>
                <div className="text-sm text-gray-400">
                  Showing: {filteredTariffs.length}{" "}
                  {searchTerm && `filtered from ${tariffs.length}`}
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-gray-800 shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="max-w-md">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Search by Postal Code, State, or District
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter PLZ, Bundesland, or Kreis..."
                    className="w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-700 text-white"
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
        </div>

        {/* Tariffs List */}
        <div className="space-y-4">
          {filteredTariffs.length === 0 ? (
            <div className="bg-gray-800 shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 text-center">
                <p className="text-gray-400">
                  {searchTerm
                    ? `No locations found matching "${searchTerm}"`
                    : "No tariff data found."}
                </p>
              </div>
            </div>
          ) : (
            filteredTariffs.map((tariffData) => {
              const locationId = tariffData._id.toString();
              const isExpanded = expandedLocations.has(locationId);

              return (
                <div
                  key={locationId}
                  className="bg-gray-800 shadow rounded-lg overflow-hidden"
                >
                  {/* Collapsible Header */}
                  <div
                    className="px-4 py-4 cursor-pointer hover:bg-gray-750 transition-colors"
                    onClick={() => toggleLocation(locationId)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white">
                          {tariffData.PLZ} - {tariffData.Bundesland}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-2">
                          <div>
                            <span className="text-gray-400">Kreis: </span>
                            <span className="text-white">
                              {tariffData.Kreis}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">Typ: </span>
                            <span className="text-white">{tariffData.Typ}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">
                              Available Services:{" "}
                            </span>
                            <span className="text-orange-400 font-medium">
                              {tariffData.Tariffs.length}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditTariff(tariffData);
                          }}
                          className="text-orange-400 hover:text-orange-300 transition-colors px-2 py-1 text-sm"
                        >
                          Edit
                        </button>
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
                        <h4 className="text-lg font-medium text-white mb-4">
                          Available Services
                        </h4>
                        <div className="grid gap-4 md:grid-cols-2">
                          {tariffData.Tariffs.map((tariff, index) => (
                            <div
                              key={index}
                              className="bg-gray-700 rounded-lg p-4"
                            >
                              <div className="mb-3">
                                <h5 className="text-lg font-semibold text-white">
                                  {tariff.Service}
                                </h5>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">
                                    Grundpreis:
                                  </span>
                                  <span className="text-green-400 font-medium">
                                    €{tariff.Grundpreis}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">
                                    Arbeitspreis:
                                  </span>
                                  <span className="text-green-400 font-medium">
                                    €
                                    {(
                                      parseFloat(tariff.Arbeitspreis) / 100
                                    ).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
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
                          <h4 className="text-lg font-medium text-white mb-3">
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
      </main>
    </div>
  );
}
