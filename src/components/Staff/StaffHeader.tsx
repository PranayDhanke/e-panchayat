import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import logo from "@/images/logo.svg"

const StaffHeader = () => {
  return (
    <div>
      <header className="bg-white shadow-md p-4 px-10 flex items-center justify-between ">
        <div className="flex items-center gap-10">
          <Link href={"/"} className="flex items-center gap-2">
            <Image src={logo} className="w-5" alt="logo"></Image>
            <h1 className="font-extrabold text-xl text-darkblue">E-GRAM</h1>
          </Link>
          <h1 className="text-xl font-bold text-gray-700">Staff Panel</h1>
        </div>
        <div className="flex items-center gap-5">
          <p className="text-gray-700 mr-4">Welcome, {"Staff Name"}</p>
          <Link
            href={"/"}
            className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded cursor-pointer"
          >
            <span>Sign Out</span>
            <FiLogOut className="text-xl" />
          </Link>
        </div>
      </header>
    </div>
  )
}

export default StaffHeader