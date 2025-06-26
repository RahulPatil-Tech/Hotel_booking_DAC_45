// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer.jsx';
import Signup from './components/Signup';
import Login from './components/Login';

import HostHomePage from './pages/HostHomePage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import GettingStarted from './pages/GettingStarted';

import ViewListings from './pages/ViewListings.jsx';     
import AddListing from './pages/AddListing';        
import ExplorerHome from './pages/ExplorerHome.jsx';
import ListingsByCategory from './pages/ListingsByCategory.jsx';
import ListingDetails from './pages/ListingDetails.jsx';
import { Rating } from './pages/Rating.jsx';
import Bookings from './pages/Bookings.jsx';
import AdminHome from './pages/AdminHome.jsx';
import ViewHosts from './pages/ViewHosts.jsx';

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

        <Route path="/listing/view" element={<ViewListings />} />
        <Route path="/listing/add" element={<AddListing />} />
        <Route path="/explorer/home" element={<ExplorerHome />} />
        <Route path="/explorer/listings/:category" element={<ListingsByCategory />} />
        <Route path="/listing/details/:id" element={<ListingDetails />} />
        <Route path="/listing/rate" element={<Rating />} />
        <Route path="/explorer/bookings" element={<Bookings />} />

        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/view-hosts" element={<ViewHosts />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


