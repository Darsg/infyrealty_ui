import React from 'react';
import ProgressBarInfinite from './ProgressBarInfinite';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-opacity-50">
      {/* Full-width top progress bar */}
      <div className="absolute top-0 left-0 right-0">
        <ProgressBarInfinite />
      </div>
    </div>
  );
};

export default LoadingOverlay;
