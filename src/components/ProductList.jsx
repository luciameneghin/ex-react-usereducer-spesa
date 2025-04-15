const ProductList = () => {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  return (
    <div>
      <h2>Lista prodotti</h2>
      <ul>
        {products.map((product, index) =>
          <li key={index}>
            {product.name} a {product.price}€
          </li>)}
      </ul>
    </div>
  )
}

export default ProductList
