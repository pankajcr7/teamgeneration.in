import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import MatchList from './components/MatchList';
import MatchSetup from './pages/MatchSetup';
import TeamSelection from './pages/TeamSelection';
import SavedTeams from './pages/SavedTeams';
import MyMatches from './pages/MyMatches';
import Register from './pages/Register';
import ManageUser from './pages/ManageUser';
import AccountsData from './pages/AccountsData';
import AdminDashboard from './pages/AdminDashboard';
import AdminAccountsData from './pages/AdminAccountsData';
import Dream11Hash from './pages/Dream11Hash';
import HowToGenerate from './pages/HowToGenerate';
import BestTips from './pages/BestTips';
import RefundPolicy from './pages/RefundPolicy';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
import './App.css';

function App() {
  const [userRole] = useState('admin'); // For testing, we'll set it to admin
  const [bottomIndex, setBottomIndex] = useState(0);

  return (
    <Router>
      <div className="app">
        <Sidebar userRole={userRole} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<MatchList userRole={userRole} />} />
            <Route path="/match/:matchId" element={<MatchSetup userRole={userRole} />} />
            <Route path="/match/:matchId/select" element={<TeamSelection userRole={userRole} />} />
            <Route path="/mymatches" element={<MyMatches />} />
            <Route path="/register463980" element={<Register />} />
            <Route path="/manageuser" element={<ManageUser />} />
            <Route path="/accountsdata" element={<AccountsData />} />
            <Route path="/admindecisionpanel" element={<AdminDashboard />} />
            <Route path="/adminaccountsdata" element={<AdminAccountsData />} />
            <Route path="/dream11hashvalue" element={<Dream11Hash />} />
            <Route path="/howtogenerate" element={<HowToGenerate />} />
            <Route path="/besttips" element={<BestTips />} />
            <Route path="/refundpolicy" element={<RefundPolicy />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/saved-teams" element={<SavedTeams />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
        <Footer bottomIndex={bottomIndex} setBottomIndex={setBottomIndex} />
      </div>
    </Router>
  );
}

export default App;
