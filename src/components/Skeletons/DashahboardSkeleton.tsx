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
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          View Form
        </button>
      </div>
    </div>
  );
};

export default DashahboardSkeleton;
