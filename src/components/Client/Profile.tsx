"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { auth, firestore } from "@/database/firebase"; // Ensure correct import paths
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Header from "../Home/Header";
import Image from "next/image";

const Profile = () => {
  const [user, setUser] = useState({
    profileImage: "", // replace with the actual path to the profile image
    name: "",
    email: "",
    mobileNumber: "",
    aadharNumber: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = query(
          collection(firestore, "Users"),
          where("uid", "==", currentUser.uid)
        );

        const userSnap = await getDocs(userDoc);

        userSnap.forEach((doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setUser({
              name: userData.name,
              email: userData.email,
              mobileNumber: userData.mobile,
              aadharNumber: userData.aadharnum,
              profileImage: userData.profileImageUrl,
            });
            if (userData.profileImageUrl) {
              setImagePreview(userData.profileImageUrl);
            }
          }
        });
      } else {
        router.replace("/Client/sign-in"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div>
      <Header />
      <div className="min-h-screen py-10 bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <form>
            <div className="flex justify-center mb-4 relative">
              <div className="relative w-32 h-32">
                {imagePreview ? (
                  <div className="relative w-32 h-32 object-cover">
                    <Image
                      fill
                      src={imagePreview}
                      alt="Profile Image"
                      className="rounded-full "
                    ></Image>
                  </div>
                ) : (
                  <span className="rounded-full text-center p-5 w-32 mt-14 h-32 object-cover">No Image</span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={user.name}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={user.email}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="mobileNumber"
              >
                Mobile Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="mobileNumber"
                type="text"
                name="mobileNumber"
                value={user.mobileNumber}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="aadharNumber"
              >
                Aadhar Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="aadharNumber"
                type="text"
                name="aadharNumber"
                value={user.aadharNumber}
                readOnly
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
