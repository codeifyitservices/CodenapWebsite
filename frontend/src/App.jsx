import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Training from "./pages/Training";
import Contact from "./pages/Contact";
import ContactBackup from "./pages/ContactBackup";
import ServiceDetailPage from "./pages/ServiceDetailPage";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/training" element={<Training />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/contact" element={<ContactBackup />} />
          <Route path="/contact-backup" element={<ContactBackup />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
