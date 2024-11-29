import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaWhatsapp, FaTelegram } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container">
      <h2 className="mb-4">Contact Us</h2>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Get in Touch</h5>
              <div className="mb-4">
                <FaEnvelope className="me-2" />
                <strong>Email:</strong>
                <p className="ms-4 mb-2">support@teamgeneration.in</p>
              </div>
              <div className="mb-4">
                <FaPhone className="me-2" />
                <strong>Phone:</strong>
                <p className="ms-4 mb-2">+91-XXXXXXXXXX</p>
              </div>
              <div className="mb-4">
                <FaWhatsapp className="me-2" />
                <strong>WhatsApp:</strong>
                <p className="ms-4 mb-2">+91-XXXXXXXXXX</p>
              </div>
              <div className="mb-4">
                <FaTelegram className="me-2" />
                <strong>Telegram:</strong>
                <p className="ms-4 mb-2">@teamgeneration</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Send us a Message</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Working Hours</h5>
          <p className="mb-2">Monday - Saturday: 9:00 AM - 6:00 PM (IST)</p>
          <p className="mb-0">Sunday: Closed</p>
          <small className="text-muted">
            We typically respond to all inquiries within 24 hours during business days.
          </small>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
