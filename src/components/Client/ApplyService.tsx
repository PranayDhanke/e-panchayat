const ApplyService = ({ scheme_name }: { scheme_name: any }) => {
  const url = decodeURI(scheme_name);

  return (
    <div>
      <span>{url}</span>
    </div>
  );
};

export default ApplyService;
