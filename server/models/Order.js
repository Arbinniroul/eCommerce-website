const mongoose = require('mongoose');
const orderSchema=new mongoose.Schema(
    {
        userId:String,
        cartId:String,
        cartItems:[{
            productId:String,
            title:String,
            image:String,
            price:String,
            quantity:String,
            totalStock:String,     
        }],
        addressInfo:{
            addressId:String,
            address:String,
            city:String,
            pincode:String,
            phone:String,
            notes:String
        },
        orderStatus:String,
        paymentMethod:String,
        paymentStatus:String,
        totalAmount:Number,
        orderDate:Date,
        orderUpdateDate:Date,
        payerId:String,
    }
)

module.exports=mongoose.model('Order',orderSchema);