"use client";
import SchemeSkeleton from "@/components/Skeletons/SchemeSkeleton";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdDelete, MdEdit } from "react-icons/md";

const AdminServices = () => {
  const [GrampanchayatSchemes, setGrampanchayatSchemes] = useState([
    {
      imageURL: "",
      schemeName: "",
      description: "",
      fromDate: "",
      toDate: "",
    },
  ]);

  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetch("/schemes.json").then((response) => {
      response.json().then((data) => {
        setGrampanchayatSchemes(data);
        setloading(false);
      });
    });
  });

  const [searchInput, setSearchInput] = useState("");

  const searchSchemes = (event: FormEvent) => {
    event.preventDefault();
    if (searchInput == " " || searchInput == "") {
      setGrampanchayatSchemes(GrampanchayatSchemes);
    } else {
      GrampanchayatSchemes.map((map) => {
        if (map.schemeName == searchInput) {
          setGrampanchayatSchemes([map]);
        }
      });
    }
  };

  const editScheme = (scheme: any) => {
    alert(scheme.schemeName)
  };

  const deleteScheme = (scheme: any) => {
    alert(scheme.schemeName)
  };

  return (
    <div>
      <section className="bg-gray-100">
        <div className="container mx-auto">
          <div className="py-5">
            <form onSubmit={searchSchemes} className="flex items-center">
              <CiSearch className="absolute text-xl ml-3" />
              <input
                type="text"
                placeholder="Search"
                value={searchInput}
                className="p-2 border pl-10 outline-none"
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
              />
              <button
                type="submit"
                className="p-2 px-5 bg-blue-500 border-none cursor-pointer outline-none text-white"
              >
                Search
              </button>
            </form>
          </div>
          {loading ? (
            <SchemeSkeleton isadmin={true} />
          ) : (
            <div className="grid grid-cols-3 gap-5  overflow-y-auto">
              {GrampanchayatSchemes.map((data) => (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <img
                    src={data.imageURL}
                    alt={""}
                    className="w-full border h-[30vh] object-cover mb-4 rounded-lg"
                  />
                  <h3 className="text-xl tracking-wide font-bold mb-2">
                    {data.schemeName}
                  </h3>
                  <h5 className="text-sm font-semibold mb-2">
                    {data.description}
                  </h5>
                  <span className="text-xs">Fram : {data.fromDate}</span>
                  <br />
                  <span className="text-xs">To : {data.toDate}</span>
                  <div className="mt-5 flex gap-4 items-center">
                    <div
                      onClick={() => editScheme(data)}
                      className=" rounded-md flex items-center gap-2 bg-blue-400 text-white p-2 px-3 font-bold "
                    >
                      <MdEdit />
                      <button className="">Edit</button>
                    </div>
                    <div
                      onClick={() => deleteScheme(data)}
                      className=" flex items-center gap-2 rounded-md bg-red-600 text-white p-2 px-3 font-bold "
                    >
                      <MdDelete />
                      <button className="">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminServices;
