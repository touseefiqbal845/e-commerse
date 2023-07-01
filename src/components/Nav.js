import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { Button, Col, Form, Image, ListGroup, Row, Badge } from "react-bootstrap";
import { CgMenu, CgClose } from "react-icons/cg";
import { CartState } from "../context/Context";
import Cart from "../Shopping Mall/Cart";

const Nav = () => {
  const [menuIcon, setMenuIcon] = useState(false);
  const navigate = useNavigate();
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const NavContainer = styled.nav`
    .navbar-lists {
      display: flex;
      gap: 4.8rem;
      align-items: center;

      .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.8rem;
          font-weight: 500;
          text-transform: uppercase;
          color: ${({ theme }) => theme.colors.black};
          transition: color 0.3s linear;
        }

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
        }
      }
    }

    .mobile-navbar-btn {
      display: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }

    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }

    .close-outline {
      display: none;
    }

    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 3.2rem;
      }

      .cart-total--item {
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        background-color: #000;
        color: #000;
        border-radius: 50%;
        display: grid;
        place-items: center;
        top: -20%;
        left: 70%;
        background-color: ${({ theme }) => theme.colors.helper};
      }
    }

    .user-login--name {
      text-transform: capitalize;
    }

    .user-logout,
    .user-login {
      font-size: 1.4rem;
      padding: 0.8rem 1.4rem;
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${({ theme }) => theme.colors.black};

        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }

      .active .mobile-nav-icon {
        display: none;
        font-size: 4.2rem;
        position: absolute;
        top: 30%;
        right: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }

      .active .close-outline {
        display: inline-block;
      }

      .navbar-lists {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        visibility: hidden;
        opacity: 0;
        transform: translateX(100%);
        /* transform-origin: top; */
        transition: all 3s linear;
         width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: flex-end; /* Align items to the bottom of the container */
  align-items: center;
  flex-direction: column;
      }

      .active .navbar-lists {
        visibility: visible;
        opacity: 8;
        transform: translateX(0);
        z-index: 999;
        transform-origin: right;
        transition: all 3s linear;

        .navbar-link {
          font-size: 4.2rem;
        }
      }
      .cart-trolley--link {
        position: relative;

        .cart-trolley {
          position: relative;
          font-size: 5.2rem;
        }

        .cart-total--item {
          width: 4.2rem;
          height: 4.2rem;
          font-size: 2rem;
        }
      }

      .user-logout,
      .user-login {
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
  `;

 return (
    <NavContainer>
      {menuIcon && <Cart />} {/* Render the Cart component if the menu is active */}
      <div className={menuIcon ? "navbar active" : "navbar"}>
        <ul className="navbar-lists" style={{}}>
           {/* <li>
            <NavLink
              to="/cart"
              className="navbar-link cart-trolley--link"
              onClick={() => {
                setMenuIcon(false);
                
                navigate("/cart"); // Use navigate function to navigate to "/cart" route
              }}
            >
              <FiShoppingCart className="cart-trolley" />
              <Badge className="cart-badge">{cart.length}</Badge>
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to="/"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className="navbar-link cart-trolley--link"
              onClick={() => {
                setMenuIcon(false);
                navigate("/cart"); // Use navigate function to navigate to "/cart" route
              }}
            >
              <FiShoppingCart className="cart-trolley" />
              <Badge className="cart-badge">{cart.length}</Badge>
            </NavLink>
          </li>
        </ul>

        {/* Buttons to open and close the menu */}
        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setMenuIcon(true)}
          />
          <CgClose
            name="close-outline"
            className="mobile-nav-icon close-outline"
            onClick={() => setMenuIcon(false)}
          />
        </div>
      </div>
    </NavContainer>
  );
};

export default Nav;