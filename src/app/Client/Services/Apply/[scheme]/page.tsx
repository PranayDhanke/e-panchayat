import ApplyService from "@/components/Client/ApplyService";

const page = ({
  params: { scheme },
}: {
  params: {
    scheme: any;
  };
}) => {
  return (
    <div>
      <ApplyService scheme_name={scheme} />
    </div>
  );
};

export default page;
