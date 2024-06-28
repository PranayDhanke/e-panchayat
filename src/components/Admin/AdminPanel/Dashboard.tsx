import DashahboardSkeleton from "@/components/Skeletons/DashahboardSkeleton";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BiCross } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { MdCancel, MdClose, MdOutlineDownloadDone } from "react-icons/md";

const AdminDashboard = () => {
  const [applicants, setApplicants] = useState([
    {
      id: "",
      image: "",
      applicant_name: "",
      scheme_name: "",
      date_applied: "",
      email: "",
      mobile_number: "",
      aadhar_number: "",
      addhar_card: "",
      proof: "",
      isapproved: false,
      isrejeted: false,
    },
  ]);
  const [selectedApplicant, setSelectedApplicant] = useState([
    {
      id: "",
      image: "",
      applicant_name: "",
      scheme_name: "",
      date_applied: "",
      email: "",
      mobile_number: "",
      aadhar_number: "",
      addhar_card: "",
      proof: "",
      isapproved: false,
      isrejeted: false,
    },
  ]);
  const [panel, setpanel] = useState(true);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetch("/applicants.json")
      .then((response) => response.json())
      .then((data) => {
        setApplicants(data);
        setloading(false);
      });
  }, []);

  const openPanel = (applicant: any) => {
    setSelectedApplicant([applicant]);
    setpanel(!panel);
  };

  const setApproval = (selectedApplicant: any) => {
    setApplicants((prevApplicants) =>
      prevApplicants.map((applicant) =>
        applicant.id === selectedApplicant.id
          ? { ...applicant, isapproved: true, isrejeted: false }
          : applicant
      )
    );
    setpanel(!panel);
  };

  const setReject = (selectedApplicant: any) => {
    setApplicants((prevApplicants) =>
      prevApplicants.map((applicant) =>
        applicant.id === selectedApplicant.id
          ? { ...applicant, isrejeted: true, isapproved: false }
          : applicant
      )
    );
    setpanel(!panel);
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
              key={applicant.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <img
                  src={applicant.image}
                  className="w-12 h-12 rounded-full mr-4"
                  alt={applicant.applicant_name}
                />
                <span className="text-xl font-semibold">
                  {applicant.applicant_name}
                </span>
              </div>
              <div>
                {applicant.isapproved ? (
                  <span className="font-bold text-green-500">Approved</span>
                ) : (
                  <div>
                    {applicant.isrejeted ? (
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
              <div>
                <div className="flex flex-col items-center mt-10">
                  <img
                    src={applicant.image}
                    className="w-32 rounded-full"
                    alt=""
                  />
                </div>
                <hr className="mt-5" />
                <div className="mt-5 grid grid-cols-2 gap-3 w-fit">
                  <h1 className="font-bold text-xl">Applicant Detail : </h1>
                  <br />
                  <hr />
                  <br />
                  <span className="font-bold text-lg">Service Name :</span>
                  <span>{applicant.scheme_name}</span>
                  <span className="font-bold text-lg">Name : </span>
                  <span>{applicant.applicant_name}</span>
                  <span className="font-bold text-lg">Email : </span>
                  <span>{applicant.email}</span>
                  <span className="font-bold text-lg">Mobile Number :</span>
                  <span>{applicant.mobile_number}</span>
                  <span className="font-bold text-lg">Aadhar Number :</span>
                  <span>{applicant.aadhar_number}</span>
                  <span className="font-bold text-lg">Date Applied :</span>
                  <span>{applicant.date_applied}</span>
                  <hr /> <br />
                  <h1 className="font-bold text-xl">View Uploaded Documents</h1>
                  <br />
                  <hr />
                  <br />
                  <span className="font-bold text-lg">Aadhar Card</span>
                  <Link
                    href={applicant.addhar_card}
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
