import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SchemeSkeleton = ({ isadmin }: { isadmin: boolean }) => {
  return (
    <div>
      <div className="grid grid-cols-3 mx-5 gap-5">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <span className="">
            {<Skeleton height={180} borderRadius={10} />}
          </span>
          <h3 className="text-xl mt-2 tracking-wide font-bold mb-2">
            {<Skeleton />}
          </h3>
          <h5 className="text-sm font-semibold mb-2">
            {<Skeleton count={3} />}
          </h5>
          <span className="text-xs">
            Fram : {<Skeleton width={150} height={16} />}
          </span>
          <span className="text-xs">
            To : {<Skeleton width={150} height={16} />}
          </span>
          {isadmin ? (
            <div className="mt-5 flex gap-4 items-center">
              <div className=" rounded-md flex items-center gap-2 bg-blue-400 text-white p-2 px-3 font-bold ">
                <MdEdit />
                <button className="">Edit</button>
              </div>
              <div className=" flex items-center gap-2 rounded-md bg-red-600 text-white p-2 px-3 font-bold ">
                <MdDelete />
                <button className="">Delete</button>
              </div>
            </div>
          ) : (
            <div className="mt-5">
              <button className="bg-blue-500 text-white p-2 px-3 rounded-lg font-bold ">
                Apply
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemeSkeleton;
