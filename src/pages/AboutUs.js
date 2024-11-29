import React from 'react';
import { FaUsers, FaTrophy, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="container">
      <h2 className="mb-4">About Us</h2>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Our Mission</h5>
          <p className="card-text">
            At Team Generation, we are dedicated to revolutionizing the fantasy sports experience
            by providing cutting-edge team generation tools and expert insights. Our mission is
            to empower users to make informed decisions and maximize their chances of success
            in Dream11 contests.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">
                <FaUsers className="me-2" />
                Who We Are
              </h5>
            </div>
            <div className="card-body">
              <p>
                We are a team of passionate sports enthusiasts, data analysts, and technology
                experts who understand the intricacies of fantasy sports. Our diverse team
                brings together years of experience in sports analysis, algorithm development,
                and user experience design.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">
                <FaTrophy className="me-2" />
                Our Achievement
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li className="mb-2">✓ 100,000+ Satisfied Users</li>
                <li className="mb-2">✓ 1 Million+ Teams Generated</li>
                <li className="mb-2">✓ 90% Success Rate</li>
                <li className="mb-2">✓ Award-winning Algorithm</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">
                <FaChartLine className="me-2" />
                Our Approach
              </h5>
            </div>
            <div className="card-body">
              <p>
                We combine advanced statistical analysis with machine learning to provide
                you with the most accurate team predictions. Our algorithm considers:
              </p>
              <ul>
                <li>Historical player performance</li>
                <li>Current form and fitness</li>
                <li>Head-to-head statistics</li>
                <li>Pitch and weather conditions</li>
                <li>Team composition and strategy</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">
                <FaShieldAlt className="me-2" />
                Our Commitment
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Quality:</strong> We maintain high standards in our predictions and analysis
                </li>
                <li className="list-group-item">
                  <strong>Reliability:</strong> Our systems are available 24/7 with 99.9% uptime
                </li>
                <li className="list-group-item">
                  <strong>Support:</strong> Dedicated customer support team for quick resolution
                </li>
                <li className="list-group-item">
                  <strong>Innovation:</strong> Continuous improvement of our algorithms and features
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Join Our Community</h5>
          <p className="card-text">
            Be part of our growing community of successful fantasy sports players. Follow us
            on social media and join our Telegram channel for exclusive tips, updates, and
            discussions.
          </p>
          <div className="alert alert-info mb-0">
            <strong>Note:</strong> We are committed to responsible gaming. Please play within
            your limits and follow all applicable laws and regulations.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
