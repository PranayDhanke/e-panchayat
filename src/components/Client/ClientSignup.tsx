"use client";

import { auth, firestore, storage } from "@/database/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Header from "../Home/Header";
import Link from "next/link";
import Image from "next/image";

const ClientSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [mobile, setMobile] = useState("");
  const [aadharnum, setaadharnum] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        alert("user already logged in ");
        router.push("/");
      }
    });
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (imageFile) {
        const storageRef = ref(storage, `profileImages/${user.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            alert("Upload is " + progress + "% done");
          },
          (error) => {
            alert("Upload failed" + error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await addDoc(collection(firestore, `Users`), {
              uid: user.uid,
              name: name,
              email: email,
              mobile: mobile,
              aadharnum: aadharnum,
              profileImageUrl: downloadURL,
            });
            alert("User registered and data saved");
            router.replace("/");
          }
        );
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="flex items-center justify-center p-6 ">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md "
        >
          <div className="flex justify-center mb-4 relative">
            <div className="relative w-32 h-32 border rounded-full">
              {imagePreview ? (
                <div className="relative w-32 h-32 object-cover">
                  <Image
                    src={imagePreview}
                    alt="Profile Image"
                    fill
                    className="rounded-full"
                  ></Image>
                </div>
              ) : (
                <span className="absolute pt-12 ml-3">Choose Image</span>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                <label
                  htmlFor="profileImage"
                  className="cursor-pointer text-white"
                >
                  <FaEdit size={24} />
                </label>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
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
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              type="tel"
              name="mobileNumber"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
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
              value={aadharnum}
              onChange={(e) => setaadharnum(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
            <div className="">
              <span className="text-sm">
                Already have Account?{" "}
                <Link className="text-blue-500" href={"/Client/sign-in"}>
                  Log-in
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientSignup;
