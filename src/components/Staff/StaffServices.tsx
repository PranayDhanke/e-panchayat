import { database } from "@/database/firebase";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import SchemeSkeleton from "../Skeletons/SchemeSkeleton";
import Image from "next/image";

const StaffServices = () => {
  const [GrampanchayatSchemes, setGrampanchayatSchemes] = useState([
    {
      id: "",
    },
    {
      id: "",
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
  }, []);

  return (
    <div>
      <section className="bg-gray-100">
        <div className="container mx-auto">
          {loading ? (
            <SchemeSkeleton isadmin={true} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  overflow-y-auto">
              {GrampanchayatSchemes.map((data) => (
                <div
                  key={data.id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className=" relative x w-full border h-[30vh] object-cover mb-4 rounded-lg">
                    <Image src={data.imageUrl || ""} alt={""} fill></Image>
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
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default StaffServices;
