import express from "express";
import  {getProducts,addProducts,getProduct,editProduct,deleteProduct,getCategories} from '../actions/shoppingActions.js';
import {adminAuth} from '../middlleware/auth.js';

const router=express.Router();

router.route('/')
               .get(async(request,response)=>{
                 const filterParams=request.query;
                 if(filterParams.rating){
                    filterParams.rating={$gte:(+filterParams.rating)};
                 }
                 const products=await getProducts(filterParams);
                 response.send(products);
               })
               .post(adminAuth,async(request,response)=>{
                  const productData=request.body;
                  const result=await addProducts(productData);
                  response.send(result);
               });

router.route('/categories')
               .get(async (request,response)=>{
                 const result=await getCategories();
                 response.send(result);
                 });

router.route('/:id')
              .get(async(request,response)=>{
                  const {id}=request.params;
                  const product=await getProduct(id);
                  product?response.send(product):response.status(404).send("Product not found");
              })
              .put(adminAuth,async(request,response)=>{
                  const {id}=request.params;
                  const productData=request.body;
                  const result=await editProduct(id,productData);
                  response.send(result);
              })
              .delete(adminAuth,async(request,response)=>{
                  const {id}=request.params;
                  const result=await deleteProduct(id);
                  response.send(result);
              });

export const productsRouter=router;