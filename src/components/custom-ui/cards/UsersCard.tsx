import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { UserType } from "@/types/user.type";
import { findAll, remove } from "@/services/user.service";
import UpdateDialog from "../users/edit-dialog";
import { useNavigate } from "react-router-dom";

const UsersCard = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const navigate = useNavigate();

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

  const handleDelete = async (user: UserType) => {
    await remove(Number(user.id));
    fetchUsers();
  };

  const goToSingleUser = (id: number) => () => {
    navigate(`/user/${id}`);
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-bold flex items-center">
            <Users className="w-5 h-5 mr-2" /> Users
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {users.map((user) => (
            <AccordionItem key={user.id} value={`item-${user.id}`}>
              <AccordionTrigger>
                {user.firstName} {user.lastName}
              </AccordionTrigger>
              <AccordionContent className="flex justify-end items-center space-x-4">
                <Button variant="secondary" onClick={goToSingleUser(user.id)}>
                  More
                </Button>
                <UpdateDialog id={user.id} onUpdate={fetchUsers} />
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(user)}
                >
                  Delete
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default UsersCard;
