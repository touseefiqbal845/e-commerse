import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { FormControl, Dropdown, Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { Link, useLocation } from 'react-router-dom';
import { CartState } from '../context/Context';

function Header() {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md" style={{ height: 80 }}>
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Shopping Cart</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {useLocation().pathname.split("/")[1] !== "cart" && (
                <Navbar.Text className="search">
                  <FormControl
                    style={{ width: 500 }}
                    type="search"
                    placeholder="Search a product..."
                    className="m-auto"
                    aria-label="Search"
                    onChange={(e) => {
                      productDispatch({
                        type: "FILTER_BY_SEARCH",
                        payload: e.target.value,
                      });
                    }}
                  />
                </Navbar.Text>
              )}
              <Dropdown align="end">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  <FaShoppingCart className="cart-icon" />
                  {cart.length > 0 && (
                    <Badge className="cart-badge">{cart.length}</Badge>
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ minWidth: 370 }}>
                  {cart.length > 0 ? (
                    <>
                      {cart.map((prod) => (
                        <span className="cartitem" key={prod.id}>
                          <img
                            src={prod.image}
                            className="cartItemImg"
                            alt={prod.name}
                          />
                          <div className="cartItemDetail">
                            <span>{prod.name}</span>
                            <span>₹ {prod.price.split(".")[0]}</span>
                          </div>
                          <AiFillDelete
                            fontSize="20px"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: prod,
                              })
                            }
                          />
                        </span>
                      ))}
                      <Link to="/cart">
                        <Button style={{ width: "95%", margin: "0 10px" }}>
                          Go To Cart
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <span style={{ padding: 10 }}>Cart is Empty!</span>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
