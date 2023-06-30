import React from "react";
import { Card, Button } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../context/Context";
import styled from "styled-components";
import "./style.css";

const ProductCard = styled(Card)`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 8px;
  margin-bottom: 20px;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled(Card.Img)`
  object-fit: cover;
  height: 200px;
  width:331px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const ProductCardBody = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
`;

const ProductTitle = styled(Card.Title)`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ProductSubtitle = styled(Card.Subtitle)`
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
`;

const AddToCartButton = styled(Button)`
  background-color: #555;
  border-color: #555;
  padding: 5px 10px;
  font-size: 14px;
  width: 100%;
  margin-top: auto;

  &:hover {
    background-color: #333;
    border-color: #333;
  }
`;

const RemoveFromCartButton = styled(Button)`
  background-color: #dc3545;
  border-color: #dc3545;
  padding: 5px 10px;
  font-size: 14px;
  width: 100%;
  margin-top: auto;

  &:hover {
    background-color: #c82333;
    border-color: #c82333;
  }
`;

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const isInCart = cart.some((p) => p.id === prod.id);

  return (
    <div className="products">
      <ProductCard>
        <ProductImage variant="top" src={prod.image} alt={prod.name} />
        <ProductCardBody>
          <ProductTitle>{prod.name}</ProductTitle>
          <ProductSubtitle>
            <span>₹ {prod.price.split(".")[0]}</span>
            {prod.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days delivery</div>
            )}
            <Rating rating={prod.ratings} />
          </ProductSubtitle>
          {isInCart ? (
            <RemoveFromCartButton
              variant="danger"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                })
              }
            >
              Remove from Cart
            </RemoveFromCartButton>
          ) : (
            <AddToCartButton
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                })
              }
              disabled={!prod.inStock}
            >
              {!prod.inStock ? "Out of Stock" : "Add to Cart"}
            </AddToCartButton>
          )}
        </ProductCardBody>
      </ProductCard>
    </div>
  );
};

export default SingleProduct;
