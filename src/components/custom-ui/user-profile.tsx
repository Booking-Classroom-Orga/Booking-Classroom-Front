import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronDown,
  LogOut,
  Bell,
  CreditCard,
  User,
  Sparkles,
} from "lucide-react";

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-3 py-2 px-4 max-w-sm cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Avatar className="h-12 w-12">
          <AvatarImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pp-Lf7OYmWPApXMnOk1DNHOvC9mwsvmbJ.png"
            alt="User avatar"
          />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="text-sm font-medium ">Admin</div>
          <div className="text-sm text-zinc-400">admin@example.com</div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-black transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 w-[240px] mt-2 py-2 bg-zinc-900 rounded-lg shadow-lg">
          <div className="flex items-center gap-3 p-2 mb-2 border-b border-zinc-800">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pp-Lf7OYmWPApXMnOk1DNHOvC9mwsvmbJ.png"
                alt="User avatar"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">shadcn</div>
              <div className="text-sm text-zinc-400">m@example.com</div>
            </div>
          </div>

          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-zinc-800">
            <Sparkles className="h-4 w-4" />
            <span>Upgrade to Pro</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-zinc-800">
            <User className="h-4 w-4" />
            <span>Account</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-zinc-800">
            <CreditCard className="h-4 w-4" />
            <span>Billing</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-zinc-800">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-zinc-800">
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
