import { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { UserCircle } from "lucide-react";
import { getUserId } from "@/services/auth.service";
import { findById } from "@/services/user.service";

const UserProfile = () => {
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = getUserId();
        if (userId) {
          const profile = await findById(userId);
          setUser(profile);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center gap-3 py-2 px-4 max-w-sm ">
        <Avatar className="h-12 w-12 flex justify-center items-center">
          <UserCircle className="h-10 w-10" />
        </Avatar>
        <div className="flex-1">
          <div className="text-sm font-medium ">
            {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
          </div>
          <div className="text-sm text-zinc-400">
            {user ? user.email : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
