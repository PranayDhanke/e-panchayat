import DashahboardSkeleton from "@/components/Skeletons/DashahboardSkeleton";
import { database } from "@/database/firebase";
import { get, onValue, ref, update } from "firebase/database";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BiCross } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { MdCancel, MdClose, MdOutlineDownloadDone } from "react-icons/md";
import { toast } from "react-toastify";

const AdminDashboard = () => {
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
  useEffect(() => {
    const applicantsRef = ref(database, "UserAppliedSchemes");
    onValue(applicantsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allApplicants = Array();
        Object.keys(data).forEach((scheme) => {
          const schemeApplicants = data[scheme];
          Object.keys(schemeApplicants).forEach((userid) => {
            allApplicants.push(schemeApplicants[userid]);
          });
        });
        setApplicants(allApplicants);
        setloading(false);
      } else {
        setApplicants([]);
        setloading(false);
      }
    });
  }, []);
  const openPanel = (applicant: any) => {
    setSelectedApplicant([applicant]);
    setpanel(!panel);
  };

  const setApproval = async (selectedApplicant: any) => {
    try {
      const applicantRef = ref(
        database,
        `UserAppliedSchemes/${selectedApplicant.scheme}/${selectedApplicant.userid}`
      );
      await update(applicantRef, {
        isApproved: true,
        isRejected: false,
      });
      setpanel(true);
    } catch (error) {
      toast.error("Error updating approval status:");
    }
  };

  const setReject = async (selectedApplicant: any) => {
    try {
      const applicantRef = ref(
        database,
        `UserAppliedSchemes/${selectedApplicant.scheme}/${selectedApplicant.userid}`
      );
      await update(applicantRef, {
        isApproved: false,
        isRejected: true,
      });
      setpanel(true);
    } catch (error) {
      toast.error("Error updating approval status:");
    }
  };

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      {loading ? (
        <DashahboardSkeleton />
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-3 p-2">
          {applicants.map((applicant) => (
            <div
              key={applicant.userid}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <div className=" relative w-12 h-12 mr-4">
                  <Image
                    src={applicant.profile}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-full"
                    alt={applicant.name}
                  ></Image>
                </div>
                <span className="text-xl font-semibold">{applicant.name}</span>
              </div>
              <div>
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
              <div>
                <button
                  onClick={() => openPanel(applicant)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View Form
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Panel Component */}
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
              <div
                key={applicant.userid}
              >
                <div
                  className="flex flex-col items-center mt-10"
                >
                  <div className="relative w-32 h-32">
                    <Image
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={applicant.profile || ""}
                      className="rounded-full"
                      alt=""
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
                  <h1 className="font-bold text-xl">View Uploaded Documents</h1>
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
                <div className="mt-10 flex gap-5 items-center">
                  <div
                    onClick={() => setApproval(applicant)}
                    className=" cursor-pointer flex items-center bg-green-600 gap-1 rounded-lg p-3 w-fit text-white "
                  >
                    <MdOutlineDownloadDone className="text-xl" />
                    <text>Approve</text>
                  </div>
                  <div
                    onClick={() => setReject(applicant)}
                    className=" cursor-pointer flex items-center bg-red-500 gap-1 rounded-lg p-3 w-fit text-white "
                  >
                    <MdCancel />
                    <text>Reject</text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
