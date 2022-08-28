import './App.css';
import React, { useState, useEffect } from "react";
import apiKey from './asos-apiKey';



function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  let indexes = [];
  let productsTwenty = [];

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
    }
  };
  const url = 'https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4209&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US';

  const fetchProducts = async () => {
    const response = await fetch(url, options);
    const info = await response.json();
    const category = info.categoryName;
    const products = info.products;
    
    getRandomIndexes(products.length);
    getTwentyProducts(products);

    setCategory(category);
    setProducts(productsTwenty);

  };

  const getRandomIndexes = (numOfProducts) => {
      while (indexes.length < 20) {
          const index = Math.floor(Math.random() * numOfProducts);
          if (!indexes.includes(index)) {
              indexes.push(index);
              console.log(index);
          }
      }
  }
  const getTwentyProducts = (products) => {
    for (let index = 0; index < 20; index++) {

      productsTwenty[index]=products[indexes[index]];
      console.log(productsTwenty[index]);
      
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  
  return (
    <main>
      <h2 id="categoryName">&gt;&gt; {category}</h2>
      <ul>
        {products.map((prod) => (
          <li>
            <img src={"http://" + prod.imageUrl}/><br/>
            <p>{prod.name}</p><br/>
            <h4>{prod.price.current.text}</h4><br/><button type="button">Buy</button>
          </li>
        ))}
      </ul> 
    </main>
    
  );

}




export default App;



