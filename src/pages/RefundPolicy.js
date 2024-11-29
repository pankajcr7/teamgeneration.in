import React from 'react';
import { FaMoneyBillWave, FaExclamationTriangle, FaClock, FaCheckCircle } from 'react-icons/fa';

const RefundPolicy = () => {
  return (
    <div className="container">
      <h2 className="mb-4">Refund Policy</h2>

      <div className="alert alert-info">
        <FaMoneyBillWave className="me-2" />
        We strive to provide the best service to our users. Please read our refund policy carefully.
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">
            <FaExclamationTriangle className="me-2" />
            Important Information
          </h5>
        </div>
        <div className="card-body">
          <p>
            Our refund policy is designed to be fair to all users while maintaining the quality
            of our service. Please note that all refund requests are subject to review and
            approval by our team.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">
                <FaClock className="me-2" />
                Refund Timeline
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Request within 24 hours of purchase</li>
                <li className="list-group-item">Processing time: 3-5 business days</li>
                <li className="list-group-item">Refund to original payment method</li>
                <li className="list-group-item">Bank processing time: 5-7 business days</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">
                <FaCheckCircle className="me-2" />
                Eligible for Refund
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Service not accessible after payment</li>
                <li className="list-group-item">Technical issues preventing usage</li>
                <li className="list-group-item">Duplicate payment</li>
                <li className="list-group-item">Service not as described</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">How to Request a Refund</h5>
        </div>
        <div className="card-body">
          <ol>
            <li className="mb-2">Contact our support team through the contact form</li>
            <li className="mb-2">Provide your order/transaction ID</li>
            <li className="mb-2">Explain the reason for the refund request</li>
            <li className="mb-2">Include any relevant screenshots or information</li>
          </ol>
        </div>
      </div>

      <div className="alert alert-warning">
        <strong>Note:</strong> Refunds may be denied if:
        <ul className="mb-0 mt-2">
          <li>The service has been used</li>
          <li>The refund request is made after 24 hours</li>
          <li>The reason provided is not valid</li>
          <li>The user has violated our terms of service</li>
        </ul>
      </div>

      <div className="card">
        <div className="card-body">
          <h5>Contact Support</h5>
          <p>
            If you have any questions about our refund policy or need to request a refund,
            please contact our support team:
          </p>
          <ul>
            <li>Email: support@teamgeneration.in</li>
            <li>Phone: +91-XXXXXXXXXX</li>
            <li>Working Hours: 9 AM - 6 PM (IST)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
