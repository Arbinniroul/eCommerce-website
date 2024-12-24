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
  const [isFormValid, setIsFormValid] = useState(false); // Track form validation
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { productList } = useSelector((state) => state.adminProducts);

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const action = currentEditedId !== null ? editProduct({ id: currentEditedId, formData }) : addNewProduct({
      ...formData,
      image: uploadedImageUrl
    });

    dispatch(action).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProduct());
        setFormData(initialFormData);
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null);
        setImgFile(null);
        toast({ title: currentEditedId !== null ? 'Product Edited Successfully' : 'Product Added Successfully' });
      }
    });
  };
  useEffect(() => {
    console.log(productList);
}, [productList]);

  // Validate form data
  useEffect(() => {
    
    const isFormValid = Object.values(formData).every(value => value !== '' && value !== null && value !== undefined);
    console.log(formData)
    setIsFormValid(isFormValid);
  }, [formData]); // Runs whenever formData changes

  const handleDelete = (getCurrentProductId) => {
    dispatch(deleteProduct(getCurrentProductId)).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchAllProduct());
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  const buttonText = currentEditedId !== null ? 'Edit Product' : 'Add new Product';

  return (
    <div className="w-full px-5">
      <Fragment>
        <div className="mb-5 w-full flex justify-end">
          <Button
            onClick={() => setOpenCreateProductsDialog(true)}
            className="font-semibold px-6 py-3 rounded-md transition"
          >
            {buttonText}
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
          onOpenChange={() => {
            if (openCreateProductsDialog) {
              setOpenCreateProductsDialog(false);
              setCurrentEditedId(null);
              setFormData(initialFormData);
            }
          }}
        >
          <SheetContent side="right" className="overflow-auto max-w-lg w-full p-6">
            <SheetHeader>
              <SheetTitle className="text-xl font-bold">
                {buttonText}
              </SheetTitle>
            </SheetHeader>
            
            <ProductImageUpload
              imgFile={imgFile}
              setImgFile={setImgFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode={currentEditedId !== null}
            />
            
            <div className="py-6">
              <CommonForm
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId !== null ? "Edit" : "Add"}
                formControls={addProductFormElements}
                ref={inputRef}
                isBtnDisabled={isFormValid} // Use updated form validation state
              />
            </div>
          </SheetContent>
        </Sheet>
      </Fragment>
    </div>
  );
}

export default AdminProducts;
