import React from "react";
import Button from "../ui/button/Button";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  buttonTitle?: string;
  onButtonClick?: () => void; // Callback when button is clicked
}

const ComponentCardWithButton: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  buttonTitle,
  onButtonClick, // Receive callback function
}) => {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}>
      {/* Card Header */}
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          {/* Title on the left */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          
          {/* Button on the right */}
          <Button size="sm" variant="outline" onClick={onButtonClick}>
            {buttonTitle}
          </Button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCardWithButton;
