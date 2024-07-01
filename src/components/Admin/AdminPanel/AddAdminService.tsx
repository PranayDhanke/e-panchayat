"use client";

import { database, storage } from "@/database/firebase";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { FormEvent, useRef, useState } from "react";

import { ref as ref1 } from "firebase/storage";
import { ref as ref2, set } from "firebase/database";
import { toast } from "react-toastify";

const AddAdminService = () => {
  const [serviceName, setserviceName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setaEnddate] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      if (imageFile) {
        const storageRef = ref1(storage, `Services/${serviceName}`);
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
            await set(ref2(database, `Services/${serviceName}`), {
              serviceName: serviceName,
              startDate: startDate,
              endDate: endDate,
              description: description,
              imageUrl: downloadURL,
            })
              .then(() => {
                toast.success("Scheme Added Successfully");
              })
              .catch(() => {
                toast.error("Error while scheme adding");
              });
          }
        );
      } else {
        toast.error("Image not found");
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Add Service</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Service Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Service Name</label>
          <input
            type="text"
            name="serviceName"
            value={serviceName}
            onChange={(e) => setserviceName(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={(e) => setaEnddate(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            rows={4}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddAdminService;
