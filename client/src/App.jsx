import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/authslice/index'; // Ensure to import the correct thunk
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
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturn from './pages/shoppingView/paypalReturn';
import PaymentSuccessPage from './pages/shoppingView/paymentSuccess';
import SearchProducts from './components/shoppingView/search';

function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the checkAuth action to verify user session on page load
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        <Skeleton className="w-[800px] bg-black h-[600px]" />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col min-h-screen bg-white overflow-hidden">
      <div className="flex-grow">
        <Routes>
          <Route path='/'  element={
            <CheckAuth>
            </CheckAuth>} />


          {/* Auth routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={
            <CheckAuth>
              <AdminLayout />
            </CheckAuth>
          }>
            <Route path="dashboard" element={<AdminDashBoard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>

          {/* Shopping routes */}
          <Route path="/shop" element={
            <CheckAuth>
              <ShoppingLayout />
            </CheckAuth>
          }>
            <Route path="home" element={<ShoppingHome />} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="account" element={<ShoppingAccount />} />
            <Route path="paypal-return" element= {<PaypalReturn/> } />
            <Route path="payment-success" element= {<PaymentSuccessPage/> } />
            <Route path="search" element= {<SearchProducts/> } />
          </Route>

          {/* Unauthenticated and Not Found routes */}
          <Route path="/unauth-page" element={<UnAuthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
