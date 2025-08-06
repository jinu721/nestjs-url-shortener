import React, { useState, useEffect } from 'react';
import { Link2, Copy, ExternalLink, Clock, BarChart3, LogOut, User, Plus, Search, Calendar, TrendingUp } from 'lucide-react';

// Mock data for demonstration
const mockUser = {
  name: "John Doe",
  email: "john@example.com"
};

const mockUrlHistory = [
  {
    id: 1,
    originalUrl: "https://www.google.com/search?q=react+hooks+tutorial",
    shortUrl: "https://short.ly/abc123",
    shortCode: "abc123",
    clicks: 45,
    createdAt: "2024-08-07T10:30:00Z"
  },
  {
    id: 2,
    originalUrl: "https://github.com/facebook/react",
    shortUrl: "https://short.ly/def456",
    shortCode: "def456",
    clicks: 123,
    createdAt: "2024-08-06T14:20:00Z"
  },
  {
    id: 3,
    originalUrl: "https://nestjs.com/documentation",
    shortUrl: "https://short.ly/ghi789",
    shortCode: "ghi789",
    clicks: 67,
    createdAt: "2024-08-05T09:15:00Z"
  },
  {
    id: 4,
    originalUrl: "https://tailwindcss.com/docs/installation",
    shortUrl: "https://short.ly/jkl012",
    shortCode: "jkl012",
    clicks: 89,
    createdAt: "2024-08-04T16:45:00Z"
  },
  {
    id: 5,
    originalUrl: "https://jwt.io/introduction/",
    shortUrl: "https://short.ly/mno345",
    shortCode: "mno345",
    clicks: 32,
    createdAt: "2024-08-03T11:30:00Z"
  }
];

const HomePage = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [urlHistory, setUrlHistory] = useState(mockUrlHistory);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');

  const handleShortenUrl = async () => {
    if (!originalUrl.trim()) return;

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newShortCode = Math.random().toString(36).substring(2, 8);
      const newShortUrl = `https://short.ly/${newShortCode}`;
      
      const newUrl = {
        id: Date.now(),
        originalUrl: originalUrl,
        shortUrl: newShortUrl,
        shortCode: newShortCode,
        clicks: 0,
        createdAt: new Date().toISOString()
      };
      
      setUrlHistory([newUrl, ...urlHistory]);
      setShortUrl(newShortUrl);
      setOriginalUrl('');
    } catch (error) {
      console.error('Error shortening URL:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(text);
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateUrl = (url, maxLength = 40) => {
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
  };

  const filteredHistory = urlHistory.filter(url =>
    url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.shortCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalClicks = urlHistory.reduce((sum, url) => sum + url.clicks, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg flex flex-col">
        {/* User Profile */}
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

        {/* Stats */}
        <div className="p-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Quick Stats
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{urlHistory.length}</p>
              <p className="text-xs text-blue-800">Total URLs</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{totalClicks}</p>
              <p className="text-xs text-green-800">Total Clicks</p>
            </div>
          </div>
        </div>

        {/* URL History */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 pb-4">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              URL History
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
          </div>
          
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {filteredHistory.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No URLs found</p>
            ) : (
              <div className="space-y-3">
                {filteredHistory.map((url) => (
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
                        <p className="text-xs text-blue-600 mt-1">{url.shortCode}</p>
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
        </div>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-200">
          <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Link2 className="w-8 h-8 mr-3 text-blue-600" />
            URL Shortener
          </h1>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          {/* URL Shortener Form */}
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
                  />
                </div>
                
                <button
                  onClick={handleShortenUrl}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Shortening...' : 'Shorten URL'}
                </button>
              </div>

              {shortUrl && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">Your shortened URL:</h3>
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
                    <p className="text-green-600 text-sm mt-2">Copied to clipboard!</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Selected URL Details */}
          {selectedUrl && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">URL Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original URL</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Short URL</label>
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
                      <p className="text-blue-600 text-sm mt-1">Copied to clipboard!</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Clicks</label>
                      <p className="text-2xl font-bold text-green-600">{selectedUrl.clicks}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                      <p className="text-sm text-gray-600">{formatDate(selectedUrl.createdAt)}</p>
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