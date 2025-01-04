import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";  // Ensure you're importing the correct Dialog components from ShadCN
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";

export default function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const {user}=useSelector((state)=>state.auth);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
              </div>
              <span className="text-muted-foreground">(4.5)</span>
          </div>
          <div className="mt-5 mb-10 ">
            <Button className='w-full py-6 text-xl bg-black'>Add to Cart</Button>
          </div>       
       <hr  className="border border-double border-black-100  mt-4"/>
      <div className="max-h-[300px] overflow-auto">
        <h2 className="text-3xl font-bold mb-10">Reviews</h2> 
        <div className="grid gap-6">
          <div className="flex gap-4">
            <Avatar className="w-10 h-10 rounded-full bg-slate-400 flex justify-center items-center">
            <AvatarFallback>
              SM
            </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold ">{user?.userName}</h3>
              </div>
              <div className="flex items-center gap-0.5">
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
              </div>
              <p className="text-muted-foreground">This is an Awesome product</p>
            </div>
          </div>
        </div> <div className="grid gap-6">
          <div className="flex gap-4">
            <Avatar className="w-10 h-10 rounded-full bg-slate-400 flex justify-center items-center">
            <AvatarFallback>
              SM
            </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold ">{user?.userName}</h3>
              </div>
              <div className="flex items-center gap-0.5">
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
              </div>
              <p className="text-muted-foreground">This is an Awesome product</p>
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="flex gap-4">
            <Avatar className="w-10 h-10 rounded-full bg-slate-400 flex justify-center items-center">
            <AvatarFallback>
              SM
            </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold ">{user?.userName}</h3>
              </div>
              <div className="flex items-center gap-0.5">
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
              </div>
              <p className="text-muted-foreground">This is an Awesome product</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          <Input placeholder="Write a review"  />
          <Button>Submit</Button>
        </div>
      </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
