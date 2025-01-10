import { Label } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

function AddressCard({addressInfo,handleDeleteAddress,handleEditAddress,setCurrentSelectedAddress,selectedId}) {
  
  return (
    <Card className={`cursor-pointer border-red-700 ${selectedId === addressInfo?._id ? 'border-green-500 border-[4px]':'border-black'}`} onClick={setCurrentSelectedAddress?()=>setCurrentSelectedAddress(addressInfo):null}>
        <CardContent className='grid gap-4 p-4 shadow-md'>
         <Label>Address:{addressInfo?.address}</Label>
         <Label>City:{addressInfo?.city}</Label> 
         <Label>Pincode:{addressInfo?.pincode}</Label>
         <Label>Phone{addressInfo?.phone}</Label>
         <Label>Notes:{addressInfo?.notes}</Label>
         <CardFooter className=' p-3 flex justify-between'>
          <Button onClick={()=>handleEditAddress(addressInfo)}>Edit</Button>
          <Button onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>
          
        </CardFooter>
        </CardContent>
       
    </Card>
  );
};

export default AddressCard;