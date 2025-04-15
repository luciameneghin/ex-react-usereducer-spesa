import { useState } from "react";

const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];

const ProductList = () => {
  const [addedProducts, setAddedProducts] = useState([]);

  const addToCart = (product) => {
    setAddedProducts((prev) => {
      const alredyAdded = prev.find(p => p.name === product.name);
      if (alredyAdded) {
        return prev
      }
      return [...prev, { ...product, quantity: 1 }];
    })
  }


  return (
    <div>
      <h2>Lista Prodotti</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.price}€
            <button onClick={() => addToCart(product)} style={{ marginLeft: '10px' }}>
              Aggiungi al carrello
            </button>
          </li>
        ))}
      </ul>

      <div>
        <h3>Prodotti nel carrello:</h3>
        {addedProducts.length > 0 && (
          <div>
            <ul>
              {addedProducts.map((product, index) => (
                <li key={index}>
                  {product.name} – {product.price}€ x {product.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;


// const addToCart = (product) => {
//   setAddedProducts((prev) => {
//     const alreadyInCart = prev.find(p => p.name === product.name);
//     if (alreadyInCart) {
//       return prev; // Ignora se già presente
//     }
//     return [...prev, { ...product, quantity: 1 }];
//   });
// };