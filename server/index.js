import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import cors from 'cors';
import { productsRouter } from "./routes/products.js";
import { usersRouter } from "./routes/users.js";
import { cartRouter } from "./routes/shoppingcart.js";

dotenv.config();

const app=express();
const PORT=process.env.PORT;
app.use(cors());
app.use(express.json());

async function createConnection(){
    const client=new MongoClient(process.env.Mongo_URL);
    await client.connect();
    console.log("MongoDB connected");
    return client;
}
const client= await createConnection();
app.get('/',(request,response)=>{
    response.send('Welcome to the Shopping Cart Server');
})

app.use('/shoppingcart',cartRouter);
app.use('/products',productsRouter);
app.use('/users',usersRouter);

app.listen(PORT,()=>{console.log("Server Connected")});

export {client};