import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from API (replace with your actual endpoint)
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // Fungsi format harga ke Rupiah
  const formatRupiah = (angka) => {
    if (!angka) return '-';
    return 'Rp ' + parseInt(angka, 10).toLocaleString('id-ID');
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center tracking-wide">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col items-center"
            >
              <img
                src={product.image_url || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold mb-2 text-center">{product.name}</h3>
              <p className="text-gray-700 font-medium text-center">{formatRupiah(product.price)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
