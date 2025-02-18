import UpdateDialog from "@/components/custom-ui/users/edit-dialog";
import CustomSidebar from "@/components/custom-ui/custom-sidebar";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { findById } from "@/services/user.service";
import { UserType } from "@/types/user.type";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserId } from "@/services/auth.service";
import ButtonWithAlert from "@/components/custom-ui/users/button-with-alert";

const SingleUser = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [connectedUserId, setConnectedUserId] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const fetchUser = async () => {
    try {
      const data = await findById(Number(id));
      setUser(data);
      console.log("User fetched:", data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    const fetchConnectedUserId = async () => {
      const userId = getUserId();
      setConnectedUserId(userId);

      // Fetch the connected user's details to check if they are an admin
      if (userId) {
        const connectedUser = await findById(userId);
        setIsAdmin(connectedUser.roles.includes("admin"));
      }
    };

    fetchConnectedUserId();
    fetchUser();
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <CustomSidebar />
      <div className="flex flex-col p-4 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center mb-4 gap-1">
            <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={goBack} />
            <h1 className="font-bold text-3xl">
              {user?.firstName} {user?.lastName}{" "}
              {connectedUserId === user?.id && <span>( You )</span>}
            </h1>
          </div>
          <div className="flex gap-4">
            <UpdateDialog id={Number(id)} onUpdate={fetchUser} />
            {isAdmin && connectedUserId !== user?.id && (
              <ButtonWithAlert id={Number(id)} onDelete={fetchUser} />
            )}
          </div>
        </div>

        <div>
          <div>
            <Card className="w-fit flex px-4 py-2 mb-4">
              <h2 className="text-sm font-bold text-gray-500">Email:&nbsp;</h2>
              <p className="text-sm">{user?.email}</p>
            </Card>
            <Card className="w-fit flex px-4 py-2 mb-4">
              <h2 className="text-sm font-bold text-gray-500">Role:&nbsp;</h2>
              <p className="text-sm">
                {user?.roles.includes("admin") ? "Admin" : "User"}
              </p>
            </Card>
          </div>
          <div className="rounded-md border mb-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Reservations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* If reservations */}
                {/* <TableRow >
                      <TableCell></TableCell>
                    </TableRow> */}
                {/* If no reservations */}
                <TableRow>
                  <TableCell className="text-gray-300 text-lg text-center font-bold">
                    No Reservation
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleUser;
