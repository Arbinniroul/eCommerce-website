import { Label } from "@radix-ui/react-dropdown-menu";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";


function ShoppingOrderDetailsView({orderDetails}) {
  const initialFormData = {
    status: '',
  };
  const {user}=useSelector(state=>state.auth);
  const {address}=useSelector(state=>state.shopAddress);
  const [formData, setFormData] = useState(initialFormData);

  return (
    <DialogContent className="sm:max-w-[600px] p-6">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-gray-800">Order Details</DialogTitle>
        <DialogDescription className="text-sm text-gray-500">
          Review the details of your order below.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-6 mt-4">
        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-700">Order ID</p>
          <Label className="text-sm font-light text-gray-500">{orderDetails?._id}</Label>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-700">Order Date</p>
          <Label className="text-sm font-light text-gray-500">{orderDetails?.orderDate.split('T')[0]}</Label>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-700">Order Price</p>
          <Label className="text-sm font-light text-gray-500">${orderDetails?.totalAmount}</Label>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-700">Payment Method</p>
          <Label className="text-sm font-light text-gray-500">{orderDetails?.paymentMethod}</Label>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-700">Payment Status</p>
          <Label className="text-sm font-light text-gray-500">{orderDetails?.paymentStatus}</Label>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-700">Order Status</p>
          <Label className="text-sm font-light text-gray-500">
          <Badge
                      className={`py-1 px-3 ${
                        orderDetails?.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : "bg-black"
                      }`}
                    >
                      {orderDetails?.orderStatus}
                    </Badge>
          </Label>
        </div>

        <hr className="border-t border-gray-300" />

        <div>
          <p className="font-semibold text-gray-800">Order Details</p>
          <ul className="space-y-2 mt-2">
          {orderDetails?.cartItems && orderDetails.cartItems.length > 0 ? (
  orderDetails.cartItems.map((item) => (
    <li key={item._id} className="flex justify-between items-center py-3 px-4 border-b border-gray-200 hover:bg-gray-50">
      <span className="text-sm text-gray-700">{item?.title}</span>
      <span className="text-sm text-gray-500">Qty: {item?.quantity}</span>
      <span className="text-sm text-gray-500">{'$'+item?.price}</span>
    </li>
  ))
) : (
  <p className="text-center text-gray-500">No items found in this order.</p>
)}


            
          </ul>
        </div>

        <div>
          <p className="font-semibold text-gray-800">Shipping Info</p>
          <div className="mt-2 space-y-1 flex flex-col">
            <span className="text-sm text-gray-700">Name:{user?.userName}</span>
            <span className="text-sm text-gray-500">Address:{orderDetails?.addressInfo?.address}</span>
            <span className="text-sm text-gray-500">City:{orderDetails?.addressInfo?.city}</span>
            <span className="text-sm text-gray-500">Pincode:{orderDetails?.addressInfo?.pincode}</span>
            <span className="text-sm text-gray-500">Phone Number:{orderDetails?.addressInfo?.phone}</span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
