import express from "express";
import  {getCartItems,addToCart,removeFromCart} from '../actions/shoppingCartActions.js';
import {regAuth} from '../middlleware/auth.js';

const router=express.Router();

 router.route('/:id')
                  .get(regAuth,async(request,response)=>{
                    const {id}=request.params; //User Id
                      const shoppingCart=await getCartItems(id);
                      if(shoppingCart.length===0){
                        response.status(404).send('No items to show');
                        return;
                      }
                      const {cart}=shoppingCart[0];
                      response.send(cart);
                    })
                .post(regAuth,async(request,response)=>{
                      const {id}=request.params; //Product Id
                      const {userId}=request.body; //User Id
                      const result=await addToCart(id,userId);
                     response.send(result);
                  })
               .put(regAuth,async(request,response)=>{
                   const {id}=request.params; //Product Id
                   const {userId}=request.body;
                   const result=await removeFromCart(id,userId);
                   response.send(result);
               });

export const cartRouter=router;