import React from 'react';
import ProductCard from './productcard';

const products = [
  { id: 1, name: 'Gold Necklace', price: 1500, image: '/assets/gold.jpg' },
  { id: 2, name: 'Diamond Ring', price: 3000, image: '/assets/diamond.jpg' },
];

const ProductList = () => {
  return (
    <div>
      <h3>Our Collection</h3>
      <div style={{ display: 'flex', gap: '20px' }}>
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
