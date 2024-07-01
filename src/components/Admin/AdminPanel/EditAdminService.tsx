"use client";

import { database, storage } from "@/database/firebase";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";

import { ref as ref1 } from "firebase/storage";
import { ref as ref2, get, set } from "firebase/database";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EditAdminService = ({ serviceName }: { serviceName: string }) => {
  const [serviceData, setServiceData] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const serviceRef = ref2(database, `Services/${serviceName}`);
        const snapshot = await get(serviceRef);
        if (snapshot.exists()) {
          setServiceData(snapshot.val());
          setImagePreview(snapshot.val().imageUrl);
        } else {
          toast.error("Service not found");
        }
      } catch (error) {
        toast.error("Error fetching service data");
      }
    };

    fetchServiceData();
  }, [serviceName]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      if (imageFile) {
        const storageRef = ref1(storage, `Services/${serviceData.serviceName}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            toast.info("Upload is " + progress + "% done");
          },
          (error) => {
            toast.error("Upload failed" + error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await set(ref2(database, `Services/${serviceData.serviceName}`), {
              ...serviceData,
              imageUrl: downloadURL,
            })
              .then(() => {
                toast.success("Service updated successfully");
                router.back();
              })
              .catch(() => {
                toast.error("Error while updating service");
              });
          }
        );
      } else {
        set(ref2(database, `Services/${serviceData.serviceName}`), {
          ...serviceData,
        })
          .then(() => {
            toast.success("Service updated successfully");
          })
          .catch(() => {
            toast.error("Error while updating service");
          });
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  if (!serviceData) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex  justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 relative">
          <label className="block text-gray-700">Service Image</label>
          {imagePreview && (
            <div className="relative w-full border rounded-lg h-44 mb-4">
              <Image
                src={imagePreview}
                alt="Service Image"
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-50">
                <FaEdit className="text-white text-3xl" />
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Service Name</label>
          <input
            type="text"
            name="serviceName"
            value={serviceData.serviceName}
            onChange={(e) =>
              setServiceData({ ...serviceData, serviceName: e.target.value })
            }
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={serviceData.startDate}
            onChange={(e) =>
              setServiceData({ ...serviceData, startDate: e.target.value })
            }
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={serviceData.endDate}
            onChange={(e) =>
              setServiceData({ ...serviceData, endDate: e.target.value })
            }
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={serviceData.description}
            onChange={(e) =>
              setServiceData({ ...serviceData, description: e.target.value })
            }
            className="mt-1 p-2 border rounded w-full"
            rows={4}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
        >
          Update Service
        </button>
      </form>
    </div>
  );
};

export default EditAdminService;
