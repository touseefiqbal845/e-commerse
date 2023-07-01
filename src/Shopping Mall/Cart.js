import { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import "./style.css";
import styled from "styled-components";

const CartContainer = styled.div`
 @media (max-width: 430px) {
  // position: static;
  //  display: flex;
  //  width: 100%;
  //  margin-top:100px;
  // padding: 20px;
  
  }


@media (max-width: 1000px) {
    flex-direction: row;
      display: flex;
  flex-direction: column;
  align-items: center;
  }
   @media (max-width: 1500px) {
   display: flex;
   width: 100%;
   margin-top:30px;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-around;

  .filterssummary{
    width:90%;

  }
  .
  }

`;

const CartItem = styled(ListGroup.Item)`

 @media (max-width: 360px) {
    flex-direction: row;
     display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom:2px;
    
 .cartimg {
  
    width: 64px;
    height: 70px;
    margin-left: 37px;
    margin-top: 60px;

    margin-left: -18px;
}


   
  }
@media (max-width: 430px) {
   flex-direction: row;
   
     display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom:2px;
    
 
 .cartimg {
  
    width: 64px;
    height: 70px;
    margin-left: 37px;
    margin-top: 60px;
      display: flex;
  align-items: center;
    margin-left: -57px;
}

   
  }
  @media (max-width: 1000px) {
   flex-direction: row;
     display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
   width: 100%;
    padding: 20px;
    // margin: 9px;
    margin-top:0px;
    
    margin-left: 72px;
    .btndlt{
       color: black;
  width: 25px;
  cursor: pointer;
    }
  .btndlt:hover {
      background-color: red;
    }
     .cartimg {
  

     margin-top: 60px;

}


   
  }
    @media (max-width: 1500px) {
      
    flex-direction: row;
     display: flex;
     font-size:10px;
  align-items: center;
  justify-content: center;
  margin-left:80px;
  gap: 13px;
  border-radius: 0%;
  
  }
`;


const TotalContainer = styled.div`


  @media (max-width: 430px) {



  }
  @media (max-width: 1000px) {
   display: flex;
   
    flex-direction: column;
     border-radius: 5%;
    border: solid black;

     width: 120%;
    //padding: 10px;
    // margin: 9px;
    margin-top:-55px;
    margin-right: 50px;
    margin-left: -100px;
    justify-content: center;
    text-align: center;
    margin-bottom: 50px;
    

  }


 @media (max-width: 1500px) {
 
  width: 50%;
  height: 60%;
  display: flex;
  background-color: #3b5998;
  flex-direction: column;
  
  justify-content: flex-start;
  margin-top: 0px;
  font-size: 40px;
  gap: 25px;
  margin:10px;
  border-radius: 1%;
  border: solid black;
  margin-right: 20px;
  margin-left: 250px;
  margin-bottom: 20px;
}

  

  @media (min-width: 1501px) {
    width: 200%;
  }
`;


const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedTotal = localStorage.getItem("total");

    if (storedCart) {
      dispatch({ type: "SET_CART", payload: JSON.parse(storedCart) });
    }

    if (storedTotal) {
      setTotal(Number(storedTotal));
    }
  }, [dispatch]);

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );

    localStorage.setItem("cart", JSON.stringify(cart)); // Store cart items in local storage
    localStorage.setItem("total", total); // Store total price in local storage
  }, [cart, total]);

  return (
    <CartContainer>
      <div className="home">
        <div className="productContainer">
          <ListGroup className="listgroup">
            {cart.map((prod) => (
              <CartItem key={prod.id}>
                <Col xs={12} md={2}>
                  <Image src={prod.image} alt={prod.name} className="cartimg" />
                </Col>
                <Col xs={12} md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col xs={6} md={2}>₹ {prod.price}</Col>
                <Col xs={6} md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col xs={6} md={2}>
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col xs={6} md={2}>
                  <Button
                    type="button"
                    className="btndlt"
                    variant="red"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </CartItem>
            ))}
          </ListGroup>
        </div>
        <div className="filterssummary">
          <TotalContainer>
            <span className="title">Subtotal ({cart.length}) items</span>
            <span className="sectitle" style={{ fontWeight: 500, fontSize: 25, color:' white' }}>Total: ₹ {total}</span>
            <Button type="button" disabled={cart.length === 0}>
              Proceed to Checkout
            </Button>
          </TotalContainer>
        </div>
      </div>
    </CartContainer>
  );
};

export default Cart;