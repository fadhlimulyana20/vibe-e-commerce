
import React, { useEffect, useState } from "react";

const API_URL = "/api/categories";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError("Gagal memuat kategori");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Gagal menyimpan kategori");
      setForm({ name: "", description: "" });
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleEdit = (cat) => {
    setForm({ name: cat.name, description: cat.description || "" });
    setEditingId(cat.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus kategori ini?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus kategori");
      fetchCategories();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Manajemen Kategori Produk</h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-8 flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mb-8">
          <input
            type="text"
            name="name"
            placeholder="Nama Kategori"
            value={form.name}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
          <textarea
            name="description"
            placeholder="Deskripsi (opsional)"
            value={form.description}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {editingId ? "Update" : "Tambah"}
            </button>
            {editingId && (
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                onClick={() => { setEditingId(null); setForm({ name: "", description: "" }); }}
                disabled={loading}
              >
                Batal
              </button>
            )}
          </div>
        </form>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="w-full">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Nama</th>
                  <th className="p-2 border">Deskripsi</th>
                  <th className="p-2 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr><td colSpan="3" className="text-center p-4">Belum ada kategori</td></tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat.id}>
                      <td className="p-2 border">{cat.name}</td>
                      <td className="p-2 border">{cat.description}</td>
                      <td className="p-2 border flex gap-2 justify-center">
                        <button
                          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                          onClick={() => handleEdit(cat)}
                          disabled={loading}
                        >Edit</button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          onClick={() => handleDelete(cat.id)}
                          disabled={loading}
                        >Hapus</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
