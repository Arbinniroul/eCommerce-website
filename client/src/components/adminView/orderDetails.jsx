import { Label, Separator } from "@radix-ui/react-dropdown-menu";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "lucide-react";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "@/store/admin/orderSlice";
import CommonForm from "../common/form";

export default function AdminOrderDetailsView({ orderDetails }) {
  const initialFormData = {
    status: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(orderDetails, "orderDetailsorderDetails");

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent  className="sm:max-w-[600px] p-6">
    <DialogHeader>
      <DialogTitle>Order Details</DialogTitle>
      <DialogDescription>
        Review the details of your order below.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-8">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Order ID</p>
          <Label>{orderDetails?._id}</Label>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Order Date</p>
          <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Order Price</p>
          <Label>${orderDetails?.totalAmount}</Label>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Payment Method</p>
          <Label>{orderDetails?.paymentMethod}</Label>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Payment Status</p>
          <Label>{orderDetails?.paymentStatus}</Label>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Order Status</p>
          <Badge
            className={`py-1 px-3 text-white rounded-full ${
              orderDetails?.orderStatus === "confirmed"
                ? "bg-green-500"
                : orderDetails?.orderStatus === "rejected"
                ? "bg-red-600"
                : "bg-gray-800"
            }`}
          >
            {orderDetails?.orderStatus}
          </Badge>
        </div>
      </div>
      <Separator />
      <div className="grid gap-4">
        <div className="font-semibold">Order Items</div>
        <ul className="grid gap-2">
          {orderDetails?.cartItems?.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>Title: {item.title}</span>
              <span>Quantity: {item.quantity}</span>
              <span>Price: ${item.price}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-4">
        <div className="font-semibold">Shipping Info</div>
        <div className="text-muted-foreground space-y-1">
          <p>{user.userName}</p>
          <p>{orderDetails?.addressInfo?.address}</p>
          <p>{orderDetails?.addressInfo?.city}</p>
          <p>{orderDetails?.addressInfo?.pincode}</p>
          <p>{orderDetails?.addressInfo?.phone}</p>
          <p>{orderDetails?.addressInfo?.notes}</p>
        </div>
      </div>
      <CommonForm
        formControls={[
          {
            label: "Order Status",
            name: "status",
            componentType: "select",
            options: [
              { id: "pending", label: "Pending" },
              { id: "inProcess", label: "In Process" },
              { id: "inShipping", label: "In Shipping" },
              { id: "delivered", label: "Delivered" },
              { id: "rejected", label: "Rejected" },
            ],
          },
        ]}
        formData={formData}
        setFormData={setFormData}
        buttonText={"Update Order Status"}
        onSubmit={handleUpdateStatus}
      />
    </div>
  </DialogContent>
  
  );
}
