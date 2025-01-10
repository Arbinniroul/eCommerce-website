import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { Fragment, useState, useRef, useEffect } from "react";
import ProductImageUpload from "../../components/adminView/imageUpload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, deleteProduct, editProduct, fetchAllProduct } from "@/store/admin/productsslice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/adminView/product-tile";

const initialFormData = {
  image: null,
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: ''
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imgFile, setImgFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { productList } = useSelector((state) => state.adminProducts);

  const handleImageFileChange = (e) => setImgFile(e.target.files[0]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = currentEditedId
      ? editProduct({ id: currentEditedId, formData: { ...formData, image: uploadedImageUrl }})
      :addNewProduct({ ...formData, image: uploadedImageUrl }) ;

    dispatch(action).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProduct());
        resetFormState();
        toast({
          title: currentEditedId ? 'Product Edited Successfully' : 'Product Added Successfully',
        });
      }
    });
  };

  const resetFormState = () => {
    setFormData(initialFormData);
    setOpenCreateProductsDialog(false);
    setCurrentEditedId(null);
    setImgFile(null);
    setUploadedImageUrl("");
  };

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  useEffect(() => {
    const isValid = Object.values(formData).every((value) => value) && uploadedImageUrl;
    setIsFormValid(isValid);
  }, [formData, uploadedImageUrl]);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProduct());
      }
    });
  };

  const buttonText = currentEditedId ? 'Edit Product' : 'Add New Product';

  return (
    <div className="w-full px-5">
      <Fragment>
        <div className="mb-5 w-full flex justify-end">
          <Button
            onClick={() => setOpenCreateProductsDialog(true)}
            className="font-semibold px-6 py-3 rounded-md transition bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
          >
            Add New Product
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productList.length > 0 ? (
            productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                key={productItem._id}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>

        <Sheet
          open={openCreateProductsDialog}
          onOpenChange={resetFormState}
        >
          <SheetContent side="right" className="overflow-auto max-w-lg w-full p-6">
            <SheetHeader>
              <SheetTitle className="text-xl font-bold">{buttonText}</SheetTitle>
            </SheetHeader>

            <ProductImageUpload
              imgFile={imgFile}
              setImgFile={setImgFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode={currentEditedId}
            />

            <div className="py-6">
              <CommonForm
                onSubmit={handleFormSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonText={buttonText}
                formControls={addProductFormElements}
                ref={inputRef}
                isBtnDisabled={isFormValid}
              />
            </div>
          </SheetContent>
        </Sheet>
      </Fragment>
    </div>
  );
}

export default AdminProducts;
