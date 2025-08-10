import React from "react";
import { Copy, ExternalLink } from "lucide-react";

type UrlDetailsProps = {
  selectedUrl: {
    originalUrl: string;
    shortUrl: string;
    clicks: number;
    createdAt: string | Date;
  };
  copySuccess?: string | null;
  copyToClipboard: (text: string) => void;
  formatDate: (date: string | Date) => string;
  setSelectedUrl: (value: null) => void;
};

const UrlDetails: React.FC<UrlDetailsProps> = ({
  selectedUrl,
  copySuccess,
  copyToClipboard,
  formatDate,
  setSelectedUrl
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">URL Details</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original URL
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={selectedUrl.originalUrl}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                />
                <button
                  onClick={() => copyToClipboard(selectedUrl.originalUrl)}
                  className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short URL
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={selectedUrl.shortUrl}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                />
                <button
                  onClick={() => copyToClipboard(selectedUrl.shortUrl)}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <a
                  href={selectedUrl.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              {copySuccess === selectedUrl.shortUrl && (
                <p className="text-blue-600 text-sm mt-2 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                  Copied to clipboard!
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Clicks
              </label>
              <p className="text-3xl font-bold text-green-600">
                {selectedUrl.clicks}
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Created
              </label>
              <p className="text-lg font-semibold text-blue-600">
                {formatDate(selectedUrl.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setSelectedUrl(null)}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 font-medium"
        >
          Close Details
        </button>
      </div>
    </div>
  );
};

export default UrlDetails;
