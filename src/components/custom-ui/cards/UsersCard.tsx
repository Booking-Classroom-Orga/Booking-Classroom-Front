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
import { findAll } from "@/services/user.service";
import UpdateDialog from "../users/edit-dialog";
import { useNavigate } from "react-router-dom";
import { getUserId } from "@/services/auth.service";
import ButtonWithAlert from "../users/button-with-alert";

const UsersCard = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [connectedUserId, setConnectedUserId] = useState<number | null>(null);
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
    const fetchConnectedUserId = async () => {
      const userId = getUserId();
      setConnectedUserId(userId);
    };

    fetchConnectedUserId();
    fetchUsers();
  }, []);

  const goToSingleUser = (id: number) => () => {
    navigate(`/user/${id}`);
  };

  return (
    <Card className="w-[500px]">
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
                <div>
                  {user.firstName} {user.lastName}{" "}
                  {connectedUserId === user.id && <span>(You)</span>}
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex justify-end items-center space-x-4">
                <Button variant="secondary" onClick={goToSingleUser(user.id)}>
                  More
                </Button>
                <UpdateDialog id={user.id} onUpdate={fetchUsers} />
                {connectedUserId !== user.id && (
                  <ButtonWithAlert id={user.id} onDelete={fetchUsers} />
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default UsersCard;
