import React from "react";
import Button from "../ui/button/Button";
import { ChevronLeftIcon } from "../../icons";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  backButton?: boolean;
  onBackButtonClick?: () => void;
  className?: string; // Additional custom classes for styling
  buttonTitle?: string;
  onButtonClick?: () => void; // Callback when button is clicked
  buttonTwoTitle?: string;
  onSecondButtonClick?: () => void;
}

const ComponentCardWithButton: React.FC<ComponentCardProps> = ({
  title,
  children,
  backButton,
  onBackButtonClick,
  className = "",
  buttonTitle,
  onButtonClick, // Receive callback function
  buttonTwoTitle,
  onSecondButtonClick
}) => {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}>
      {/* Card Header */}
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          {/* Title on the left */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              {backButton && (
                <button
                  className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 flex gap-4 mr-2"
                  onClick={onBackButtonClick}
                >
                  <ChevronLeftIcon className="fill-gray-500 size-6 hover:cursor-pointer transition-all duration-200"/>
                </button>
              )}
            {title}
          </h3>
          
          {/* Button on the right */}
          <div className="flex gap-2">
            {buttonTwoTitle && (
              <Button size="sm" variant="outline" onClick={onSecondButtonClick}>
                {buttonTwoTitle}
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={onButtonClick}>
              {buttonTitle}
            </Button>
          </div>
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
