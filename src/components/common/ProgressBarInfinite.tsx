import React from 'react';

const ProgressBarInfinite: React.FC = () => {
  return (
    <div className="w-full h-1 bg-gray-300 dark:bg-gray-700 overflow-hidden relative">
      <div className="absolute top-0 w-1/3 h-full bg-brand-500 progress-bar" />
    </div>
  );
};

export default ProgressBarInfinite;
