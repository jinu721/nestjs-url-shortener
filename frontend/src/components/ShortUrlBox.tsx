import React from "react";
import { Copy, ExternalLink } from "lucide-react";

type ShortUrlBoxProps = {
  shortUrl: string;
  copyToClipboard: (text: string) => void;
  copySuccess?: string | null;
};

const ShortUrlBox: React.FC<ShortUrlBoxProps> = ({
  shortUrl,
  copyToClipboard,
  copySuccess
}) => {
  return (
    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl">
      <h3 className="font-medium text-green-900 mb-3">Your shortened URL:</h3>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="text"
          value={shortUrl}
          readOnly
          className="flex-1 px-3 py-2 bg-white border border-green-300 rounded-lg text-sm"
        />
        <div className="flex space-x-2">
          <button
            onClick={() => copyToClipboard(shortUrl)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            <Copy className="w-4 h-4" />
          </button>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
      {copySuccess === shortUrl && (
        <p className="text-green-600 text-sm mt-2 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          Copied to clipboard!
        </p>
      )}
    </div>
  );
};

export default React.memo(ShortUrlBox);

