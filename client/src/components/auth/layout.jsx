import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Left Half: Welcome Message */}
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight">Welcome to ECommerce shopping</h1>
        </div>
      </div>

      {/* Right Half: Centered Content */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center"> {/* Centering the content */}
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
