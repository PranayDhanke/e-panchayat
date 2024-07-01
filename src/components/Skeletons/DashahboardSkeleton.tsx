import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashahboardSkeleton = () => {
  return (
    <div className="flex mt-5 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <span>
          <Skeleton width={50} height={50} borderRadius={100} />
        </span>
        <span className="text-xl font-semibold ">
          <Skeleton width={150} />
        </span>
      </div>
      <div>
        <span className="font-bold ">
          <Skeleton width={130} height={20} />
        </span>
      </div>
      <div>
        <button className="px-4 py-2 ">
          <Skeleton width={120} height={35} />
        </button>
      </div>
    </div>
  );
};

export default DashahboardSkeleton;
