"use client";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import SchemeSkeleton from "../Skeletons/SchemeSkeleton";

const Schemes = () => {
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
  return (
    <div id="Schemes">
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8 ml-3 underline">Schemes</h2>
          <div className="py-10 px-3">
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
            <SchemeSkeleton isadmin={false} />
          ) : (
            <div className="grid grid-cols-3 mx-5 gap-8">
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
                  <div className="mt-5">
                    <Link href={`/Client/Services/Apply/${data.schemeName}`} className="bg-blue-500 text-white p-2 px-3 rounded-lg font-bold ">
                      Apply
                    </Link>
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

export default Schemes;
