import React from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  showPassword?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  icon: Icon,
  showPasswordToggle = false,
  onTogglePassword,
  showPassword = false,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          {label}
        </label>
      )}

      <div className="relative group">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-600" />
        )}

        <input
          type={
            showPasswordToggle ? (showPassword ? "text" : "password") : type
          }
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3.5 text-base
            ${Icon ? "pl-12" : "px-4"}
            ${showPasswordToggle ? "pr-12" : "pr-4"}
            bg-white
            border-2 rounded-xl
            transition-all duration-200 ease-in-out
            placeholder:text-gray-400
            ${
              error
                ? "border-red-300 bg-red-50/30 text-red-900 placeholder:text-red-400"
                : "border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:bg-blue-50/30"
            }
            focus:outline-none focus:ring-4 focus:ring-blue-100
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          `}
          {...props}
        />

        {showPasswordToggle && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="mt-2 flex items-start space-x-2">
          <div className="flex-shrink-0 w-1 h-1 bg-red-500 rounded-full mt-2"></div>
          <p className="text-sm text-red-600 leading-5">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
