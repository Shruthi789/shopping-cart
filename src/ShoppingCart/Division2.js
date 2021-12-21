import { ShoppingItemList } from "./ItemList.js"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Tooltip from '@mui/material/Tooltip';
import Rating from '@mui/material/Rating';
import { useContext,useState } from "react";
import {shoppingCart} from "../App";

function ShoppingCart(){
return <div className="card-gap">
        {ShoppingItemList.map((item,index)=> <ShoppingItem key={index} item={item}/>)}
    </div>
}
function ShoppingItem({item}){
const {name,image,rating,cost}=item;
const {upperlimit,lowerlimit}=cost;
const {cart,changeCart}=useContext(shoppingCart);
const [isAddDisabled,setAddDisabled]=useState(false);
const [isRemoveDisabled,setRemoveDisabled]=useState(true);
return <Card sx={{ minWidth: 300 }}>
     <CardMedia
        component="img"
        image={image}
        alt="shopping-item-image"
        className="card-image"
      />
    <CardContent>
      <h5>
        {name}
      </h5>
      <Rating name="read-only" value={rating} readOnly /> <br/>
       {lowerlimit!==0? `$${lowerlimit}-`:""}${upperlimit}
      </CardContent>
      <CardActions className="card-actions-align">
      <Tooltip title="Add to cart">
      <span>
      <IconButton aria-label="add to shopping cart" color="primary" onClick={()=>{changeCart(cart+1);setAddDisabled(!isAddDisabled);setRemoveDisabled(!isRemoveDisabled);}} disabled={isAddDisabled}>
          <AddShoppingCartIcon />
      </IconButton>
      </span>
      </Tooltip>
      <Tooltip title="Remove from cart">
      <span>
      <IconButton aria-label="remove from shopping cart" color="error" onClick={()=>{changeCart(cart-1);setAddDisabled(!isAddDisabled);setRemoveDisabled(!isRemoveDisabled);}} disabled={isRemoveDisabled}>
      <RemoveShoppingCartIcon />
      </IconButton>
      </span>
    </Tooltip>
    </CardActions>
  </Card>
  
}
export {ShoppingCart}