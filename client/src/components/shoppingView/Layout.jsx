import { Outlet } from 'react-router-dom';
import ShoppingHeader from './header';
function ShoppingLayout() {
  return (
  <div className='w-full'>
     <div className="flex flex-col bg-white overflow-hidden">
 <ShoppingHeader/>
<main className="flex flex-col w-full">
    <Outlet/>
</main>
   </div>
  </div>
  
  );
};

export default ShoppingLayout;