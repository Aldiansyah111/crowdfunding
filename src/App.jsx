import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import CrowdfundingPage from "./pages/Crowdfunding";

import { CrowdfundingProvider } from "./contexts/CrowdfundingContext"; // ✅ PERBAIKAN DI SINI

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
        <Navbar />
        <CrowdfundingProvider>
          <main className="max-w-4xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/crowdfunding" element={<CrowdfundingPage />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </CrowdfundingProvider>
      </div>
    </Router>
  );
}
