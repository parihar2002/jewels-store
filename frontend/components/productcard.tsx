import React from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
      <img src={image} alt={name} width="200" />
      <h4>{name}</h4>
      <p>₹{price}</p>
    </div>
  );
};

export default ProductCard;
