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
    const alreadyInCart = addedProducts.find(p => p.name === product.name);

    if (alreadyInCart) {
      updateProductQuantity(product.name);
    } else {
      setAddedProducts(curr => [...curr, { ...product, quantity: 1 }]);
    }
  }

  const updateProductQuantity = (productName) => { //productName == prodotto da cercare
    setAddedProducts((prev) =>
      prev.map((p) =>
        p.name === productName
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
  };

  return (
    <div>
      <h2>Lista Prodotti</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.price.toFixed(2)}€
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
                  {product.name} – {product.price.toFixed(2)} € - quantità: {product.quantity} - totale: {(product.price * product.quantity).toFixed(2)}€
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
