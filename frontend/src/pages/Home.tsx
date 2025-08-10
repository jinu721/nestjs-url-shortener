import React, { useEffect, useState, useCallback } from "react";
import {
  Link2,
  Copy,
  ExternalLink,
  Clock,
  BarChart3,
  LogOut,
  User,
  Plus,
  Search,
  Calendar,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { UrlService } from "../services/url.service";
import { useNavigate } from "react-router-dom";
import type { UrlHistory } from "../types/url.types";

const mockUser = {
  name: "Jiny",
  email: "jinu86831@gmail.com",
};

const HomePage:React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urlHistory, setUrlHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [copySuccess, setCopySuccess] = useState("");
  const [totalUrls, setTotalUrls] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  const router = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1);
    }, 500); 
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchUrlHistory = useCallback(async (currentPage = 1, search = "") => {
    try {
      setSearchLoading(true);
      const data = await UrlService.getUrlHistory(currentPage, limit, search);
      
      setUrlHistory(data.data || []);
      setTotalClicks(data.totalClickCount || 0);
      setTotalUrls(data.totalUrlCount || 0);
      setTotalPages(data.totalPages || 0);
      setTotalCount(data.totalCount || 0);
    } catch (error) {
      console.error("Error fetching URL history:", error);
    } finally {
      setSearchLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchUrlHistory(page, debouncedSearchTerm);
  }, [page, debouncedSearchTerm, fetchUrlHistory]);

  const handleShortenUrl = async () => {
    if (!originalUrl.trim()) return;

    setLoading(true);

    try {
      const newUrl = await UrlService.createUrl({
        originalUrl,
      });
      
      await fetchUrlHistory(1, debouncedSearchTerm);
      setPage(1);
      
      setShortUrl(newUrl.shortUrl);
      setOriginalUrl("");
      setTotalUrls((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error shortening URL:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(text);
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateUrl = (url: string, maxLength: number = 40) => {
    return url.length > maxLength ? url.substring(0, maxLength) + "..." : url;
  };

  const handleLogout = () => {
    localStorage.clear();
    router("/auth/login");
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleFirstPage = () => handlePageChange(1);
  const handlePreviousPage = () => handlePageChange(page - 1);
  const handleNextPage = () => handlePageChange(page + 1);
  const handleLastPage = () => handlePageChange(totalPages);

  const getPageNumbers = () => {
    const delta = 2; 
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-80 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{mockUser.name}</h3>
              <p className="text-sm text-gray-600">{mockUser.email}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Quick Stats
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{totalUrls}</p>
              <p className="text-xs text-blue-800">Total URLs</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{totalClicks}</p>
              <p className="text-xs text-green-800">Total Clicks</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 pb-4">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              URL History
              {searchLoading && (
                <div className="ml-2 w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              )}
            </h4>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search URLs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            
            {/* Results count */}
            {debouncedSearchTerm && (
              <p className="text-xs text-gray-500 mt-2">
                {totalCount} result{totalCount !== 1 ? 's' : ''} found
              </p>
            )}
          </div>

          <div className="flex-1 overflow-y-auto px-6">
            {urlHistory.length === 0 ? (
              <div className="text-center py-8">
                {searchLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
                    <span className="text-gray-500">Searching...</span>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    {debouncedSearchTerm ? 'No URLs found matching your search' : 'No URLs found'}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {urlHistory.map((url: UrlHistory) => (
                  <div
                    key={url.id}
                    className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => setSelectedUrl(url)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {truncateUrl(url.originalUrl)}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          {url.shortCode}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-gray-500 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(url.createdAt)}
                          </p>
                          <p className="text-xs text-gray-600 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {url.clicks} clicks
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Page {page} of {totalPages} ({totalCount} total)
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={handleFirstPage}
                    disabled={page === 1}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {getPageNumbers().map((pageNum, index) => (
                    <button
                      key={index}
                      onClick={() => typeof pageNum === 'number' && handlePageChange(pageNum)}
                      disabled={pageNum === '...'}
                      className={`px-2 py-1 text-sm rounded ${
                        pageNum === page
                          ? 'bg-blue-500 text-white'
                          : pageNum === '...'
                          ? 'cursor-default'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  
                  <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleLastPage}
                    disabled={page === totalPages}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Link2 className="w-8 h-8 mr-3 text-blue-600" />
            URL Shortener
          </h1>
        </header>

        <main className="flex-1 p-8">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Shorten a new URL
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter URL to shorten
                  </label>
                  <input
                    type="url"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="https://example.com/very-long-url"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleShortenUrl();
                      }
                    }}
                  />
                </div>

                <button
                  onClick={handleShortenUrl}
                  disabled={loading || !originalUrl.trim()}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Shortening..." : "Shorten URL"}
                </button>
              </div>

              {shortUrl && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">
                    Your shortened URL:
                  </h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={shortUrl}
                      readOnly
                      className="flex-1 px-3 py-2 bg-white border border-green-300 rounded text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(shortUrl)}
                      className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  {copySuccess === shortUrl && (
                    <p className="text-green-600 text-sm mt-2">
                      Copied to clipboard!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {selectedUrl && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  URL Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Original URL
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={selectedUrl.originalUrl}
                        readOnly
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm"
                      />
                      <button
                        onClick={() => copyToClipboard(selectedUrl.originalUrl)}
                        className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Short URL
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={selectedUrl.shortUrl}
                        readOnly
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm"
                      />
                      <button
                        onClick={() => copyToClipboard(selectedUrl.shortUrl)}
                        className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <a
                        href={selectedUrl.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    {copySuccess === selectedUrl.shortUrl && (
                      <p className="text-blue-600 text-sm mt-1">
                        Copied to clipboard!
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Total Clicks
                      </label>
                      <p className="text-2xl font-bold text-green-600">
                        {selectedUrl.clicks}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Created
                      </label>
                      <p className="text-sm text-gray-600">
                        {formatDate(selectedUrl.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedUrl(null)}
                  className="mt-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Close Details
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;