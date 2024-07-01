"use client"
import React, { useState } from 'react'
import StaffHeader from './StaffHeader'
import StaffDashboard from './StaffDashboard';
import StaffServices from './StaffServices';

const StaffPanel = () => {
    const [selectedTab, setSelectedTab] = useState("Dashboard");
  return (
    <div>
      <div className="flex flex-col md:flex-row min-h-screen my-3 shadow-md bg-gray-100">
        <nav className="w-full md:w-1/4 bg-white shadow-md">
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
                selectedTab === "Services"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => setSelectedTab("Services")}
            >
              Services
            </li>
          </ul>
        </nav>
        <div className="flex-grow p-4">
          {selectedTab === "Dashboard" && <div><StaffDashboard /></div>}
          {selectedTab === "Services" && <div><StaffServices /></div>}
        </div>
      </div>
    </div>
  )
}

export default StaffPanel
