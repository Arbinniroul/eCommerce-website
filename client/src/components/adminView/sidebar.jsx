import { Fragment } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { ChartLine, LucideLayoutDashboard, ShoppingBasket, FolderCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const adminSidebarMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: <LucideLayoutDashboard />,
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icon: <ShoppingBasket />,
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icon: <FolderCheck />,
  },
];

const MenuItems = ({ adminSidebarItems, navigate, setOpen }) => {
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path); 
            if (setOpen) setOpen(false); // Close the sidebar on mobile
          }}
          className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-muted-foreground hover:bg-gray-200 hover:text-black transition-colors"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
};

function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();
  
  return (
    <Fragment>
      {/* Mobile view - Sheet Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b px-4 py-3">
              <SheetTitle className="flex cursor-pointer items-center gap-2">
                <ChartLine size={20} />
                <span className="font-semibold">Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            {/* Pass props to MenuItems inside the Sheet */}
            <MenuItems adminSidebarItems={adminSidebarMenuItems} navigate={navigate} setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Default desktop view */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-gray-50 p-6">
        <div
          onClick={() => navigate('/admin/dashboard')}
          className="flex cursor-pointer items-center gap-2 mb-8"
        >
          <ChartLine size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        {/* Pass props to MenuItems for the desktop sidebar */}
        <MenuItems adminSidebarItems={adminSidebarMenuItems} navigate={navigate} />
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
