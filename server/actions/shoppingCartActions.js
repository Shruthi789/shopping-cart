import {client} from '../index.js';
import {ObjectId} from 'mongodb';
import  {getProduct} from './shoppingActions.js';

function getCartItems(id){
    return client.db('shoppingDB').collection('shoppingcart').find({userId:id}).project({cart:1}).toArray();
}
function getItemByUserId(id){
    return client.db('shoppingDB').collection('shoppingcart').findOne({userId:id});
}

async function addToCart(id,userId){
    const product=await getProduct(id);
    const user=await getItemByUserId(userId);
    if(!user){
    return client.db('shoppingDB').collection('shoppingcart').insertOne({userId,cart:[product]});
    }
    const shoppingCart=await getCartItems(userId);
    const {cart}=shoppingCart[0];
    return client.db('shoppingDB').collection('shoppingcart').updateOne({userId},{$set:{cart:[...cart,product]}});
}

async function removeFromCart(id,userId){
    const shoppingCart=await getCartItems(userId);
    const {cart}=shoppingCart[0];
    const newCart=cart.filter(({_id})=> !ObjectId(id).equals(_id));
    return client.db('shoppingDB').collection('shoppingcart').updateOne({userId},{$set:{cart:newCart}});
}

export {getCartItems,addToCart,removeFromCart}