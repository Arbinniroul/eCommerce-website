import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";  // Ensure you're importing the correct Dialog components from ShadCN
import { Button } from "../ui/button";
import { Label, Separator } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { addToCart, fetchCartItems } from "@/store/shop/cartslice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/productslice";
import StarRatingComponent from "../common/starRating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/reviewSlice";

export default function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const isOutOfStock = productDetails?.totalStock === 0 || productDetails?.totalStock<0;
  const isLowStock = productDetails?.totalStock > 0 && productDetails?.totalStock < 10;
  const hasSalePrice = productDetails?.salePrice > 0;
  const { cartItems } = useSelector((state) => state.cart);
  const {reviews}=useSelector(state=>state.shopReview); 
 
  
  const {user}=useSelector((state)=>state.auth);
  const dispatch  = useDispatch();
  const {toast}=useToast();
   const[reviewMsg,setReviewMsg]=useState('');
   const[rating,setRating]=useState(0);

   function handleRatingChange(getRating){
    setRating(getRating);
   }
    function handleAddToCart(getCurrentProductId,getTotalStock) {
      const getItems = cartItems.items; 
    let getCartItems = getItems || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId._id === getCurrentProductId
      );
      console.log(indexOfCurrentItem,'indexOfCurrentItem');
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
      }
    }
  }
    console.log({ userId: user?.id, productId: getCurrentProductId, quantity: 1 });

    if (user && user?.id) {
      dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId._id, quantity: 1 }))
        .then((data) => {
          if (data.payload.success) {
            dispatch(fetchCartItems({ userId: user.id }));
            toast({
              title: 'Product is Added to cart',
            });
          }
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    } else {
      console.error("User is not logged in.");
    }
  }
  function handleAddReview(){
    
      dispatch(
        addReview({
          productId: productDetails?._id,
          userId: user?.id,
          userName: user?.userName,
          reviewMessage: reviewMsg,
          reviewValue: rating,
        })
      ).then((data) => {
        if (data.payload.success) {
          setRating(0);
          setReviewMsg("");
          dispatch(getReviews(productDetails?._id));
          setRating(0);
          setReviewMsg("");
          toast({
            title: "Review added successfully!",
          });
        }
      });
    }
    useEffect(() => {
      if (productDetails !== null) dispatch(getReviews(productDetails?._id));
    }, [productDetails]);
  
    const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;
console.log(reviews,'reviews');
console.log(reviewMsg);
 function handleDialogClose(){
  setOpen(false);
  dispatch(setProductDetails())
  setRating(0);
  setReviewMsg('')
 }
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      {/* Dialog Trigger Button */}
      <DialogTrigger asChild>
        <button className="hidden">Open Product Details</button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] bg-white rounded-lg shadow-lg">
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="mx-6" >
          <DialogHeader className="mt-5 ">
            <DialogTitle className="text-4xl font-extrabold mb-4">
              {productDetails?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-2xl mt-5">
              {productDetails?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-between mt-4">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            )}
          </div>
          <div className="flex item-center gap-2"> 
          <div className="flex items-center gap-0.5">
                <StarRatingComponent rating={averageReview.toFixed(2  )} />
              </div>
              <span className="text-muted-foreground">(4.5)</span>
          </div>
          <div className="mt-5 mb-10 ">
          <Button
          onClick={() => !isOutOfStock && handleAddToCart(productDetails?._id,productDetails?.totalStock )}
          className={`w-full h-12 text-lg text-left font-medium text-white ${
            isOutOfStock ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "Out of Stock"  : "Add to Cart"}
        </Button>
          </div>       
       <hr  className="border border-double border-black-100  mt-4"/>
      <div className="max-h-[300px] overflow-auto">
        <h2 className="text-3xl font-bold mb-10">Reviews</h2> 
        <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 rounded-full flex items-center bg-gray-400 justify-center border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
        </div>
    
        <div className="mt-10 flex flex-col gap-2">
          <p>Write a review</p>
          <div className="flex gap-1">
            <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange }  />
          </div>
          <Input name='review message' onChange={(event)=>setReviewMsg(event.target.value)} placeholder="Write a review"  />
          <Button onClick={handleAddReview} disabled={reviewMsg.trim()===''}>Submit</Button>
        </div>
      </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
