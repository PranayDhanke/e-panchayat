"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaHome, FaList } from "react-icons/fa";
import { FiMenu, FiUserPlus } from "react-icons/fi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { MdClose, MdDownloadDone } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import logo from "@/images/logo.svg";
import Image from "next/image";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/database/firebase";
import { LuLogOut } from "react-icons/lu";
import { toast } from "react-toastify";

const Header = () => {
  const [panel, setpanel] = useState(false);

  const [user, setCurrentUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const signOutUser = () => {
    signOut(auth).then(()=>{
      toast.success("Logged Out")
      setCurrentUser(!user)
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(true);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [user]);

  return (
    <div className="relative">
      <div className="flex justify-between p-4 bg-white items-center mx-auto shadow-lg lg:px-10">
        <div className="flex gap-10 items-center">
          <Link href={"/"} className="flex items-center gap-2">
            <Image className="w-5" src={logo} alt="logo"></Image>
            <h1 className="font-extrabold text-xl text-darkblue">E-GRAM</h1>
          </Link>
          <h1 className="font-bold hidden lg:flex text-lg text-purple underline underline-offset-8">
            Lets Make India Digital !
          </h1>
        </div>
        <div className="flex items-center gap-10">
          {user ? (
            <div
              onClick={() => signOutUser()}
              className="gap-2 flex items-center py-2 cursor-pointer px-4 bg-red-500 text-white font-bold rounded-lg"
            >
              <span>Logout</span>
              <LuLogOut className="text-xl" />
            </div>
          ) : (
            <Link
              href={"/Client/sign-in"}
              className="py-2 cursor-pointer px-4 bg-bluedarkish text-white font-bold rounded-lg"
            >
              Login
            </Link>
          )}
          {panel ? (
            <MdClose
              className="text-xl font-bold cursor-pointer "
              onClick={() => setpanel(false)}
            />
          ) : (
            <FiMenu
              className="text-xl font-bold cursor-pointer "
              onClick={() => setpanel(!panel)}
            />
          )}
        </div>
      </div>
      <div
        className={`fixed   top-0 left-0 h-screen max-w-72 bg-white p-5 shadow-xl transform ${
          panel ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 w-full`}
      >
        <h1 className="text-2xl font-bold my-5">Menu</h1>
        <hr className="w-full" />
        <nav className="list-none flex flex-col">
          <Link href={"/"} onClick={() => setpanel(!panel)} className="listdivstyle">
            <FaHome />
            <li className="listyle">Home</li>
          </Link>
          <Link
            href={"/#Schemes"}
            onClick={() => {
              setpanel(!panel);
            }}
            scroll={true}
            className="listdivstyle"
          >
            <FaList />
            <li className="listyle">Schemes</li>
          </Link>
          <Link
            href={"/#Contact"}
            onClick={() => setpanel(!panel)}
            className="listdivstyle"
          >
            <IoIosHelpCircleOutline />
            <li className="listyle">Contact US</li>
          </Link>
          <Link href={"/Client/Profile"} className="listdivstyle">
            <CgProfile />
            <li className="listyle">Profile</li>
          </Link>
          <Link
            href={"/Client/Services/Applied-services"}
            className="listdivstyle"
          >
            <MdDownloadDone />
            <li className="listyle">My Applied Services</li>
          </Link>
          <Link href={"/Client/sign-up"} className="listdivstyle">
            <FiUserPlus />
            <li className="listyle">Create new Account</li>
          </Link>
          <hr />
          <Link href={"/Admin/sign-in"} className="listdivstyle">
            <RiAdminFill />
            <li className="listyle">Login as Admin</li>
          </Link>
          <Link href={"/Staff/sign-in"} className="listdivstyle">
            <IoPeopleSharp />
            <li className="listyle">Login as Staff</li>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
