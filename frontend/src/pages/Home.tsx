import React, { useEffect, useState } from "react";
import {
  Link2,
  Clock,
  BarChart3,
  LogOut,
  User,
  Plus,
  Search,
  Menu,
  X,
} from "lucide-react";
import Pagination from "../components/Pagination";
import ShortUrlBox from "../components/ShortUrlBox";
import UrlDetails from "../components/UrlDetails";
import UrlHistoryList from "../components/UrlHistoryList";
import { toast } from "react-toastify";
import { UrlService } from "../services/url.service";
import { UserService } from "../services/user.service";
import { useNavigate } from "react-router-dom";

interface UserType {
  username: string;
  email: string;
}

interface UrlHistoryItem {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  clickCount: number;
}

const HomePage: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [user, setUser] = useState<UserType | null>(null);
  const [urlHistory, setUrlHistory] = useState<UrlHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedUrl, setSelectedUrl] = useState<UrlHistoryItem | null>(null);
  const [copySuccess, setCopySuccess] = useState("");
  const [totalUrls, setTotalUrls] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const limit = 3;

  const router = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await UserService.getMe();
        setUser(userData);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Error Fetching User");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      setSearchLoading(true);
      try {
        const historyData = await UrlService.getUrlHistory(
          page,
          limit,
          debouncedSearchTerm
        );
        setUrlHistory(historyData.data);
        setTotalClicks(historyData.totalClickCount);
        setTotalUrls(historyData.totalUrlCount);
        setTotalCount(historyData.total);
        setTotalPages(Math.ceil(historyData.total / limit));
      } catch (error) {
        console.error(error);
        toast.error("Error fetching URL history");
      } finally {
        setSearchLoading(false);
      }
    };
    fetchHistory();
  }, [page, limit, debouncedSearchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleShortenUrl = async () => {
    if (!originalUrl.trim()) return;
    setLoading(true);
    try {
      const shortenedUrl = await UrlService.createUrl({ originalUrl });
      setShortUrl(shortenedUrl.shortUrl);
      setOriginalUrl("");
      setTotalUrls((prev) => prev + 1);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(text);
      setTimeout(() => setCopySuccess(""), 2000);
    } catch {
      toast.error("Failed to copy");
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

  const truncateUrl = (url: string, maxLength = 40) => {
    return url.length > maxLength ? url.substring(0, maxLength) + "..." : url;
  };

  const handleLogout = async () => {
    try {
      const status = await UserService.logout();
      if (status) router("/auth/login");
    } catch (error) {
      console.log(error);
      toast.error("Error Logging Out");
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex relative">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`w-80 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:relative lg:z-auto
        fixed lg:static inset-y-0 left-0`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                {user ? user.username : "User"}
              </h3>
              <p className="text-sm text-gray-600">
                {user ? user.email : "Email"}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2 text-blue-600" />
            Quick Stats
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl shadow-sm border border-blue-200">
              <p className="text-2xl font-bold text-blue-600">{totalUrls}</p>
              <p className="text-xs text-blue-800 font-medium">Total URLs</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl shadow-sm border border-green-200">
              <p className="text-2xl font-bold text-green-600">{totalClicks}</p>
              <p className="text-xs text-green-800 font-medium">Total Clicks</p>
            </div>
          </div>
        </div>

        <div className="p-6 pb-4">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-4 h-4 mr-2 text-blue-600" />
            URL History
            {searchLoading && (
              <div className="ml-2 w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            )}
          </h4>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search URLs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm"
            />
          </div>
          {debouncedSearchTerm && (
            <p className="text-xs text-gray-500 mt-2 px-2">
              {totalCount} result{totalCount !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        <UrlHistoryList
          urlHistory={urlHistory}
          searchLoading={searchLoading}
          debouncedSearchTerm={debouncedSearchTerm}
          setSelectedUrl={setSelectedUrl}
          truncateUrl={truncateUrl}
          formatDate={formatDate}
        />

        <div className="p-6 border-t border-gray-200">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalCount={totalCount}
            onPageChange={handlePageChange}
          />
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl border border-red-200 hover:border-red-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-3 p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <Link2 className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-blue-600" />
              <span className="hidden sm:inline">URL Shortener</span>
              <span className="sm:hidden">Shortener</span>
            </h1>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8">
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-blue-600" />
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleShortenUrl();
                    }}
                  />
                </div>
                <button
                  onClick={handleShortenUrl}
                  disabled={loading || !originalUrl.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Shortening...
                    </div>
                  ) : (
                    "Shorten URL"
                  )}
                </button>
              </div>
              {shortUrl && (
                <ShortUrlBox
                  shortUrl={shortUrl}
                  copyToClipboard={copyToClipboard}
                  copySuccess={copySuccess}
                />
              )}
            </div>
          </div>

          {selectedUrl && (
            <UrlDetails
              selectedUrl={selectedUrl}
              copySuccess={copySuccess}
              copyToClipboard={copyToClipboard}
              formatDate={formatDate}
              setSelectedUrl={setSelectedUrl}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
