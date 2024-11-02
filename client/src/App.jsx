import { Routes, Route } from 'react-router-dom'; // Import Routes and Route 
import AuthLayout from './components/auth/layout';
import AuthRegister from './pages/auth/register';
import AuthLogin from './pages/auth/login';
import AdminLayout from './components/adminView/layout';
import AdminDashBoard from './pages/adminView/dashboard';
import AdminProducts from './pages/adminView/products';
import AdminOrders from './pages/adminView/orders';
import AdminFeatures from './pages/adminView/features';
import ShoppingLayout from './components/shoppingView/Layout';

import ShoppingHome from './pages/shoppingView/Home';
import ShoppingListing from './pages/shoppingView/listing';
import ShoppingCheckout from './pages/shoppingView/checkout';
import ShoppingAccount from './pages/shoppingView/account';
import CheckAuth from './components/common/check-auth';
import UnAuthPage from './pages/un_authpage';
import NotFound from './pages/notfound';

function App() {
  const isAuthenticated = false; // Set authentication status
  const user = null; // Set user information

  return (
    <div className='flex w-full flex-col min-h-screen bg-white overflow-hidden'>
      {/* Common components */}
      <div className='flex-grow'>
        <Routes>
          {/* Main route for /auth */}
          <Route path="/auth" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }>
            {/* Nested routes relative to /auth */}
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>

          {/* Main route for /admin */}
          <Route path="/admin" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }> 
            <Route path="dashboard" element={<AdminDashBoard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>

          {/* Main route for /shop */}
          <Route path="/shop" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }> 
            <Route path="home" element={<ShoppingHome />} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="account" element={<ShoppingAccount />} />
          </Route>

          {/* Not Found route */}
          <Route path="*" element={ <NotFound/>} />
          <Route path="/un-authPage" element={<UnAuthPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
