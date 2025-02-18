import CustomSidebar from "@/components/custom-ui/custom-sidebar";
import ClassroomsCard from "@/components/custom-ui/cards/ClassroomsCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UserReservationsCard from "@/components/custom-ui/cards/UserReservationsCard";

const CommonDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="flex w-full justify-center">
      <CustomSidebar />
      <div className="w-full flex items-center gap-10 p-10">
        {!isAuthenticated ? (
          <div className="text-center col-span-2">
            <p>Please connect to your account or create one!</p>
            <div className="mt-4">
              <Button onClick={goToLogin}>Login</Button>
              <Button onClick={goToSignup}>Signup</Button>
            </div>
          </div>
        ) : (
          <>
            <ClassroomsCard />
            <UserReservationsCard />
          </>
        )}
      </div>
    </div>
  );
};

export default CommonDashboard;
