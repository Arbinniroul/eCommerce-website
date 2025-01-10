import { brandOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddToCart }) {
  const isOutOfStock = product?.totalStock <= 0;
  const isLowStock = product?.totalStock > 0 && product?.totalStock < 10;
  const hasSalePrice = product?.salePrice > 0;

  return (
    <Card className="w-full relative max-w-sm mx-5 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg border border-gray-200">
      <div>
        <div className="relative" onClick={() => handleGetProductDetails(product?._id)}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] object-cover rounded-t-lg transition-transform hover:scale-105 duration-300 ease-in-out"
          />
          {isOutOfStock && (
            <Badge className="absolute top-3 right-3 bg-red-500 text-white text-sm px-2 py-1 rounded-md">
              Out of Stock
            </Badge>
          )}
          {isLowStock && (
            <Badge className="absolute top-3 left-3 bg-yellow-500 text-white text-sm px-2 py-1 rounded-md">
              {`Only ${product.totalStock} left`}
            </Badge>
          )}
          {hasSalePrice && !isOutOfStock && (
            <Badge className="absolute top-3 right-3 bg-red-500 text-white text-sm px-2 py-1 rounded-md">
              Sale
            </Badge>
          )}
        </div>
        <CardContent className="p-5">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">{product?.title}</h2>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500">{product?.category}</span>
            <span className="text-sm text-gray-500">{brandOptionsMap[product?.brand]}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            {hasSalePrice ? (
              <>
                <span className="text-lg font-semibold text-gray-500 line-through">${product?.price}</span>
                <span className="text-lg font-bold text-red-600">${product?.salePrice}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-800">${product?.price}</span>
            )}
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex justify-center items-center w-full py-4 bg-gray-50">
        <Button
          onClick={() => !isOutOfStock && handleAddToCart(product?._id, product?.totalStock)}
          className={`w-full h-12 text-lg text-left font-medium text-white ${
            isOutOfStock ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
