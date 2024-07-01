import AdminPanel from "@/components/Admin/AdminPanel";
import AdminPanelHeader from "@/components/Admin/AdminPanel/AdminPanelHeader";
const page = ({
  params: { username },
}: {
  params: {
    username: string;
  };
}) => {
  return (
    <div>
      <AdminPanelHeader username={username} />
      <AdminPanel  />
    </div>
  );
};

export default page;
