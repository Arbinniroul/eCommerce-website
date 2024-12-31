import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
  } from "@radix-ui/react-dialog";
  
  export default function ProductDetailsDialog({ open, setOpen, productDetails }) {
    return (
      <div className=" flex  absolute z-50 bottom-80 ">
        <Dialog open={open} onOpenChange={setOpen}>
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
            <div className="grid gap-6">
              <DialogTitle className="text-3xl font-extrabold">
                {productDetails?.title}
              </DialogTitle>
              <DialogDescription className="text-muted-background">
                {productDetails?.description}
              </DialogDescription>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  