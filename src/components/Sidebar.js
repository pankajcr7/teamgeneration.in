import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserPlus, FaUsers, FaChartBar, FaThLarge, 
         FaHashtag, FaLightbulb, FaTrophy, FaMoneyBillAlt, FaEnvelope, 
         FaYoutube, FaInfoCircle, FaSave } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ userRole }) => {
  const navigate = useNavigate();
  const sidenavRef = useRef();

  const openNav = () => {
    sidenavRef.current.style.width = "250px";
  };

  const closeNav = () => {
    sidenavRef.current.style.width = "0";
  };

  return (
    <>
      <div ref={sidenavRef} className="sidenav">
        <span className="closebtn" onClick={closeNav}>&times;</span>
        <div className="text-center mb-4">
          <img className="tg-logo" src="/tg_dark_logo.png" style={{ width: 200 }} alt="logo" />
        </div>
        <ul className="list-group list-group-flush m-2">
          {(userRole === 'admin' || userRole === 'superuser') && (
            <>
              <li onClick={() => navigate('/register463980')} className="list-group-item" id="side_bar">
                <FaUserPlus /> Register User
              </li>
              <li onClick={() => navigate('/manageuser')} className="list-group-item" id="side_bar">
                <FaUsers /> Manage User
              </li>
            </>
          )}
          
          {userRole === 'superuser' && (
            <li onClick={() => navigate('/accountsdata')} className="list-group-item" id="side_bar">
              <FaChartBar /> Accounts Data
            </li>
          )}

          {userRole === 'admin' && (
            <>
              <li onClick={() => navigate('/admindecisionpanel')} className="list-group-item" id="side_bar">
                <FaThLarge /> Admin Dashboard
              </li>
              <li onClick={() => navigate('/adminaccountsdata')} className="list-group-item" id="side_bar">
                <FaChartBar /> Admin Accounts Data
              </li>
              <li onClick={() => navigate('/dream11hashvalue')} className="list-group-item" id="side_bar">
                <FaHashtag /> Dream11 Hash
              </li>
            </>
          )}

          <li onClick={() => navigate('/howtogenerate')} className="list-group-item" id="side_bar">
            <FaLightbulb /> How to generate?
          </li>
          <li onClick={() => navigate('/besttips')} className="list-group-item" id="side_bar">
            <FaTrophy /> Best tips
          </li>
          <li onClick={() => navigate('/refundpolicy')} className="list-group-item" id="side_bar">
            <FaMoneyBillAlt /> Refund Policy
          </li>
          <li onClick={() => navigate('/contactus')} className="list-group-item" id="side_bar">
            <FaEnvelope /> Contact us
          </li>
          <a href="https://www.youtube.com/c/believer01" className="list-group-item" id="side_bar">
            <FaYoutube /> Follow us on YouTube
          </a>
          <li onClick={() => navigate('/aboutus')} className="list-group-item border-bottom" id="side_bar">
            <FaInfoCircle /> About us
          </li>
          <li onClick={() => navigate('/saved-teams')} className="list-group-item" id="side_bar">
            <FaSave /> Saved Teams
          </li>
        </ul>
        <div className="text-center d-flex flex-column align-items-center m-2 mt-4">
          <small>developed by</small>
          <a href="https://www.youtube.com/c/Believer01" style={{ paddingLeft: 10 }}>
            <img src="/owner.jpg" style={{ width: 150 }} alt="logo" />
          </a>
          <span>All Rights Reserved</span>
          <span>2023 Believer01</span>
          <span>CEO Bobby</span>
        </div>
      </div>

      <nav className="d-flex justify-content-between first-nav top-fix-one align-items-center" style={{ backgroundColor: "#563d7c" }}>
        <FaBars onClick={openNav} style={{ color: "white", marginLeft: 5, cursor: "pointer" }} size={40} />
        <span className="navbar-brand mb-0 text-center">
          <img className="tg-logo" src="/tg_dark_logo.png" alt="tg logo" />
        </span>
        <FaTimes onClick={() => window.location.reload()} style={{ color: "white", marginRight: 5, cursor: "pointer" }} size={40} />
      </nav>
    </>
  );
};

export default Sidebar;
