
import React, {createContext, useState} from "react";
import all_product from '../Comp/Assets/all_product'


export const ShopContext = createContext(null);
const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++) {
        cart[index]  = 0;
    } 
    return cart;
}
export const ShopContextProvider = (props) =>{

    const [all_product, setAll_Product] = useState([]);
    const [cartitems, setCartItems] = useState(getDefaultCart());

    // useEffect(()=>{
    //     fetch('http://localhost:4000/allproducts')
    //     .then((response)=>response.json())
    //     .then((data)=>setAll_Product(data))
    // },[])

    const addToCart = (itemId)=>{
        setCartItems((prev)=>({
            ...prev,[itemId]:prev[itemId]+1
        }))
        console.log(cartitems);
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }))
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartitems) {
            if (cartitems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id===Number(item))
                totalAmount += itemInfo.new_price * cartitems[item];
            }
        }
        return totalAmount;
    }
    const getTotalCartItems = ()=>{
        let totalItem = 0;
        for(const item in cartitems){
            if(cartitems[item]>0){
                totalItem+=cartitems[item];
            }
        }
        return totalItem;
    }
    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartitems, addToCart, 
        removeFromCart
    };

    return(
        <ShopContext.Provider value = {contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;