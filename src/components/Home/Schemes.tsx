"use client";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import SchemeSkeleton from "../Skeletons/SchemeSkeleton";
import { get, onValue, ref } from "firebase/database";
import { database } from "@/database/firebase";
import Image from "next/image";

const Schemes = () => {
  const [GrampanchayatSchemes, setGrampanchayatSchemes] = useState([
    { id: " " },
    {
      imageUrl: "",
      serviceName: "",
      description: "",
      startDate: "",
      endDate: "",
    },
  ]);

  const [loading, setloading] = useState(true);

  useEffect(() => {
    const refence = ref(database, "Services");
    get(refence).then((snapshot) => {
      if (snapshot.exists()) {
        const schemeArray = Object.entries(snapshot.val()).map(
          ([id, data]) => ({
            id,
            ...(data as object),
          })
        );
        setGrampanchayatSchemes(schemeArray);
        setloading(false);
      }
    });
  });

  return (
    <div id="Schemes">
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8 ml-3 underline">Schemes</h2>
          {loading ? (
            <SchemeSkeleton isadmin={false} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-5 gap-8">
              {GrampanchayatSchemes.map((data) => (
                <div
                  key={data.id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className=" relative w-full border h-[30vh] object-cover mb-4 rounded-lg">
                    <Image src={data.imageUrl || ""} fill alt={""}></Image>
                  </div>
                  <h3 className="text-xl tracking-wide font-bold mb-2">
                    {data.serviceName}
                  </h3>
                  <h5 className="text-sm font-semibold mb-2">
                    {data.description}
                  </h5>
                  <span className="text-xs">Fram : {data.startDate}</span>
                  <br />
                  <span className="text-xs">To : {data.endDate}</span>
                  <div className="mt-5">
                    <Link
                      href={`/Client/Services/Apply/${data.serviceName}`}
                      className="bg-blue-500 text-white p-2 px-3 rounded-lg font-bold "
                    >
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
