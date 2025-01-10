import Address from '@/components/shoppingView/address';
import img from '../../assets/account.jpg';
import { useDispatch, useSelector } from 'react-redux';
import UserCartItemsContent from '@/components/shoppingView/cart-items-content';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createNewOrder } from '@/store/shop/orderslice';

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.cart);
  const {user} = useSelector(state=>state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const{productList}=useSelector(state=>state.shopProducts);

  useEffect(() => {
    if (approvalURL && isPaymentStart) {
      window.location.href = approvalURL;
    }
  }, [approvalURL, isPaymentStart]);

  function handleInitiatePaypalPayment() {
    if(cartItems.length == 0){
      toast({
        title: 'Error',
        description: 'Your cart is empty, please add items to proceed',
        variant: 'destructive',
      });
      return;
    } 
    if(currentSelectedAddress ==null){
      toast({
        title: 'Error',
        description: 'Please select an address to procceed',
        variant: 'destructive',
      });
      return;
    }
     
    const orderData = {
      userId:user?.id,
      cartId:cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.productId.title,
        image: singleCartItem?.productId.image,
        price: singleCartItem?.productId.salePrice > 0 ? singleCartItem?.productId.salePrice : singleCartItem?.productId.price,
        quantity: singleCartItem?.quantity,
        totalStock: productList?.totalStock,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      payerId: '',
    };

    dispatch(createNewOrder(orderData))
      .then((data) => {
        console.log(data);
        if (data?.payload?.success) {
          setIsPaymentStart(true);
        } else {
          toast({
            title: 'Error',
            description: 'Failed to create the order',
            variant: 'destructive',
          });
        }
      })
      .catch((error) => {
        console.log(error)
        toast({
          title: 'Error',
          description: 'Something went wrong with the order creation',
          variant: 'destructive',
        });
      });
  }

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.productId.salePrice > 0
              ? currentItem?.productId.salePrice
              : currentItem?.productId.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <div className="flex flex-col">
      <div className="relative h-[440px] w-full overflow-hidden">
        <img src={img} alt="" className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address selectedId={currentSelectedAddress?._id} setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => <UserCartItemsContent cartItem={item} />)
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart ? "Proccessing paypal Payment..." : "Checkout with PayPal"}
            </Button>
            </div>
            </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
