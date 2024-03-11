import './App.css';
import Navbar from './Comp/Navbar/Navbar';
import {BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Shop from './Context/Pages/Shop';
import ShopCategory from './Context/Pages/ShopCategory';
import Product from './Context/Pages/Product';
import Cart from './Context/Pages/Cart';
import LoginSignup from './Context/Pages/LoginSignup';
import Footer from './Comp/Footer/Footer';
import men_banner from './Comp/Assets/banner_mens.png'
import women_banner from './Comp/Assets/banner_women.png'
import kid_banner from './Comp/Assets/banner_kids.png'

function App() {
  return (
    <Router>
    <div>
      <Navbar/>
      <Routes>
         <Route exact path='/' element={<Shop/>} />
         <Route exact path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
         <Route exact path='/womens' element={<ShopCategory banner={women_banner} category="women"/>} />
         <Route exact path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>} />
         <Route exact path='/product' element= {<Product/>}>
          <Route exact path=':productId' element ={<Product/>} />
         </Route>
         <Route exact path='/cart' element={<Cart />} />
         <Route exact path='/login' element={<LoginSignup/>} />
      </Routes>
      
    </div>
    <Footer/>
    </Router>
    
  );
}

export default App;
