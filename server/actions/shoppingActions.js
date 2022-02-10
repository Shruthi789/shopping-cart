import { ObjectId } from 'mongodb';
import {client} from '../index.js';

function getProducts(params){
    return client.db('shoppingDB').collection('products').find(params).toArray();
}

function addProducts(products){
    return client.db('shoppingDB').collection('products').insertMany(products);
}
function getCategories() {
    return client.db('shoppingDB').collection('products').distinct('category');
  }

function getProduct(id){
    return client.db('shoppingDB').collection('products').findOne({_id:ObjectId(id)});
}
function editProduct(id,prodData){
    return client.db('shoppingDB').collection('products').updateOne({_id:ObjectId(id)},{$set:prodData});
}
function deleteProduct(id){
    return client.db('shoppingDB').collection('products').deleteOne({_id:ObjectId(id)});
}

export {getProducts,addProducts,getProduct,editProduct,deleteProduct,getCategories};