const express=require('express')
const mongoose=require('mongoose')
const cookieParser=require('cookie-Parser')
const cors=require('cors')
mongoose.connect('mongodb+srv://arbinniroula21:Hello123@cluster0.er7tx.mongodb.net/')
.then(()=>{
    console.log("MONGODB connected")
})
.catch((error)=>
console.log(error))
const app=express()
const PORT=process.env.PORT||8000
app.use(
    cors({ origin:'http://localhost:5173/',
        methods:['GET','POST','DELETE','PUT'],
        allowedHeaders:[
            'Content-Type',
           ' Authorization',
           ' Cache-Control',
           ' Expires',
           ' Pragma'
        ]
    })
)
app.use(cookieParser())
app.use(express.json())
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})