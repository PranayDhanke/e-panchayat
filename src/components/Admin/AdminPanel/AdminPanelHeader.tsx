"use client"
import Image from "next/image";
import Link from "next/link";
import logo from "@/images/logo.svg";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";

const AdminPanelHeader = ({username} : {username:string}) => {
  const router = useRouter();

  const adminLogout = async () => {
    router.replace("/")
  }

  return (
    <div>
      <header className="bg-white shadow-md p-4 px-10 flex items-center justify-between ">
        <div className="flex items-center gap-10">
          <Link href={"/"} className="flex items-center gap-2">
            <Image src={logo} className="w-5" alt="logo"></Image>
            <h1 className="font-extrabold text-xl text-darkblue">E-GRAM</h1>
          </Link>
          <h1 className="text-xl font-bold text-gray-700">Admin Panel</h1>
        </div>
        <div className="flex items-center gap-5">
          <p className="text-gray-700 mr-4">Welcome, {username}</p>
          <div
            onClick={()=>adminLogout()}
            className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded cursor-pointer"
          >
            <span>Sign Out</span>
            <FiLogOut className="text-xl" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default AdminPanelHeader;
