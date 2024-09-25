import React from 'react';

const LoadingModal = () => {
  return (
    <div className="loading-modal">
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
