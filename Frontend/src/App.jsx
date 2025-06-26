// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';

import HostHomePage from './pages/HostHomePage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import GettingStarted from './pages/GettingStarted';

import ViewListings from './pages/ViewListings.jsx';
import AddListing from './pages/AddListing';
import EditListing from './pages/EditListing';
import ExplorerHome from './pages/ExplorerHome.jsx';
import ListingsByCategory from './pages/ListingsByCategory.jsx';
import ListingDetails from './pages/ListingDetails.jsx';
import { Rating } from './pages/Rating.jsx';
import Bookings from './pages/Bookings.jsx';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<HostHomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/getting-started" element={<GettingStarted />} />

        {/* Listings routes */}
        <Route path="/listing/view" element={<ViewListings />} />
        <Route path="/listing/add" element={<AddListing />} />
        <Route path="/listing/details/:id" element={<ListingDetails />} />
        <Route path="/listing/rate" element={<Rating />} />
        <Route path="/listing/edit/:id" element={<EditListing />} />

        {/* Explorer */}
        <Route path="/explorer/home" element={<ExplorerHome />} />
        <Route path="/explorer/listings/:category" element={<ListingsByCategory />} />
        <Route path="/explorer/bookings" element={<Bookings />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* 👇 ToastContainer should be placed once at the root level */}
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover closeOnClick draggable />
    </Router>
  );
}

export default App;
