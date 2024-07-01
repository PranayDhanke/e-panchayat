"use client";
import { auth, database } from "@/database/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { get, ref } from "firebase/database";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminLogin() {

    const router = useRouter();

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const loginAdmin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      onAuthStateChanged(auth , (user)=>{
        if (user) {
          toast.warning("Logout first")
          router.push("/")
        }else{
          get(ref(database , "Admin")).then((Response)=>{
            if (Response.exists()) {
              if (Response.child(username).exists()) {
                const data = Response.child(username).exportVal();
                if (username == data.username && password == data.password) {
                  toast.success("Admin Logged in");
                  router.push(`/Admin/Home/${username}`)
                }else{
                  toast.error("Incorrect Username or password");
                }
              }
            }
          })
        }
      })
    } catch (error) {
      toast.error("Error")
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Admin Login
        </h2>
        <form onSubmit={loginAdmin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your Username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e)=>setpassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
