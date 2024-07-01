import { database } from "@/database/firebase";
import { ref, set } from "firebase/database";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const AddStaff = () => {
    
  const [username , setusername] = useState("")
  const [password , setpassword] = useState("")
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      set(ref(database , `Staff/${username}`) , {
        username : username,
        password : password
      }).then(()=>{
        toast.success("Staff member added successfully")
      }).catch(()=>{
        toast.error("Error while adding staff")
      })
    } catch (error) {
      toast.error("Error")
    }
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Add New Staff</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e)=>setusername(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
        >
          Add Admin
        </button>
      </form>
    </div>
  );
};

export default AddStaff;
