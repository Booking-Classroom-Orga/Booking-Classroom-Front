import { Avatar } from "@/components/ui/avatar";
import { UserCircle } from "lucide-react";

const UserProfile = () => {
  return (
    <div className="relative">
      <div className="flex items-center gap-3 py-2 px-4 max-w-sm ">
        <Avatar className="h-12 w-12 flex justify-center items-center">
          <UserCircle className="h-10 w-10" />
        </Avatar>
        <div className="flex-1">
          <div className="text-sm font-medium ">User</div>
          <div className="text-sm text-zinc-400">user@example.com</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
