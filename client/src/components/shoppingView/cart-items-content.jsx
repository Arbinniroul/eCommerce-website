import { CloudCog, Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItems,
  fetchCartItems,
  updateCartQuantity,
} from "@/store/shop/cartslice";
import { useToast } from "@/hooks/use-toast";

export default function UserCartItemsContent({ cartItem }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cartItems?.items || []);
  const {productList} = useSelector((state) => state.shopProducts);
 console.log(productList,'productList');
  function handleUpdateQuantity(cartItem, actionType) {
    const productIndex = productList.findIndex(
      (product) => product._id === cartItem.productId?._id
    );
  
    if (productIndex > -1) {
      const totalStock = productList[productIndex].totalStock;
      const cartItemIndex = cartItems.findIndex(
        (item) => item.productId._id === cartItem.productId._id
      );
  
      if (actionType === "plus" && cartItemIndex > -1) {
        if (cartItems[cartItemIndex].quantity + 1 > totalStock) {
          toast({
            title: `Only ${totalStock} quantity available for this item`,
            variant: "destructive",
          });
          return;
        }
      }
  
      if (cartItemIndex > -1) {
        dispatch(
          updateCartQuantity({
            userId: user?.id,
            productId: cartItem?.productId?._id,
            quantity: actionType === "plus"
              ? cartItems[cartItemIndex].quantity + 1
              : cartItems[cartItemIndex].quantity - 1,
          })
        ).then((response) => {
          if (response.payload?.success) {
            dispatch(fetchCartItems({ userId: user?.id }));
            toast({ title: "Cart item updated successfully" });
          }
        });
      }
    }
  }
  
  function handleCartItemDelete(cartItem) {
    dispatch(
      deleteCartItems({ userId: user?.id, productId: cartItem.productId?._id })
    ).then((response) => {
      if (response.payload?.success) {
        dispatch(fetchCartItems({ userId: user?.id }));
        toast({ title: "Cart item deleted successfully" });
      } else {
        toast({
          title: "Failed to delete cart item",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem.productId.image}
        alt={cartItem.productId.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem.productId.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem.productId.salePrice > 0 ? cartItem.productId.salePrice : cartItem.productId.price) *
            cartItem.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}
