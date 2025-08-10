import React from "react";
import {
  Zap,
  Shield,
  BarChart3,
  Clock,
  Check,
  ArrowRight,
} from "lucide-react";
import { Outlet } from "react-router-dom"; 


interface AuthPageProps {
  onAuthSuccess?: () => void;
}

const AuthPage: React.FC<AuthPageProps> = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate short URLs instantly with our optimized infrastructure",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee",
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Track clicks, geography, devices, and more with real-time insights",
    },
    {
      icon: Clock,
      title: "URL History",
      description: "Access all your shortened URLs with complete history tracking",
    },
  ];

  const benefits = [
    "Unlimited URL shortening",
    "Click tracking & analytics",
    "Custom aliases & domains",
    "Bulk URL management",
    "Advanced security features",
    "24/7 customer support",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 min-h-screen items-center">
          <div className="flex justify-center">
              <Outlet /> 
          </div>

          <div className="space-y-10">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                The Ultimate{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  URL Shortener
                </span>
              </h1>
              <p className="text-lg text-gray-600">
                Transform long URLs into powerful, trackable short links with advanced analytics.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-white/70 backdrop-blur-md rounded-lg shadow-sm"
                >
                  <div
                    className={`p-2 rounded-full ${
                      index % 3 === 0
                        ? "bg-blue-500"
                        : index % 3 === 1
                        ? "bg-purple-500"
                        : "bg-indigo-500"
                    }`}
                  >
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">{feature.title}</h4>
                    <p className="text-xs text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">
                Everything you need to manage your links
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-300" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center text-blue-100 text-sm font-medium">
                <span>Get started today</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
