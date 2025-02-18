import CustomSidebar from "@/components/custom-ui/custom-sidebar";
import ClassroomsCard from "../../components/custom-ui/cards/ClassroomsCard";
import MaterialsCard from "../../components/custom-ui/cards/MaterialsCard";
import ReservationsCard from "../../components/custom-ui/cards/ReservationsCrard";
import UsersCard from "../../components/custom-ui/cards/UsersCard";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <CustomSidebar />
      <div className="grid grid-cols-2 gap-4 place-items-center flex-grow p-4">
        <ClassroomsCard />
        <MaterialsCard />
        <UsersCard />
        <ReservationsCard />
      </div>
    </div>
  );
};

export default AdminDashboard;

// ADMIN TODO //
// - [ ] LIST CLASSROOMS
// - [X] DELETE CLASSROOM (OR DISABLE)
// - [ ] LIST MATERIALS (FROM ANY CLASSROOMS, FILTER, SHOW ACTIVITY (LAST USED OR NEXT USE OR IF USE IN PROGRESS))
// - [ ] LIST USERS (ROLE, NAME, FILTER, NEXT ACTIVITY OR LAST ACTIVITY, UPDATE, DELETE)
// - [ ] LIST RESERVATIONS (CLASSROOM, MATERIALS, USER, DATE, TIME, STATUS, UPDATE, DELETE)
