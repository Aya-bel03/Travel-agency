import React from 'react';
import { Plane } from 'lucide-react';

const LoadingSpinner = ({ size = 'default', text = 'Chargement...' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  const textSizes = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-emerald-200 rounded-full" />
        
        {/* Spinning ring */}
        <div className="absolute inset-0 border-4 border-emerald-600 rounded-full border-t-transparent animate-spin" />
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Plane className="w-1/2 h-1/2 text-emerald-600 animate-pulse" />
        </div>
      </div>
      
      {text && (
        <p className={`text-gray-600 ${textSizes[size]} font-medium animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
