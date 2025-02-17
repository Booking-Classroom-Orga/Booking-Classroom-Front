import UpdateDialog from "@/components/custom-ui/users/edit-dialog";
import CustomSidebar from "@/components/custom-ui/custom-sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { findAll } from "@/services/user.service";
import { UserType } from "@/types/user.type";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const ListUser = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  //   const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const data = await findAll();
      setUsers(data);
      console.log("Users fetched:", data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //   const goToSingleUser = (id: number) => {
  //     navigate(`/user/${id}`);
  //   };

  return (
    <>
      <CustomSidebar />
      <div className="flex flex-col p-4 w-full">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl">Users</h1>
        </div>
        <Accordion type="single" collapsible>
          {users.map((user) => (
            <AccordionItem key={user.id} value={`item-${user.id}`}>
              <AccordionTrigger>
                {user.firstName} {user.lastName}
              </AccordionTrigger>
              <AccordionContent className="flex space-x-4">
                <Button
                  variant="secondary"
                  //   onClick={() => goToSingleUser(user.id)}
                >
                  More
                </Button>
                <UpdateDialog id={user.id} onUpdate={fetchUsers} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default ListUser;
