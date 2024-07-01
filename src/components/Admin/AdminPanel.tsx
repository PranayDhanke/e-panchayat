"use client";
import { useState } from "react";
import AdminPanelHeader from "./AdminPanel/AdminPanelHeader";
import AdminDashboard from "./AdminPanel/Dashboard";
import AddAdmin from "./AdminPanel/AddAdmin";
import AddStaff from "./AdminPanel/AddStaff";
import AdminServices from "./AdminPanel/AdminServices";
import AddAdminService from "./AdminPanel/AddAdminService";

const AdminPanel = () => {
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row my-3 shadow-md">
        <nav className="w-full md:w-1/4 bg-white shadow-md md:h-screen">
          <button
            className="md:hidden p-4 bg-blue-500 text-white w-full text-left"
            onClick={toggleMobileMenu}
          >
            Menu
          </button>
          <ul className={`space-y-4 p-4 ${isMobileMenuOpen ? "block" : "hidden md:block"}`}>
            <li
              className={`cursor-pointer p-2 ${
                selectedTab === "Dashboard"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => {
                setSelectedTab("Dashboard");
                setIsMobileMenuOpen(false);
              }}
            >
              Dashboard
            </li>
            <li
              className={`cursor-pointer p-2 ${
                selectedTab === "Add Admins"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => {
                setSelectedTab("Add Admins");
                setIsMobileMenuOpen(false);
              }}
            >
              Add Admins
            </li>
            <li
              className={`cursor-pointer p-2 ${
                selectedTab === "Add Staff"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => {
                setSelectedTab("Add Staff");
                setIsMobileMenuOpen(false);
              }}
            >
              Add Staff
            </li>
            <li
              className={`cursor-pointer p-2 ${
                selectedTab === "Service"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => {
                setSelectedTab("Service");
                setIsMobileMenuOpen(false);
              }}
            >
              Service
            </li>
            <li
              className={`cursor-pointer p-2 ${
                selectedTab === "Add Services"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => {
                setSelectedTab("Add Services");
                setIsMobileMenuOpen(false);
              }}
            >
              Add Services
            </li>
          </ul>
        </nav>
        <div className="flex-grow p-4">
          {selectedTab === "Dashboard" && <AdminDashboard />}
          {selectedTab === "Add Admins" && <AddAdmin />}
          {selectedTab === "Add Staff" && <AddStaff />}
          {selectedTab === "Service" && <AdminServices />}
          {selectedTab === "Add Services" && <AddAdminService />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
