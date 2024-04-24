// src/App.js
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom';
import AdminHome from './pages/AdminHome';
import Login from './pages/Login';
import Blogs from './pages/blog/Blogs.js';
import NavigationBar from './components/common/NavigationBar';
import { AuthProvider, useAuth } from './auth/AuthContext.js';
import NotFound from './pages/NotFound';
import BlogDetail from './pages/blog/BlogDetail.js';
import './App.css'
import SideBarMenu from './components/common/SideMenu/SideBarMenu.js';
import { div, Container, Row, Col } from 'react-bootstrap';
import MinimizedBar from './components/common/SideMenu/MinimizedBar.js';
import { useSideBar, SideBarProvider } from './contexts/SideBarContext.js';
import AdsPage from './pages/advertisement/AdsPage.js';
import GlobalLoadingIndicator from './components/common/GlobalLoadingIndicatior.js';
import AdsDetail from './pages/advertisement/AdsDetail.js';
import NewsletterSubscriptions from './pages/Newsletter/NewsletterSubscriptions.js';


const App = () => {
  const { isLoggedIn } = useAuth();
  const { isSidebarVisible } = useSideBar();

  return (
    <>
      <Router>
        <NavigationBar />
        <GlobalLoadingIndicator />
        {isLoggedIn && (
          <SideBarMenu />
        )}

        <Container className={`main-container ${isSidebarVisible ? 'shifted-content' : ''}`} >
          <Routes>
            {isLoggedIn ? (
              <>
                {/* Admin Home Page */}
                <Route path="/" element={<AdminHome />} />
                <Route path="/admin-panel" element={<AdminHome />} />
                <Route path='/login' element={<AdminHome />} />

                {/* Admin Blog Page */}
                <Route path='/manage-blogs' element={<Blogs />} />

                {/* Blog Editor Page */}
                {/* <Route path="/blog-editor" element={<BlogEditor />} /> */}

                {/* Blog Detail Page */}
                <Route path="/blog/:postTitle/:postId" element={<BlogDetail />} />

                {/* Admin Advertisement Page */}
                <Route path="/ads" element={<AdsPage />} />
                <Route path="/ads/:advertisementId" element={<AdsDetail />} />

                {/* Newsletter Subscriptions Page */}
                <Route path="/newsletter-subscriptions" element={<NewsletterSubscriptions/>} />
 
                {/* 404 Page */}
                <Route path='*' element={<NotFound />} />
              </>
            ) : (
              <>
                {/* Redirect to login if not logged in */}
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path='*' element={<NotFound />} />
                {/* Admin Login Page */}
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
