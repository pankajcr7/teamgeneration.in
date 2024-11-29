import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaList, FaSearch } from 'react-icons/fa';

const Footer = ({ bottomIndex, setBottomIndex }) => {
  const navigate = useNavigate();

  return (
    <div className="footer container d-flex justify-content-around pt-2" style={{ maxWidth: 600, padding: 0 }}>
      <div
        onClick={() => {
          setBottomIndex(0);
          navigate('/');
        }}
        className={bottomIndex === 0 ? "sport-icon sport-icon-active" : "sport-icon"}
      >
        <FaHome size={20} />
        <span>Home</span>
      </div>
      
      <div
        onClick={() => {
          setBottomIndex(1);
          navigate('/mymatches');
        }}
        className={bottomIndex === 1 ? "sport-icon sport-icon-active" : "sport-icon"}
      >
        <FaList size={20} />
        <span>My matches</span>
      </div>
      
      <div
        onClick={() => {
          setBottomIndex(3);
          navigate('/research');
        }}
        style={{ position: 'relative' }}
        className={bottomIndex === 3 ? "sport-icon sport-icon-active" : "sport-icon"}
      >
        <FaSearch size={20} />
        <span>Research</span>
      </div>
    </div>
  );
};

export default Footer;
