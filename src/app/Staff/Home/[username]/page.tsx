import StaffHeader from "@/components/Staff/StaffHeader"
import StaffPanel from "@/components/Staff/StaffPanel"

const page = ({
  params:{username}
}:{
  params:{
    username: string
  }
}) => {
  return (
    <div>
       <StaffHeader username={username} />
      <StaffPanel />
    </div>
  )
}

export default page