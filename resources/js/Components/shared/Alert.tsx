import React, { useEffect, useState } from 'react';
import { Check, CircleX, Info, TriangleAlert, X } from 'lucide-react';

interface Alert {
  message: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  variant?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  title?: string;
}

export default function Alert({
  icon,
  action,
  message,
  variant = 'info',
  title,
  onClose,
  duration = 5000,
}: Alert) {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  // Simple variant styles
  const variantStyles = {
    success: {
      background: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-l-4 border-green-500',
      text: 'text-green-800 dark:text-green-200',
      progressBar: 'bg-green-500',
      iconColor: 'text-green-500',
      iconBackground: 'bg-green-100 dark:bg-green-800/30',
    },
    error: {
      background: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-l-4 border-red-500',
      text: 'text-red-800 dark:text-red-200',
      progressBar: 'bg-red-500',
      iconColor: 'text-red-500',
      iconBackground: 'bg-red-100 dark:bg-red-800/30',
    },
    warning: {
      background: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-l-4 border-amber-500',
      text: 'text-amber-800 dark:text-amber-200',
      progressBar: 'bg-amber-500',
      iconColor: 'text-amber-500',
      iconBackground: 'bg-amber-100 dark:bg-amber-800/30',
    },
    info: {
      background: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-l-4 border-blue-500',
      text: 'text-blue-800 dark:text-blue-200',
      progressBar: 'bg-blue-500',
      iconColor: 'text-blue-500',
      iconBackground: 'bg-blue-100 dark:bg-blue-800/30',
    },
  };

  const style = variantStyles[variant];

  const defaultIcons = {
    success: <Check size={18} className={style.iconColor} />,
    error: <CircleX size={18} className={style.iconColor} />,
    warning: <TriangleAlert size={18} className={style.iconColor} />,
    info: <Info size={18} className={style.iconColor} />,
  };

  // Handle the progress bar animation and auto-close
  useEffect(() => {
    if (duration) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = Math.max(prev - 1, 0);
          if (newProgress === 0 && onClose) {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }
          return newProgress;
        });
      }, duration / 100);

      return () => clearInterval(interval);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`${style.background} ${style.border} shadow-sm mb-4 rounded-lg overflow-hidden relative animate-fadeIn`}
    >
      {/* Progress Bar */}
      {duration && (
        <div
          className={`absolute bottom-0 left-0 h-1 ${style.progressBar}`}
          style={{ width: `${progress}%` }}
        />
      )}

      {/* Alert Content */}
      <div className="flex items-center p-4">
        {/* Icon */}
        <div className={`${style.iconBackground} p-2 rounded-full mr-3 flex-shrink-0`}>
          {icon || defaultIcons[variant]}
        </div>

        {/* Message */}
        <div className="flex-grow">
          {title && <h4 className={`font-semibold ${style.text} text-sm`}>{title}</h4>}
          <div className={`${style.text} text-sm`}>{message}</div>
        </div>

        {/* Action and Close */}
        <div className="flex items-center ml-4 flex-shrink-0">
          {action && <div className="mr-2">{action}</div>}
          {onClose && (
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className={`p-1.5 rounded-full ${style.iconBackground} ${style.iconColor} hover:opacity-80`}
              aria-label="Close"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
