import { createContext, useContext, useEffect, useReducer } from "react";
import faker from "faker";
import { cartReducer, productReducer } from "./Reducer";

export const Cart = createContext();
faker.seed(99);

const Context = ({ children }) => {
  const products = [...Array(24)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: "/shoe1.jpg", // Replace "/shoe1.jpg" with the actual path to your image file in the public folder
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: getCartFromLocalStorage(), // Retrieve cart from local storage
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart)); // Store cart in local storage
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem("productState", JSON.stringify(productState)); // Store productState in local storage
  }, [productState]);

  function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  }

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
