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

  return (
    <div>
      <AdminPanelHeader />
      <div className="flex min-h-screen my-3 shadow-md bg-gray-100 ">
        <nav className="w-1/4 bg-white shadow-md">
          <ul className="space-y-4 p-4">
          <li
              className={`cursor-pointer p-2 ${
                selectedTab === "Dashboard"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => setSelectedTab("Dashboard")}
            >
              Dashboard
            </li>
            <li
              className={`cursor-pointer p-2 ${
                selectedTab === "Add Admins"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => setSelectedTab("Add Admins")}
            >
              Add Admins
            </li>
            <li
              className={`cursor-pointer p-2 ${
                selectedTab === "Add Staff"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => setSelectedTab("Add Staff")}
            >
              Add Staff
            </li>
            <li
              className={`cursor-pointer p-2 ${
                selectedTab === "Service"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => setSelectedTab("Service")}
            >
              Service
            </li>
            <li
              className={`cursor-pointer p-2 ${
                selectedTab === "Add Services"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => setSelectedTab("Add Services")}
            >
              Add Services
            </li>
          </ul>
        </nav>
        <div className="flex-grow p-4">
          {selectedTab === "Dashboard" && <div><AdminDashboard /></div>}
          {selectedTab === "Add Admins" && <div><AddAdmin /></div>}
          {selectedTab === "Add Staff" && <div><AddStaff /></div>}
          {selectedTab === "Service" && <div><AdminServices /></div>}
          {selectedTab === "Add Services" && <div><AddAdminService /></div>}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
