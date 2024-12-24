import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { logoutUser } from "@/store/authslice";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Assuming you have a toast hook

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  async function handleLogout() {
    try {
      const result = await dispatch(logoutUser()).unwrap();
      if (result.success) {
        toast({ title: "Logged out successfully", status: "success" });
      } else {
        toast({ title: "Logout failed", status: "error" });
      }
    } catch (error) {
      toast({ title: "An error occurred during logout", status: "error" });
    }
  }

  return (
    <header className="flex items-center justify-between px-4 bg-gray-100 border-b border-gray-200 shadow-md">
      {/* Sidebar Toggle Button */}
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block" variant="outline">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      
      {/* Logout Button */}
      <div className="flex flex-1 justify-end">
        <Button
          variant="outline"
          className="inline-flex gap-2 items-center py-2 px-4 text-sm font-medium shadow-sm border-t border-gray-300" 
          onClick={handleLogout}
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}


export default AdminHeader;
