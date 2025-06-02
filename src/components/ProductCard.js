import React from 'react';

const ProductCard = ({ name, price, image }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
      <img src={image} alt={name} width="200" />
      <h4>{name}</h4>
      <p>₹{price}</p>
    </div>
  );
};

export default ProductCard;
