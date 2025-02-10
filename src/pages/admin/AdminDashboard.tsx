import AdminSidebar from "@/components/custom-ui/admin-sidebar";
import ClassroomsCard from "./cards/ClassroomsCard";
import MaterialsCard from "./cards/MaterialsCard";
import ReservationsCard from "./cards/ReservationsCrard";
import UsersCard from "./cards/UsersCard";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
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
// - [ ] CREATE CLASSROOM (CAPACITE, NOM, EQUIPEMENTS)
// - [X] LIST CLASSROOMS
// - [X] UPDATE CLASSROOM
// - [X] DELETE CLASSROOM (OR DISABLE)
// - [ ] LIST MATERIALS (FROM ANY CLASSROOMS, FILTER, SHOW ACTIVITY (LAST USED OR NEXT USE OR IF USE IN PROGRESS))
// - [ ] LIST USERS (ROLE, NAME, FILTER, NEXT ACTIVITY OR LAST ACTIVITY, UPDATE, DELETE)
// - [ ] LIST RESERVATIONS (CLASSROOM, MATERIALS, USER, DATE, TIME, STATUS, UPDATE, DELETE)
