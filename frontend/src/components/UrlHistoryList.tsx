import React from "react";
import { Search, Calendar, TrendingUp } from "lucide-react";

type UrlHistoryItem = {
  id: string | number;
  originalUrl: string;
  shortCode: string;
  createdAt: string | Date;
  clicks: number;
};

type UrlHistoryListProps = {
  urlHistory: UrlHistoryItem[];
  searchLoading: boolean;
  debouncedSearchTerm?: string;
  setSelectedUrl: (url: UrlHistoryItem) => void;
  truncateUrl: (url: string) => string;
  formatDate: (date: string | Date) => string;
};

const UrlHistoryList: React.FC<UrlHistoryListProps> = ({
  urlHistory,
  searchLoading,
  debouncedSearchTerm,
  setSelectedUrl,
  truncateUrl,
  formatDate
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-6">
      {urlHistory.length === 0 ? (
        <div className="text-center py-12">
          {searchLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3" />
              <span className="text-gray-500">Searching...</span>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500">
                {debouncedSearchTerm
                  ? "No URLs found matching your search"
                  : "No URLs found"}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {urlHistory.map((url) => (
            <div
              key={url.id}
              className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-md group"
              onClick={() => setSelectedUrl(url)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-900">
                    {truncateUrl(url.originalUrl)}
                  </p>
                  <p className="text-xs text-blue-600 mt-1 font-medium">
                    {url.shortCode}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xs text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(url.createdAt)}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center bg-white px-2 py-1 rounded-full shadow-sm">
                      <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                      {url.clicks}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(UrlHistoryList);

