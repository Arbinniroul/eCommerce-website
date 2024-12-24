import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useEffect } from "react";
import { logoutUser } from "@/store/authslice";

function MenuItems() {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link className="text-sm font-medium" key={menuItem.id} to={menuItem.path}>
          {menuItem.label}
        </Link>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  function handleLogout() {
    dispatch(logoutUser());
  }
  
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Button variant="outline">
        <ShoppingCart className="w-6 h-6" />
        <span className="sr-only">User Cart</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black rounded-full w-8 h-8 flex items-center justify-center" alt="@shadcn">
            <AvatarFallback className="text-xs bg-black text-white font-extrabold">{user?.userName[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger> 

        <DropdownMenuContent 
          side="right" 
          className="w-56 bg-white rounded-lg shadow-xl p-2 border border-gray-200 transition ease-in-out duration-150 transform hover:scale-105"
        >
          <DropdownMenuLabel className="px-4 py-2 text-sm text-gray-600 font-semibold border-b border-gray-200 mb-2">
            Logged in as {user?.userName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-2 border-t border-gray-200" />
          <DropdownMenuItem 
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black rounded-md transition ease-in-out duration-150 cursor-pointer" 
            onClick={() => navigate('/shop/account')}
          >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black rounded-md transition ease-in-out duration-150 cursor-pointer" 
            onClick={handleLogout} 
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
 
  useEffect(() => {
    if (user) {
      console.log("User:", user);
    }
  }, [user]);

  return (
    <header className="sticky z-40 top-0 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>

        {/* Dialog for mobile menu */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DialogTrigger>
          <DialogContent 
            side="left" 
            className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white p-4 shadow-lg transition-transform duration-300 transform -translate-x-full lg:hidden"
            style={{ transform: 'translateX(0)' }} // Slide-in effect
          >
            <MenuItems />
            <HeaderRightContent />
          </DialogContent>
        </Dialog>

        {/* Desktop menu */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent /> 
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
