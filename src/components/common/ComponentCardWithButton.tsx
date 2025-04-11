import React, { useState } from "react";
import Button from "../ui/button/Button";
import { ArrowLeftIcon } from "../../icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

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
  buttonThreeTitle?: string;
  onThirdButtonClick?: () => void;
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
  onSecondButtonClick,
  buttonThreeTitle,
  onThirdButtonClick
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
                <ArrowLeftIcon className="fill-gray-500 size-6 hover:cursor-pointer transition-all duration-200" />
              </button>
            )}
            {title}
          </h3>

          {/* Buttons for Large Screens */}
          <div className="hidden sm:flex gap-2">
            {buttonThreeTitle && (
              <Button size="sm" variant="outline" onClick={onThirdButtonClick}>
                {buttonThreeTitle}
              </Button>
            )}
            {buttonTwoTitle && (
              <Button size="sm" variant="outline" onClick={onSecondButtonClick}>
                {buttonTwoTitle}
              </Button>
            )}
            {buttonTitle && (
              <Button size="sm" variant="outline" onClick={onButtonClick}>
                {buttonTitle}
              </Button>
            )}
          </div>

          {/* Dropdown Button for Small Screens */}
          <div className="relative block sm:hidden">
            <Button size="sm" variant="outline" onClick={() => setIsOpen(!isOpen)}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z" fill="currentColor"></path>
              </svg>
            </Button>

            {isOpen && (
              <Dropdown
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
              >
                <ul className="flex flex-col gap-1 pt-4 pb-3">
                  {buttonThreeTitle && (
                    <li>
                      <DropdownItem
                        onItemClick={() => setIsOpen(false)}
                        tag="button"
                        className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                        onClick={onThirdButtonClick}
                      >
                        {buttonThreeTitle}
                      </DropdownItem>
                    </li>
                  )}
                  {buttonTwoTitle && (
                    <li>
                      <DropdownItem
                        onItemClick={() => setIsOpen(false)}
                        tag="button"
                        className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                        onClick={onSecondButtonClick}
                      >
                        {buttonTwoTitle}
                      </DropdownItem>
                    </li>
                  )}
                  <li>
                    <DropdownItem
                      onItemClick={() => setIsOpen(false)}
                      tag="button"
                      className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                      onClick={onButtonClick}
                    >
                      {buttonTitle}
                    </DropdownItem>
                  </li>
                </ul>
              </Dropdown>
            )}
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
