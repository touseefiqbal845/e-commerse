import React, {useState} from 'react';
import { CartState } from '../context/Context';
import SingleProduct from './SingleProduct';
import "./style.css";
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
@media (max-width: 300px) {
    flex-direction: row;
    align-items: center;
.home{
      width: 69%;
    padding: 10px;
    margin: 9px;
    margin-top:12px;

    }

    .productContainer {
      order: 2;
      width: 100%;
      padding: 0;
      margin-bottom: 0px;
      margin-top: 500px;
}
    }

    .cartItemImg {
      width: 50%;
      height: auto;
      max-width: 150px;
      max-height: 150px;
      object-fit: cover;
      margin-bottom: 10px;
    }
  }
/* Media Queries */
  @media (max-width: 450px) {
    flex-direction: row;
    align-items: center;

    filters {
      order: 1;
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
  
   
    }
    .home{
      width: 69%;
    padding: 10px;
    margin: 9px;
    margin-top:12px;

    }

    .productContainer {
      order: 2;
      width: 100%;
      padding: 0;
      margin-bottom: 0px;
      margin-top: 500px;
}
    }

    .cartItemImg {
      width: 30%;
      height: auto;
      max-width: 100px;
      max-height: 100px;
      backgound-color: blue;
     
      margin-bottom: 10px;
    }
  }

  /* Media Queries */
  @media (max-width: 500px) {
    flex-direction: row;
    align-items: center;

    filters {
      order: 1;
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
  
   
    }
    .home{
      width: 69%;
    padding: 10px;
    margin: 9px;
    margin-top:12px;

    }

    .productContainer {
      order: 2;
      width: 100%;
      padding: 0;
      margin-bottom: 0px;
      margin-top: 500px;
}
    }

    .cartItemImg {
      width: 50%;
      height: auto;
      max-width: 150px;
      max-height: 150px;
      object-fit: cover;
      margin-bottom: 10px;
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
       <ProductContainer className="mobile">
    <div className="home">
      
      <Filters  />

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
