"use client";
import { useEffect, useState } from "react";
import Header from "../Home/Header";
import { MdCancel, MdClose, MdOutlineDownloadDone } from "react-icons/md";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "@/database/firebase";
import { onValue, ref } from "firebase/database";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MyAppliedServices = () => {
  const [applicants, setApplicants] = useState([
    {
      name: "",
      profile: "",
      scheme: "",
      userid: "",
      email: "",
      mobile: "",
      aadharnum: "",
      isApproved: false,
      isRejected: false,
      applyDate: "",
      aadharcard: "",
      proof: "",
    },
  ]);
  const [selectedApplicant, setSelectedApplicant] = useState([
    {
      name: "",
      profile: "",
      scheme: "",
      userid: "",
      email: "",
      mobile: "",
      aadharnum: "",
      isApproved: false,
      isRejected: false,
      applyDate: "",
      aadharcard: "",
      proof: "",
    },
  ]);
  const [panel, setpanel] = useState(true);
  const [loading, setloading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const applicantsRef = ref(database, "UserAppliedSchemes");
        onValue(applicantsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const allApplicants = Array();
            Object.keys(data).forEach((scheme) => {
              const schemeApplicants = data[scheme];
              Object.keys(schemeApplicants).forEach((userid) => {
                if (userid == user.uid) {
                  allApplicants.push(schemeApplicants[userid]);
                  setApplicants(allApplicants);
                  setloading(false);
                }
              });
            });
          }
        });
      } else {
        router.replace("/Client/sign-in");
      }
    });
  }, [router]);

  const openPanel = (applicant: any) => {
    setSelectedApplicant([applicant]);
    setpanel(!panel);
  };

  return (
    <div>
      <Header />
      <div className="p-10 ">
        <h1 className="text-2xl underline underline-offset-8 font-bold">
          My Applied Services
        </h1>
        <div className="grid grid-cols-3 place-items-center gap-5 mt-10 ">
          {applicants.map((applicant) => (
            <div
              key={applicant.userid}
              className="bg-white p-4 rounded-lg shadow-sm h-52 w-96"
            >
              <div>
                <h1 className="font-bold text-lg mb-5">{applicant.scheme}</h1>
              </div>
              <div
                key={applicant.userid}
                className="flex gap-20 items-center justify-between "
              >
                <div className="flex items-center">
                  <div className=" relative w-12 h-12 mr-4">
                    <Image
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={applicant.profile || ""}
                      className="rounded-full"
                      alt={applicant.name || ""}
                    ></Image>
                  </div>
                  <span className="text-xl font-semibold">
                    {applicant.name}
                  </span>
                </div>
                <div onClick={() => openPanel(applicant)}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    View Form
                  </button>
                </div>
              </div>
              <div className="mt-5">
                {applicant.isApproved ? (
                  <span className="font-bold text-green-500">Approved</span>
                ) : (
                  <div>
                    {applicant.isRejected ? (
                      <span className="font-bold text-red-500">Rejected</span>
                    ) : (
                      <span className="font-bold ">Not viwed</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {panel ? (
          ""
        ) : (
          <div className="fixed  inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 w-1/2 h-screen overflow-y-scroll rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{"Application"}</h2>
                <MdClose
                  onClick={() => setpanel(!panel)}
                  className="text-gray-500 text-2xl cursor-pointer hover:text-gray-700 "
                />
              </div>
              {selectedApplicant.map((applicant) => (
                <div key={applicant.userid}>
                  <div className="flex flex-col items-center mt-10">
                    <div className="relative w-32 h-32">
                      <Image
                        src={applicant.profile}
                        className=" rounded-full"
                        alt=""
                        fill
                      ></Image>
                    </div>
                  </div>
                  <hr className="mt-5" />
                  <div className="mt-5 grid grid-cols-2 gap-3 w-fit">
                    <h1 className="font-bold text-xl">Applicant Detail : </h1>
                    <br />
                    <hr />
                    <br />
                    <span className="font-bold text-lg">Service Name :</span>
                    <span>{applicant.scheme}</span>
                    <span className="font-bold text-lg">Name : </span>
                    <span>{applicant.name}</span>
                    <span className="font-bold text-lg">Email : </span>
                    <span>{applicant.email}</span>
                    <span className="font-bold text-lg">Mobile Number :</span>
                    <span>{applicant.mobile}</span>
                    <span className="font-bold text-lg">Aadhar Number :</span>
                    <span>{applicant.aadharnum}</span>
                    <span className="font-bold text-lg">Date Applied :</span>
                    <span>{applicant.applyDate}</span>
                    <hr /> <br />
                    <h1 className="font-bold text-xl">
                      View Uploaded Documents
                    </h1>
                    <br />
                    <hr />
                    <br />
                    <span className="font-bold text-lg">Aadhar Card</span>
                    <Link
                      href={applicant.aadharcard}
                      target="_blank"
                      className="flex items-center gap-2 rounded-md cursor-pointer bg-blue-600 w-fit p-2 text-white"
                    >
                      <FaEye />
                      <span>view</span>
                    </Link>
                    <span className="font-bold text-lg">Villager Proof</span>
                    <Link
                      href={applicant.proof}
                      target="_blank"
                      className="flex items-center gap-2 rounded-md cursor-pointer bg-blue-600 w-fit p-2 text-white"
                    >
                      <FaEye />
                      <span>View</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppliedServices;
