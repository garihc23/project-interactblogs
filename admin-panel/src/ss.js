import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminHome from './pages/AdminHome';
import Login from './pages/Login';
import Blogs from './pages/blog/Blogs.js';
import NavigationBar from './components/common/NavigationBar';
import { AuthProvider, useAuth } from './auth/AuthContext.js';
import NotFound from './pages/NotFound';
import BlogDetail from './pages/blog/BlogDetail.js';
import SideBarMenu from './components/common/SideMenu/SideBarMenu.js';
import { Container } from 'react-bootstrap';
import AdsPage from './pages/advertisement/AdsPage.js';
import GlobalLoadingIndicator from './components/common/GlobalLoadingIndicatior.js';
import AdsDetail from './pages/advertisement/AdsDetail.js';
import NewsletterSubscriptions from './pages/Newsletter/NewsletterSubscriptions.js';

const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Router>
        {/* Navigation Bar */}
        <NavigationBar />
        {/* Global Loading Indicator */}
        <GlobalLoadingIndicator />
        
        {/* Main Content */}
        <Container>
          <Routes>
            {isLoggedIn ? (
              <>
                {/* Admin Routes */}
                <Route path="/" element={<AdminHome />} />
                <Route path="/admin-panel" element={<AdminHome />} />
                <Route path='/login' element={<AdminHome />} />
                <Route path='/manage-blogs' element={<Blogs />} />
                <Route path="/blog/:postTitle/:postId" element={<BlogDetail />} />
                <Route path="/ads" element={<AdsPage />} />
                <Route path="/ads/:advertisementId" element={<AdsDetail />} />
                <Route path="/newsletter-subscriptions" element={<NewsletterSubscriptions />} />
                <Route path='*' element={<NotFound />} />
              </>
            ) : (
              <>
                {/* Non-Admin Routes */}
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path='*' element={<NotFound />} />
                <Route path='/login' element={<Login />} />
              </>
            )}
          </Routes>
        </Container>
      </Router>
    </>
  );
};

export default App;
