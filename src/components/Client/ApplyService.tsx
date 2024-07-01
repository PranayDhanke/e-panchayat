"use client";
import { FormEvent, useEffect, useState } from "react";
import Header from "../Home/Header";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database, firestore, storage } from "@/database/firebase";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ref as dbRef, set } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import Image from "next/image";
import { toast } from "react-toastify";

const ApplyService = ({ scheme_name }: { scheme_name: any }) => {
  const scheme = decodeURI(scheme_name);
  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [aadharnum, setAadharnum] = useState("");
  const [aadharcard, setAadharcard] = useState<File | null>(null);
  const [proof, setProof] = useState<File | null>(null);
  const [userid, setUserid] = useState("");
  const [applyDate, setApplyDate] = useState("");

  const router = useRouter();

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAadharcard(file);
    }
  };

  const handleProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProof(file);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserid(user.uid);
        const userDoc = query(
          collection(firestore, "Users"),
          where("uid", "==", user.uid)
        );

        const userSnap = await getDocs(userDoc);

        userSnap.forEach((doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setName(userData.name);
            setEmail(userData.email);
            setMobile(userData.mobile);
            setAadharnum(userData.aadharnum);
            setProfile(userData.profileImageUrl);
          }
        });
      } else {
        router.replace("/Client/sign-in");
      }
    });
  }, [router]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!aadharcard || !proof) {
      toast.warning("Please upload both Aadhaar card and proof")
      return;
    }

    try {
      const aadharcardRef = storageRef(
        storage,
        `UserAppliedSchemes/${scheme}/${userid}_aadhar`
      );
      const proofRef = storageRef(
        storage,
        `UserAppliedSchemes/${scheme}/${userid}_proof`
      );

      toast.info("Wait Files are uploading")

      await uploadBytes(aadharcardRef, aadharcard);
      await uploadBytes(proofRef, proof)


      const aadharcardURL = await getDownloadURL(aadharcardRef);
      const proofURL = await getDownloadURL(proofRef);

      await set(dbRef(database, `UserAppliedSchemes/${scheme}/${userid}`), {
        name: name,
        profile: profile,
        userid: userid,
        email: email,
        scheme: scheme,
        mobile: mobile,
        aadharcard: aadharcardURL,
        proof: proofURL,
        isApproved: false,
        isRejected: false,
        applyDate: applyDate,
        aadharnum: aadharnum,
      });

      toast.success("Application added successfully")
    } catch (error) {
      toast.error("Error while uploading data")
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen py-20 bg-gray-100 flex items-center justify-center">
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32 object-cover">
              <Image
                src={profile}
                alt="Profile Image"
                fill
                className="rounded-full"
              ></Image>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input className="submitinput" type="text" value={name} readOnly />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="scheme"
            >
              Scheme Name
            </label>
            <input
              className="submitinput"
              id="scheme"
              type="text"
              value={scheme}
              name="scheme"
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
              className="submitinput"
              type="email"
              value={email}
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
              className="submitinput"
              id="mobileNumber"
              type="tel"
              name="mobileNumber"
              value={mobile}
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
              className="submitinput"
              id="aadharNumber"
              type="text"
              name="aadharNumber"
              value={aadharnum}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dateapplied"
            >
              Date Applied
            </label>
            <input
              className="submitinput"
              id="dateapplied"
              type="date"
              name="dateapplied"
              value={applyDate}
              onChange={(e) => setApplyDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="aadharCard"
            >
              Aadhar Card
            </label>
            <input
              className="submitinput"
              type="file"
              required
              accept="image/*"
              onChange={handleCardChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="proof"
            >
              Residence Proof
            </label>
            <input
              className="submitinput"
              type="file"
              required
              accept="image/*"
              onChange={handleProofChange}
            />
          </div>
          <button
            type="submit"
            className="p-2 border bg-darkblue text-white font-bold px-3 rounded-lg shadow-sm"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyService;
