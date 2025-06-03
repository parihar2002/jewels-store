interface ProductProps {
    params: {
      slug: string;
    };
  }
  
  const mockProducts: Record<string, { name: string; description: string }> = {
    "gold-necklace": {
      name: "Gold Plated Necklace",
      description: "Elegant gold plated necklace for special occasions.",
    },
    "silver-earrings": {
      name: "Silver Dangle Earrings",
      description: "Trendy silver earrings with modern design.",
    },
  };
  
  export function generateMetadata({ params }: ProductProps) {
    const product = mockProducts[params.slug];
    return {
      title: product?.name || "Product",
      description: product?.description || "View product details",
    };
  }
  
  function ProductPage({ params }: ProductProps) {
    const product = mockProducts[params.slug];
    if (!product) return <p>Product not found</p>;
  
    return (
      <div>
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p>{product.description}</p>
      </div>
    );
  }
  
  export default ProductPage;