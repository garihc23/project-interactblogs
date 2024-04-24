import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RedirectToBlogs() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/blogs', { replace: true });
  }, [navigate]);

  // This component doesn't render anything, just redirects
  return null;
}

export default RedirectToBlogs;
