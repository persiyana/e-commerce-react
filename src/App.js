import './App.css';
import React, { useState, useEffect } from "react";
import apiKey from './asos-apiKey';

function App() {
  const [products, setProducts] = useState([]);

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
    const pr = await response.json();
    const categoryName = pr.categoryName;
    const products = pr.products;
    setProducts(products);
    console.log(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main>
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



