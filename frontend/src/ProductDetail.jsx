import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const formatRupiah = (angka) => {
  if (!angka) return '-';
  return 'Rp ' + parseInt(angka, 10).toLocaleString('id-ID');
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetch(`/api/products/${id}`).then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      }),
      fetch('/api/products').then((res) => res.json())
    ])
      .then(([productData, allProducts]) => {
        setProduct(productData);
        // Filter related: produk lain, max 4
        setRelated(allProducts.filter(p => p.id !== Number(id)).slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!product) return null;

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-10">
        {/* Left: Images */}
        <div className="flex-1 flex flex-col gap-4">
          <img
            src={product.image_url || "https://via.placeholder.com/400x400"}
            alt={product.name}
            className="w-full h-96 object-cover rounded shadow"
          />
          {/* Thumbnail gallery (dummy) */}
          <div className="flex gap-2 mt-2">
            {[1,2,3].map((i) => (
              <div key={i} className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                <img src={product.image_url || "https://via.placeholder.com/80x80"} alt="thumb" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        {/* Right: Info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-xl font-semibold text-gray-700 mb-2">{formatRupiah(product.price)}</div>
          <div className="mb-4 text-gray-600">{product.description || 'No description.'}</div>
          {/* Color/size options (dummy) */}
          <div className="flex gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Color</div>
              <div className="flex gap-2">
                <span className="w-6 h-6 rounded-full bg-gray-300 border"></span>
                <span className="w-6 h-6 rounded-full bg-gray-400 border"></span>
                <span className="w-6 h-6 rounded-full bg-gray-200 border"></span>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Size</div>
              <div className="flex gap-2">
                <span className="px-2 py-1 border rounded">S</span>
                <span className="px-2 py-1 border rounded">M</span>
                <span className="px-2 py-1 border rounded">L</span>
              </div>
            </div>
          </div>
          <button className="bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition mb-2">Add to Cart</button>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>In stock</span>
            <span>|</span>
            <span>Free shipping</span>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 mt-6 flex justify-center">
        <Link
          to="/products"
          className="mt-4 bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition"
        >
          Lihat Produk Lainnya
        </Link>
      </div>
      {/* Related products */}
      <div className="max-w-5xl mx-auto mt-12 px-4">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        {related.length === 0 ? (
          <div className="text-gray-500">No related products.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((item) => (
              <Link
                to={`/products/${item.id}`}
                key={item.id}
                className="bg-gray-50 rounded-lg shadow p-4 flex flex-col items-center hover:ring-2 hover:ring-black"
              >
                <img src={item.image_url || "https://via.placeholder.com/100x100"} alt={item.name} className="w-24 h-24 object-cover rounded mb-2" />
                <div className="text-sm font-semibold">{item.name}</div>
                <div className="text-xs text-gray-500">{formatRupiah(item.price)}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
