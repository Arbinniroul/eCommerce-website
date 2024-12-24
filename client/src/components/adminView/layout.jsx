import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import { Outlet } from 'react-router-dom';
import { useState } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        <AdminHeader setOpen={setOpenSidebar} />
        <main className="flex flex-wrap gap-6 p-4 md:p-6 bg-muted/40">
          {/* Content from Outlet will go here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
