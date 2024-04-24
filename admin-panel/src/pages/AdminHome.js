import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoading } from '../contexts/LoadingContext.js';

const AdminHome = () => {
  const { startLoading, stopLoading } = useLoading();

  // useEffect(() => {
  //   // Start loading when the component mounts
  //   startLoading();

  //   // Clean up loading state when component unmounts
  //   return () => {
  //     stopLoading();
  //   };
  // }, [startLoading, stopLoading]);

  // useEffect(() => {
  //   startLoading();

  //   // Stop loading either when content is loaded or immediately (if already loaded)
  //   const handleContentLoaded = () => {
  //     stopLoading();
  //   };

  //   window.addEventListener('load', handleContentLoaded);

  //   // Ensure cleanup even if content is already loaded
  //   return () => {
  //     window.removeEventListener('load', handleContentLoaded);
  //     stopLoading(); // Stop loading if still active
  //   };
  // }, [startLoading, stopLoading]);

  return (
    <div>
      <div className="content">
        {/* Your main content goes here */}
        <h2>Admin Home Page</h2>
        {/* Add more content as needed */}
        <Link to='/ads'>Ads Manager</Link>
        <br />
        <Link to='/newsletter-subscriptions'>Newsletter Subscriptions</Link>
      </div>
    </div>
  );
};

export default AdminHome;
