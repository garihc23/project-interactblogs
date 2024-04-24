// src/auth/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { Navigate } from 'react-router-dom'


const AuthContext = createContext();
const secretKey = process.env.REACT_APP_ADMIN_JWT_SECRET_KEY;
console.log ("SECRETKEY", secretKey);
const expectedAdminId = process.env.REACT_APP_ADMIN_ID;

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove('token');
    localStorage.removeItem('token');
    setLoggedIn(false);
    // navigate('/')
    <Navigate to="/login" />
    // Clear the token from cookies on logout
  };

  // useEffect(() => {
  //   // Check for an existing token in cookies
  //   // const token = Cookies.get('userToken');
  //   // console.log("USER_TOKEN",token)

  //   const cookies = document.cookie.split(';').map(cookie => cookie.split('='));
  //   const token = cookies.find(cookie => cookie[0].trim() === 'userToken');
  //   // console.log("USER_TOKEN", token ? token[1] : null);
  //   const userToken = token ? token[1] : null;
  //   localStorage.setItem('token', userToken);
  //   // const userToken=localStorage.getItem(token);

  //   if (userToken) {
  //     if (validateToken(userToken, secretKey)) {
  //       login();
  //     } else {
  //       logout();
  //     }
  //   }
  // }, [login, logout]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (validateToken(token, secretKey)) {
        login();
      } else {
        logout();
      }
    }
  }, [login, logout]);

  const validateToken = (userToken, secretKey) => {
    try {
      const decodedToken = jwtDecode(userToken, secretKey);
      console.log("decodedToken", decodedToken)

      // Check expiration time
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
      console.log("CURRENT TIME", currentTime);
      
      if (decodedToken.exp < currentTime) {
        console.log("Check time case 1", decodedToken.exp)
        return false; // Token is expired 
      }
      if (decodedToken.iat > currentTime, decodedToken.iat) {
        console.log("Check time case2")
        // return false; // Token was issued in the future (possible replay attack)
      }
      if (decodedToken.isAdmin === false) {
        console.log("Check isAdmin")
        return false;
      }
      console.log("Checks done")

      console.log("CHECKING ADMIN ID", expectedAdminId, secretKey)
      // Check adminId
      // if (decodedToken.userId !== expectedAdminId) {
      //   return false; // AdminId doesn't match
      // }
      // Check issuer (if applicable)
      // Example: if (decodedToken.iss !== 'https://yourdomain.com') { return false; }

      // Check audience (if applicable)
      // Example: if (decodedToken.aud !== 'your_audience') { return false; }

      // Additional custom claim validation (if applicable)
      // Example: if (decodedToken.roles.includes('admin')) { ... }

      // Token is valid
      return true;
    } catch (error) {
      return false; // Token decoding failed
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};