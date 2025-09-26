import React from "react";
import { FaFacebookF, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import AnimatedWrapper from "./AnimatedWrapper";

export default function Contact() {
  const contactInfo = {
    address: "123 Main Street, Springfield, USA",
    phone: "+1 (555) 123-4567",
    email: "contact@example.com",
    facebook: "https://www.facebook.com/yourprofile",
    instagram: "https://www.instagram.com/yourprofile",
  };

  return (
    <section
      id="contact"
      className="py-12 px-6 bg-gradient-to-br from-white to-gray-100"
      style={{ fontFamily: "'Poppins', sans-serif" }} // Apply font here
    >
      <div className="max-w-4xl mx-auto">
        <AnimatedWrapper delay={0.1}>
          <h2 className="text-4xl font-semibold text-center mb-6 text-gray-800 tracking-wide">
            Get in Touch
          </h2>
          <p className="text-center text-gray-600 mb-10 text-lg leading-relaxed">
            Feel free to reach out via any of the following methods:
          </p>
        </AnimatedWrapper>

        {/* Two Column Layout without card */}
        <AnimatedWrapper delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-700">
            {/* Left Column: Contact Info */}
            <div className="space-y-6">
              <p className="flex items-center space-x-3 text-lg">
                <FaMapMarkerAlt className="text-blue-600 text-xl flex-shrink-0" />
                <span>{contactInfo.address}</span>
              </p>
              <p className="flex items-center space-x-3 text-lg">
                <FaPhone className="text-blue-600 text-xl flex-shrink-0" />
                <a href={`tel:${contactInfo.phone}`} className="hover:underline">
                  {contactInfo.phone}
                </a>
              </p>
              <p className="flex items-center space-x-3 text-lg">
                <FaEnvelope className="text-blue-600 text-xl flex-shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:underline">
                  {contactInfo.email}
                </a>
              </p>
            </div>

            {/* Right Column: Social Icons */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <p className="text-lg font-semibold mb-2 tracking-wide">Follow Us</p>
              <div className="flex space-x-6 text-gray-600 text-2xl">
                <a
                  href={contactInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="hover:text-blue-600 transition-colors"
                >
                  <FaFacebookF />
                </a>
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-pink-500 transition-colors"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
