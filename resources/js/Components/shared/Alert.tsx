import CloseButton from '@/Components/shared/button/CloseButton';
import { Check, CircleX, TriangleAlert } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Alert {
  message: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  variant?: 'success' | 'error' | 'warning';
  duration?: number; // Duration for the progress bar in milliseconds
}

export default function Alert({
  icon,
  action,
  message,
  variant,
  onClose,
  duration = 5000, // Default duration for the progress bar
}: Alert) {
  const [progress, setProgress] = useState(100); // Progress bar starts at 100%

  // Define colors and icons based on the variant
  const color = {
    success: 'green',
    error: 'red',
    warning: 'yellow',
  }[variant || 'success'];

  const backgroundColor = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
  }[variant || 'success'];

  const iconComponent = {
    success: <Check size={20} className="text-green-500" />,
    error: <CircleX size={20} className="text-red-500" />,
    warning: <TriangleAlert size={20} className="text-yellow-500" />,
  }[variant || 'success'];

  // Handle the progress bar animation and auto-close
  useEffect(() => {
    if (duration) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 1, 0));
      }, duration / 100);

      return () => clearInterval(interval);
    }
  }, [duration]);

  // Close the alert when the progress bar reaches 0%
  useEffect(() => {
    if (progress === 0 && onClose) {
      onClose();
    }
  }, [progress, onClose]);

  return (
    <div
      className={`${backgroundColor} px-4 mb-8 flex flex-col sm:rounded-lg w-full relative overflow-hidden`}
    >
      {/* Progress Bar */}
      {duration && (
        <div
          className="absolute top-0 left-0 h-1 bg-opacity-50"
          style={{
            width: `${progress}%`,
            backgroundColor: color === 'green' ? '#4ade80' : color === 'red' ? '#f87171' : '#facc15',
          }}
        />
      )}

      {/* Alert Content */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center space-x-2">
          {icon || iconComponent}
          <div className="text-sm font-medium">{message}</div>
        </div>
        <div className="flex items-center space-x-2">
          {action}
          {onClose && <CloseButton onClick={onClose} color={color} />}
        </div>
      </div>
    </div>
  );
}
