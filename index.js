import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import usersRoute from "./routes/users.js"
import authRoute from "./routes/auth.js"


const app = express()
dotenv.config()

const connect = async () =>{
    try{
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB")

    }catch(error){
    throw error;
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected")
})

mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected")
})


app.get("/",(req,res)=>{
 res.send("hello first request")
})

app.use(express.json())

app.use(express.urlencoded({extended:false}));

app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);

app.use((err,req,res,next)=>{
return res.status(500).json("Hello error from handler!")
})


app.listen(8000, ()=>{
connect()
console.log("Connected to backend")
})

