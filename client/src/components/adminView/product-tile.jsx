import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({ product,setFormData,setOpenCreateProductsDialog,setCurrentEditedId,handleDelete }) {
  if (!product) return <div>Loading...</div>; // Fallback if product is undefined

  return (
 <div className="flex">
       <Card className="w-full  max-w-xs mx-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <img
          src={product?.image || 'fallback-image-url.jpg'}
          alt={product?.title || 'Product image'}
          className="w-full h-56 object-cover rounded-t-lg"
        />
      </div>
      <CardContent className="p-4">
        <h2 className="text-lg font-bold mb-1 text-center">{product?.title}</h2>
        <div className="text-center mb-3">
          {/* Conditional rendering for sale price */}
          {product?.salePrice > 0 ? (
            <div>
              <span className="text-gray-500 line-through mr-2">${product?.price}</span>
              <span className="text-lg font-bold text-primary">${product?.salePrice}</span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-700">${product?.price}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 border-t">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition duration-150" onClick={()=>{
            setOpenCreateProductsDialog(true)
            setCurrentEditedId(product?._id)
            setFormData(product)
        }}>
          Edit
        </Button>
        <Button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition duration-150" onClick={()=>handleDelete(product?._id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
 </div>
  );
}

export default AdminProductTile;
