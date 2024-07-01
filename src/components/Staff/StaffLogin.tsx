"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { get, ref } from "firebase/database";
import { auth, database } from "@/database/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

export default function StaffLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          alert("Log out first");
        } else {
          get(ref(database, "Admin")).then((Response) => {
            if (Response.exists()) {
              if (Response.child(username).exists()) {
                const data = Response.child(username).exportVal();
                if (username == data.username && password == data.password) {
                  toast.success("Staff logged in");
                  router.replace(`/Staff/Home/${username}`);
                } else {
                  toast.error("Incorrect Username or password");
                }
              }
            }
          });
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Staff Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
