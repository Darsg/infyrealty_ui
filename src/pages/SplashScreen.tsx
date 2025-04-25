import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 transition-opacity ${
        isLoading ? "animate-fadeIn" : "animate-fadeOut"
      }`}
    >
      <div className="relative flex flex-col items-center justify-center space-y-6">
        {/* Light mode logo */}
        <img
          src="/images/logo/logo-dark.svg"
          alt="Logo"
          className="block dark:hidden w-32 h-32 animate-fadeIn"
        />
        {/* Dark mode logo */}
        <img
          src="/images/logo/logo-dark.svg"
          alt="Logo Dark"
          className="hidden dark:block w-32 h-32 animate-fadeIn"
        />
      </div>
    </div>
  );
}
