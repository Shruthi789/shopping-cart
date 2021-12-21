//import logo from './logo.svg';
import './App.css';
import { Navbar,NavbarBrand,NavbarToggler,Collapse,Nav,NavItem,NavLink,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem,NavbarText,Button,Badge} from 'reactstrap';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {FirstDivision} from "./ShoppingCart/Division1.js";
import {ShoppingCart} from "./ShoppingCart/Division2.js";
import {ThirdDivision} from "./ShoppingCart/Division3.js";
import {useState,createContext} from 'react';

const shoppingCart= createContext(0);

function App() {
  const [openBar, setOpenBar]=useState(false);  
  const [cart,changeCart]=useState(0);
  const obj={cart:cart,changeCart:changeCart};
  return (
    <shoppingCart.Provider value={obj}>
    <div className="App">
      <Navbar
    color="light"
    expand="md"
    light
  >
    <NavbarBrand href="/">
      My Shopping Cart
    </NavbarBrand>
    <NavbarToggler onClick={()=>{setOpenBar(!openBar)}} />
    <Collapse isOpen={openBar} navbar>
      <Nav
        className="me-auto"
        navbar
      >
        <NavItem>
          <NavLink href="/components/">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            About
          </NavLink>
        </NavItem>
        <UncontrolledDropdown
          inNavbar
          nav
        >
          <DropdownToggle
            caret
            nav
          >
            Shop
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem>
              All Products
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              Popular Items
            </DropdownItem>
            <DropdownItem>
              New Arrivals
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
      <NavbarText>
       <Button outline>
       <ShoppingCartIcon/> Cart 
       &nbsp;
       <Badge
        color="secondary"
        pill
       > {obj.cart}</Badge> 
      </Button>
      </NavbarText>
    </Collapse>
  </Navbar>
  <FirstDivision/>
  <ShoppingCart />
  <ThirdDivision />
    </div>
  </shoppingCart.Provider>
  );
}

export {App,shoppingCart};
