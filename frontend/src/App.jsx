import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Training from "./pages/Training";
import Contact from "./pages/Contact";
import ContactBackup from "./pages/ContactBackup";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import Careers from "./pages/Careers";
import ScrollToTop from "./components/ScrolltoTop";

// Admin Panel Components
import AdminLayout from "./components/AdminLayout";
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import ManageServices from "./pages/Admin/ManageServices";
import ManageFAQs from "./pages/Admin/ManageFAQs";
import ManageTestimonials from "./pages/Admin/ManageTestimonials";
import ManageJobs from "./pages/Admin/ManageJobs";
import ViewApplications from "./pages/Admin/ViewApplications";
import ManageContactInfo from "./pages/Admin/ManageContactInfo";

function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <div className={isAdminPath ? "min-h-screen bg-slate-950 text-slate-100" : "min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between"}>
      <div>
        {!isAdminPath && <Navbar />}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/training" element={<Training />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/contact" element={<ContactBackup />} />
          <Route path="/contact-backup" element={<ContactBackup />} />
          <Route path="/careers" element={<Careers />} />

          {/* Admin Dashboard Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="services" element={<ManageServices />} />
            <Route path="faqs" element={<ManageFAQs />} />
            <Route path="testimonials" element={<ManageTestimonials />} />
            <Route path="jobs" element={<ManageJobs />} />
            <Route path="applications" element={<ViewApplications />} />
            <Route path="contact-info" element={<ManageContactInfo />} />
          </Route>
        </Routes>
      </div>

      {!isAdminPath && <Footer />}
    </div>
  );
}

export default App;
