import { brandOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ShoppingProductTile({ product,handleGetProductDetails }) {
  return (
    <Card className="w-full relative  max-w-sm mx-5 shadow-lg hover:shadow-2xl" onClick={()=>handleGetProductDetails(product?._id)}>
      <div>
        <div className="relative ">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] object-cover rounded-t-lg "
          />
          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {product?.category}
            </span>
            <span className="text-sm text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            {product?.salePrice > 0 ? (
              <>
                <span className="text-lg font-semibold text-primary line-through">
                  ${product?.price}
                </span>
                <span className="text-lg font-semibold text-red-600">
                  ${product?.salePrice}
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-primary">
                ${product?.price}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className='flex justify-center items-center w-100'>
            <Button className="w-100 h-12 w-60 text-xl rounded-md" >
             Add to Cart
            </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;
