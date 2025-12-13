import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import NewsPage from './Components/News/NewsPage';
import FullNews from './Components/News/FullNews';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import Profile from './Components/profile/Profile';
import Donate from './Components/Donate/Donate';
import ProgrammePage from './Components/Programme/ProgrammePage';
import StudentRegistration from './Components/Programme/StudentRegistration';

// Admin Components
import AdminLayout from './Components/admin/AdminLayout';
import Dashboard from './Components/admin/Dashboard';
import ProgrammeManager from './Components/admin/ProgrammeManager';
import RegistrationManager from './Components/admin/RegistrationManager';
import ReportManager from './Components/admin/ReportManager';
import WhatsAppSender from './Components/admin/WhatsAppSender';
import UserManager from './Components/admin/UserManager';
import NewsManager from './Components/admin/NewsManager';

// Services
import Awareness from './Components/Services/awareness/Awareness';
import WomenEmpowerment from './Components/Services/empowerment/WomenEmpowerment';
import Education from './Components/Services/education/Education';


import Chat from './Components/chat/Chat';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  // Theme handling
  const theme = useSelector((state) => state.theme); // Assuming theme slice exists or handled in Navbar

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes with Navbar/Footer */}
          <Route
            element={
              <>
                <Navbar />
                <main className="min-h-screen">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/news/:id" element={<FullNews />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/donate" element={<Donate />} />
                    <Route path="/programme" element={<ProgrammePage />} />
                    <Route path="/register" element={<StudentRegistration />} />

                    {/* Services */}
                    <Route path="/awareness" element={<Awareness />} />
                    <Route path="/empowerment" element={<WomenEmpowerment />} />
                    <Route path="/education" element={<Education />} />
                  </Routes>
                </main>
                <Footer />
                <div className="messages">
                  <Chat />
                </div>
              </>
            }
          >
            {/* Define all public paths here again to match the wrapper */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<FullNews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/programme" element={<ProgrammePage />} />
            <Route path="/register" element={<StudentRegistration />} />
            <Route path="/awareness" element={<Awareness />} />
            <Route path="/empowerment" element={<WomenEmpowerment />} />
            <Route path="/education" element={<Education />} />
          </Route>

          {/* Admin Routes - No Navbar/Footer */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UserManager />} />
            <Route path="news" element={<NewsManager />} />
            <Route path="programme" element={<ProgrammeManager />} />
            <Route path="registrations" element={<RegistrationManager />} />
            <Route path="reports" element={<ReportManager />} />
            <Route path="whatsapp" element={<WhatsAppSender />} />
            {/* Add other admin routes here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
