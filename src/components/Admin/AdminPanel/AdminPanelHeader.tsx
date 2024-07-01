"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/images/logo.svg";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";

const AdminPanelHeader = ({ username }: { username: string }) => {
  const router = useRouter();

  const adminLogout = async () => {
    router.replace("/");
  };

  return (
    <header className="bg-white shadow-md p-4 md:px-10 flex items-center justify-between">
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} className="w-5 h-5" alt="logo" />
          <h1 className=" text-m font-extrabold md:text-xl text-darkblue">E-GRAM</h1>
        </Link>
        <h1 className="text-xl font-bold hidden md:block text-gray-700">Admin Panel</h1>
      </div>
      <div className="flex items-center gap-5">
        <p className="text-gray-700 mr-4">Welcome, {username}</p>
        <button
          onClick={adminLogout}
          className="flex items-center gap-2 bg-red-500 text-white p-2 md:py-2 md:px-4 rounded cursor-pointer hover:bg-red-600"
        >
          <span className="hidden md:block">Sign Out</span>
          <FiLogOut className="text-xl" />
        </button>
      </div>
    </header>
  );
};

export default AdminPanelHeader;
