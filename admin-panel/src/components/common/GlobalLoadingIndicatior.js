// admin-panel/src/components/common/GlobalLoadingIndicatior.js

import React from 'react';
import { useLoading } from '../../contexts/LoadingContext';
import '../../assets/css/common/GlobalLoadingIndicator.css';

const GlobalLoadingIndicator = () => {
  const { isLoading } = useLoading();

  return <div className={`global-loading-indicator ${isLoading ? 'visible' : 'hidden'}`}></div>;
};

export default GlobalLoadingIndicator;
