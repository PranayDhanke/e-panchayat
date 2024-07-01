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
              <div className=" ">
                <Skeleton width={80} height={35} />
              </div>
              <div className="">
                <Skeleton width={80} height={35} />
              </div>
            </div>
          ) : (
            <div className="mt-5">
              <button className="p-2 px-3 ">
                <Skeleton />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemeSkeleton;
