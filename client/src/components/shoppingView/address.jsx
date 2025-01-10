import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, deleteAddress, editAddress, fetchAllAddress } from "@/store/shop/addressslice";
import AddressCard from "./addressCard";
import { useToast } from "@/hooks/use-toast";

export default function Address({setCurrentSelectedAddress,selectedId }) {
  const dispatch = useDispatch();
  const[currentEditedId,setCurrentEditedId]=useState(null);
  const { user } = useSelector(state => state.auth);
  const { addressList } = useSelector(state => state.shopAddress);
  const {toast}=useToast();
  const initialAddressFormData = {
    address: '',
    city: '',
    pincode: '',
    phone: '',
    notes: ''
  };
  
  const [formData, setFormData] = useState(initialAddressFormData);
  const handleManageAddress = async (event) => {
    event.preventDefault();
  
    if (addressList.length >= 3 && currentEditedId === null) {
        setFormData(initialAddressFormData);
        toast({
          title: "You can add max 3 addresses",
          variant: "destructive",
        });
  
        return;
      }
  
      currentEditedId !== null
        ? dispatch(
            editAddress({
              userId: user?.id,
              addressId: currentEditedId,
              formData,
            })
          ).then((data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllAddress(user?.id));
              setCurrentEditedId(null);
              setFormData(initialAddressFormData);
              toast({
                title: "Address updated successfully",
              });
            }
          })
        : dispatch(
            addAddress({
              ...formData,
              userId: user?.id,
            })
          ).then((data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllAddress(user?.id));
              setFormData(initialAddressFormData);
              toast({
                title: "Address added successfully",
              });
            }
          });
    }
  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllAddress(user?.id));
    }
  }, [dispatch, user]);

  const handleDeleteAddress = (getCurrentAddress) => {
   dispatch(deleteAddress({userId:user?.id,addressId:getCurrentAddress?._id})).then(data=>{
    if(data.payload.success) {
    dispatch(fetchAllAddress(user?.id))
   }});
    // Consider dispatching a delete action and updating state here
  };
  const handleEditAddress = (getCurrentAddress) => {
    setCurrentEditedId(getCurrentAddress._id);
    setFormData({
        ...formData,
        address: getCurrentAddress?.address,
        city: getCurrentAddress?.city,
        pincode: getCurrentAddress?.pincode, 
        phone: getCurrentAddress?.phone,
        notes: getCurrentAddress?.notes,
    });
  };
  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList?.length > 0 ? (
          addressList.map(singleAddressItem => (
            <AddressCard 
            selectedId={selectedId}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
              key={singleAddressItem._id} 
              handleDeleteAddress={handleDeleteAddress} 
              handleEditAddress={handleEditAddress}
              addressInfo={singleAddressItem}  
            />
          ))
        ) : (
          <p>No addresses found. Add a new address below.</p>
        )}
      </div>
      <CardHeader>
        <CardTitle>{
            currentEditedId? "Edit Address" : "Add New Address"  
            // Display different text based on current editing status
            }</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CommonForm 
          formControls={addressFormControls} 
          formData={formData} 
          setFormData={setFormData} 
          buttonText={ currentEditedId? "Edit " : "Add "  }
          onSubmit={handleManageAddress} 
          isBtnDisabled={!isFormValid()} 
        />
      </CardContent>
    </Card>
  );
}
