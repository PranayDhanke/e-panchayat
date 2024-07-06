"use client";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { useState } from "react";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <footer id="Contact" className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col items-center">
        <div className="text-center mb-4">
          <p>Connecting Rural Hearts to Digital Smarts</p>
        </div>
        <div className="flex space-x-6 mb-6">
          <a
            href="https://twitter.com/pranaydhanke33?t=hrHjKL9cuivSUcV424V8ew&s=08"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-2xl hover:text-blue-500" />
          </a>
          <a
            href="https://www.instagram.com/pranaydhanke33/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-2xl hover:text-pink-500" />
          </a>
          <a
            href="https://in.linkedin.com/in/pranay-dhanke-176a66263"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-2xl hover:text-blue-700" />
          </a>
          <a
            href="https://github.com/PranayDhanke"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-2xl hover:text-gray-500" />
          </a>
        </div>
        <button
          onClick={handleShare}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {copied ? "Link Copied!" : "Share this Page"}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
