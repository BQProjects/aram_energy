"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/app/components/LogoutButton";

interface ContactMessage {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  agree: boolean;
  createdAt: string;
}

export default function InquiryPage() {
  const [inquiries, setInquiries] = useState<ContactMessage[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<ContactMessage[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Fixed at 10 for simplicity
  const router = useRouter();

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInquiries = filteredInquiries.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchInquiries = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/contactMessages", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
        setFilteredInquiries(data);
      } else {
        console.error("Failed to fetch inquiries - redirecting to login");
        router.push("/admin");
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // Filter inquiries based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredInquiries(inquiries);
    } else {
      const filtered = inquiries.filter(
        (inquiry) =>
          inquiry.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.service.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInquiries(filtered);
    }
  }, [searchTerm, inquiries]);


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
                  Manage Inquiries
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-lg font-poppins-regular text-gray-400">
              Showing {currentInquiries.length} of {filteredInquiries.length}{" "}
              inquiries
            </h1>
          </div>

          {/* Search Bar */}
          <div className="w-full">
            <div className="relative">
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or service"
                className="w-full px-4 py-2 font-poppins-regular border border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-gray-700 text-white"
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
        {/* Inquiries List */}
        <div className="space-y-4">
          {filteredInquiries.length === 0 ? (
            <div className="bg-gray-800 shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 text-center">
                <p className="text-gray-400 font-poppins-regular">
                  {searchTerm
                    ? `No inquiries found matching "${searchTerm}"`
                    : "No inquiries found."}
                </p>
              </div>
            </div>
          ) : (
            currentInquiries.map((inquiry) => (
              <div
                key={inquiry._id}
                className="bg-gray-800 shadow overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Header with Name and Avatar */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div>
                          <h3 className="font-poppins-regular text-white">
                            {inquiry.firstName} {inquiry.lastName}
                          </h3>
                          <p className="text-sm font-poppins-regular text-gray-400">
                            {inquiry.email}
                          </p>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="bg-gray-700 p-2">
                          <p className="text-xs text-gray-400 font-poppins-regular uppercase tracking-wide">
                            Service
                          </p>
                          <p className="text-sm text-white font-poppins-regular">
                            {inquiry.service}
                          </p>
                        </div>
                        <div className="bg-gray-700 p-2">
                          <p className="text-xs text-gray-400 uppercase font-poppins-regular tracking-wide">
                            Phone
                          </p>
                          <p className="text-sm text-white font-poppins-regular">
                            {inquiry.phone}
                          </p>
                        </div>
                        <div className="bg-gray-700 p-2">
                          <p className="text-xs text-gray-400 uppercase font-poppins-regular tracking-wide">
                            Date
                          </p>
                          <p className="text-sm text-white font-poppins-regular">
                            {new Date(inquiry.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="bg-gray-700 p-2">
                          <p className="text-xs text-gray-400 uppercase font-poppins-regular tracking-wide">
                            Status
                          </p>
                          <span className="text-sm text-white font-poppins-regular">
                            {inquiry.agree ? "Agreed" : "Not Agreed"}
                          </span>
                        </div>
                      </div>

                      {/* Message Section */}
                      <div className="bg-gray-700 p-2">
                        <h4 className="text-sm font-poppins-regular text-white mb-2">
                          Message
                        </h4>
                        <p className="text-sm text-gray-300 font-poppins-regular leading-relaxed">
                          {inquiry.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-8">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-poppins-regular text-gray-400">
                Showing {startIndex + 1}-
                {Math.min(endIndex, filteredInquiries.length)} of{" "}
                {filteredInquiries.length}
              </span>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
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
                  for (let i = start; i <= end; i++) {
                    pages.push(i);
                  }
                  if (end < totalPages - 1) pages.push("...");
                  if (totalPages > 1) pages.push(totalPages);
                }

                return pages.map((page, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof page === "number" && handlePageChange(page)
                    }
                    disabled={page === "..."}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      page === currentPage
                        ? "bg-orange-500 text-white"
                        : page === "..."
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                  >
                    {page}
                  </button>
                ));
              })()}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
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
