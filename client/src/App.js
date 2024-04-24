//client/src/App.js
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate  } from 'react-router-dom';
import Home from './pages/Home';
import BlogHomePage from './pages/blogs/BlogHomePage';
import BlogDetails from './pages/blogs/BlogDetails';
import Newsletter from './pages/newsletter/Newsletter';
import GlobalLoadingIndicator from './components/common/GlobalLoadingIndicatior.js';
import RedirectToBlogs from './RedirectToBlogs.js';

function App() {

  return (
    <>
      <Router>

        <Routes>
          
          <Route path="/" element={<Navigate to="/blogs" replace />} />
          <Route exact path="/blogs" element={<BlogHomePage />} />
          <Route path="/blogs/:title/:postId" element={<BlogDetails />} />
          <Route path="/newsletter" element={<Newsletter />} />

        </Routes>
      </Router>
    </>
  )
}

export default App