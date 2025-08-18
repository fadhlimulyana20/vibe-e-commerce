
import React, { useEffect, useState } from "react";
import { fetchAdmins, createAdmin, updateAdmin, deleteAdmin } from "./apiAdmin";

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });
  const [editId, setEditId] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  const loadAdmins = async () => {
    setLoading(true);
    try {
      const data = await fetchAdmins();
      setAdmins(data);
      setError("");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateAdmin(editId, form);
      } else {
        await createAdmin(form);
      }
      setForm({ email: "", password: "" });
      setEditId(null);
      setFormVisible(false);
      loadAdmins();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (admin) => {
    setForm({ email: admin.email, password: "" });
    setEditId(admin.id);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this admin?")) return;
    try {
      await deleteAdmin(id);
      loadAdmins();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAdd = () => {
    setForm({ email: "", password: "" });
    setEditId(null);
    setFormVisible(true);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Admin Management</h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-8 flex flex-col items-center">
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleAdd}
        >
          Tambah Admin
        </button>
        {formVisible && (
          <form
            className="w-full max-w-md mb-6 bg-gray-50 p-4 rounded border"
            onSubmit={handleSubmit}
          >
            <div className="mb-2">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Password {editId && <span className="text-xs text-gray-400">(Isi jika ingin ganti password)</span>}</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
                required={!editId}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {editId ? "Update" : "Tambah"}
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => { setFormVisible(false); setEditId(null); }}
              >
                Batal
              </button>
            </div>
          </form>
        )}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full text-left border mt-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">ID</th>
                <th className="p-2">Email</th>
                <th className="p-2">Created At</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="border-t">
                  <td className="p-2">{admin.id}</td>
                  <td className="p-2">{admin.email}</td>
                  <td className="p-2">{new Date(admin.created_at).toLocaleString()}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                      onClick={() => handleEdit(admin)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(admin.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminManagement;
