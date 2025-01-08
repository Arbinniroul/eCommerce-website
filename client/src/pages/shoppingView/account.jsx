import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import accountImage from '../../assets/account.jpg';
import Orders from '@/components/shoppingView/orders';
import Address from '@/components/shoppingView/address';

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[450px] w-full overflow-hidden">
        <img src={accountImage} alt="Account Banner" className="h-full w-full object-center object-cover" />
      </div>
      <div className="container mx-auto grid-cols-1 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs  defaultValue="orders" className="w-full">
            <TabsList >
              <TabsTrigger value="orders" className="px-4 py-2 rounded-lg hover:bg-gray-500">
                Orders
              </TabsTrigger>
              <TabsTrigger value="address" className="px-4 py-2 rounded-lg hover:bg-gray-500">
                Address
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="mt-4">
            <Orders/>
            </TabsContent>
            <TabsContent value="address" className="mt-4">
             <Address/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
