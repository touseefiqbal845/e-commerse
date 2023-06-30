import React, {useState} from 'react';
import { CartState } from '../context/Context';
import SingleProduct from './SingleProduct';
// import "./style.css";
import Filters from './Filters';
import styled from 'styled-components';
 

const ProductContainer = styled.div`
 header {
  display: block;
  text-align: center;
  font-size: 30px;
  margin: 10px 0;
}
  button {
    background-color: blue;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }

  button:active {
    background-color: red;
  }
cartitem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
  margin-bottom: 20px;
}

cartItemImg {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
}

cartItemDetail {
  display: flex;
  flex: 1;
  padding: 0 20px;
  flex-direction: column;
}

/* Home Page */

home {
  display: flex;
}

filters {
  background-color: #343a40;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 20%;
  margin: 10px;
  height: 86vh;
}

filters > span {
  padding-bottom: 20px;
}

title {
  font-size: 30px;
}

productContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

products {
  width: calc(33.33% - 20px);
  margin: 10px;
}


summary {
  width: 30%;
}

/* Media Queries */
@media (max-width: 771px) {
  filters {
    width: 40%;
    padding: 10px;
    margin: 5px;
  }

  filters > span {
    font-size: 10px;
  }

  title {
    font-size: 18px !important;
  }

  productContainer {
    width: 58%;
    padding: 0;
  }

  search {
    display: none !important;
  }

  products {
    width: 100%;
  }
}
`;
// Assuming Trusted component is imported here

const Homes = () => {
    const [buttonClicked, setButtonClicked] = useState(false);
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
       <ProductContainer>
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((prod) => (
          <SingleProduct prod={prod} key={prod.id} />
        ))}
      </div>
     
    </div>
     </ProductContainer>
  );
};

export default Homes;
