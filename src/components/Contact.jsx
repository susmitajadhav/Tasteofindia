import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_xzljbuu',  // Your EmailJS service ID
      'template_o4fpdcd',  // Your EmailJS template ID
      form.current,
      'mpaGaNvRfp0sKHW5P'  // Your EmailJS user ID
    )
    .then((result) => {
        console.log('Message sent:', result.text);
        setStatusMessage("Message sent successfully!");
    })
    .catch((error) => {
        console.log('Failed to send message:', error.text);
        setStatusMessage("Failed to send message. Please try again later.");
    });

    e.target.reset(); // Clear form after submission
  };

  return (
    <div className="contact-page">
      <div className="map-container">
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.1043418081495!2d74.62342127419751!3d16.870732217485305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc123c1dc153abf%3A0x614d9283e7c55d34!2sEnnova%20technology!5e0!3m2!1sen!2sin!4v1730276120205!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="contact-content">
        <div className="user-profile-form">
          <h2>Your Profile</h2>
          <form ref={form} onSubmit={sendEmail}>
            <label>
              Full Name
              <input type="text" name="fullName" placeholder="Your Full Name" required />
            </label>
            <label>
              Email Address
              <input type="email" name="email" placeholder="Your Email" required />
            </label>
            <label>
              Contact Number
              <input type="tel" name="contactNumber" placeholder="Your Contact Number" required />
            </label>
            <label>
              Specialization
              <input type="text" name="specialization" placeholder="Your Specialization" />
            </label>
            <div className="form-buttons">
              <button type="reset">Reset</button>
              <button type="submit">Submit</button>
            </div>
          </form>
          {/* Display success/error message */}
          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>

        <div className="contact-info">
          <h2>Contact Information</h2>
          <p><strong>Working Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM</p>
          <p><strong>Call Us Now:</strong> +1234567890</p>
          <p><strong>Email Us:</strong> tasteofindia@gmail.com</p>
          <p><strong>Address:</strong> F, 45, MIDC Kupwad, DattaNagar, Sangli, Maharashtra 416406</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;