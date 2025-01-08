import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/orderslice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

  


export default  function PaypalReturn() {
    const dispatch=useDispatch()
    const location=useLocation()
    const params=new URLSearchParams(location.search)
    const payerId=params.get('PayerID')
    useEffect(()=>{
   if(payerId){
    const orderId=JSON.parse(sessionStorage.getItem('currentOrderId'));
    dispatch(capturePayment({payerId, orderId  })).then(data =>{
        if(data?.payload?.success){
            sessionStorage.removeItem('currentOrderId');
            window.location.href='/shop/payment-success'
        }
    })
   }
     } ,[payerId,dispatch])
  return (
<Card>
      <CardHeader>
        <CardTitle>Processing payment please wait!!</CardTitle>
      </CardHeader>
</Card>
  );
};

