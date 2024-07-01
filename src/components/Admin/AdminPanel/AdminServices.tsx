"use client";
import SchemeSkeleton from "@/components/Skeletons/SchemeSkeleton";
import { database } from "@/database/firebase";
import { child, get, ref, remove } from "firebase/database";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import EditAdminService from "./EditAdminService"; // Import the edit form component
import { CgClose } from "react-icons/cg";

const AdminServices = () => {
  const [GrampanchayatSchemes, setGrampanchayatSchemes] = useState([
    { id: "" },
    {
      id: "",
      imageUrl: "",
      serviceName: "",
      description: "",
      startDate: "",
      endDate: "",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [editService, setEditService] = useState(null); // State to track the service being edited
  const router = useRouter();

  useEffect(() => {
    const refence = ref(database, "Services");
    get(refence)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const schemeArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...(data as Object),
            })
          );
          setGrampanchayatSchemes(schemeArray);
        }
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [editService]); // Refresh when editService changes

  const editScheme = (serviceName:any) => {
    setEditService(serviceName); // Set the service to be edited
  };

  const deleteScheme = (serviceName:any) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete scheme: ${serviceName}?`
    );
    if (confirmDelete) {
      remove(child(ref(database, "Services"), serviceName))
        .then(() => {
          toast.success("Scheme deleted successfully");
          setEditService(null); // Clear edit state after deletion
        })
        .catch((error) => {
          toast.error("Error deleting scheme");
          console.error("Error deleting scheme:", error);
        });
    }
  };

  return (
    <div>
      <section className="bg-gray-100">
        <div className="container mx-auto">
          {loading ? (
            <SchemeSkeleton isadmin={true} />
          ) : (
            <div className="grid grid-cols-3 gap-5  overflow-y-auto">
              {GrampanchayatSchemes.map((data) => (
                <div
                  key={data.id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="relative w-full h-[30vh] mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={data.imageUrl || "/placeholder.jpg"}
                      alt={data.serviceName || ""}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h3 className="text-xl tracking-wide font-bold mb-2">
                    {data.serviceName}
                  </h3>
                  <h5 className="text-sm font-semibold mb-2">
                    {data.description}
                  </h5>
                  <span className="text-xs">From: {data.startDate}</span>
                  <br />
                  <span className="text-xs">To: {data.endDate}</span>
                  <div className="mt-5 flex gap-4 items-center">
                    <div
                      onClick={() => editScheme(data.serviceName)}
                      className="rounded-md flex items-center gap-2 bg-blue-400 text-white p-2 px-3 font-bold cursor-pointer"
                    >
                      <MdEdit />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => deleteScheme(data.serviceName)}
                      className="rounded-md flex items-center gap-2 bg-red-600 text-white p-2 px-3 font-bold cursor-pointer"
                    >
                      <MdDelete />
                      <span>Delete</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Edit Service Panel */}
      {editService && (
        <div className="fixed inset-0 p flex items-center justify-center bg-gray-800 bg-opacity-50 p-10">
          <div className="bg-white p-6 rounded-lg shadow-md h-screen overflow-y-auto w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Edit Service</h2>
              <button
                onClick={() => setEditService(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <CgClose size={20} />
              </button>
            </div>
            <EditAdminService serviceName={editService} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
