import { useState, useReducer } from "react";

const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];

const productReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const alreadyInCart = state.find(p => p.name === action.payload.name);
      if (alreadyInCart) {
        return state.map(p =>
          p.name === action.payload.name
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    }

    case 'UPDATE_QUANTITY': {
      const quantity = Math.floor(action.payload.quantity);
      if (quantity < 1) {
        return state.filter(p => p.name !== action.payload.name);
      }
      return state.map(p =>
        p.name === action.payload.name
          ? { ...p, quantity }
          : p
      );
    }

    case 'REMOVE_PRODUCT': {
      return state.filter(p => p.name !== action.payload.name);
    }

    default:
      return state;
  }
};


const ProductList = () => {
  // const [addedProducts, setAddedProducts] = useState([]);
  const [addedProducts, dispatchProduct] = useReducer(productReducer, []);

  const addToCart = (products) => {
    dispatchProduct({ type: 'ADD_PRODUCT', payload: products });
  }
  const updateProductQuantity = (productName, quantity) => { dispatchProduct({ type: 'UPDATE_QUANTITY', payload: { productName, quantity } }) }

  const removeFromCart = (productName) => { dispatchProduct({ type: 'REMOVE_PRODUCT', payload: { name: productName } }) }
  // const addToCart = (product) => {
  //   const alreadyInCart = addedProducts.find(p => p.name === product.name);

  //   if (alreadyInCart) {
  //     updateProductQuantity(product.name);
  //   } else {
  //     setAddedProducts(curr => [...curr, { ...product, quantity: 1 }]);
  //   }
  //}

  // const updateProductQuantity = (productName, quantity) => { //productName == prodotto da cercare
  //   const quantityChange = Math.floor(quantity);
  //   if (quantityChange < 1) {
  //     removeFromCart(productName);
  //     return;
  //   }
  //   setAddedProducts((prev) =>
  //     prev.map((p) =>
  //       p.name === productName
  //         ? { ...p, quantity: quantityChange }
  //         : p
  //     )
  //   );
  // };

  // const removeFromCart = (productName) => {
  //   setAddedProducts(prev =>
  //     prev.filter(p => p.name !== productName)
  //   );
  // };


  return (
    <div className="container">
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

      <div className="py-5">
        <h3>Prodotti nel carrello:</h3>
        {addedProducts.length > 0 && (
          <div className="">
            <ul>
              {addedProducts.map((product, index) => (
                <li key={index}>
                  {product.name} – {product.price.toFixed(2)} €
                  <label>Quantità: </label>
                  <input
                    type="number"
                    min="1"
                    value={product.quantity}
                    onChange={(e) => updateProductQuantity(product.name, e.target.value)}
                  />
                  Totale: {(product.price * product.quantity).toFixed(2)}€
                  <button className='btn-remove' onClick={() => removeFromCart(product.name)}>Rimuovi dal carrello</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-around">
        <h4>Totale carrello</h4>
        <div>
          <p>
            {addedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)} €
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
