const db = require('../../config/db');

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await db('admins').select('id', 'email', 'created_at');
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching admins', error: err.message });
  }
};

// Create admin
exports.createAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  try {
    const existing = await db('admins').where({ email }).first();
    if (existing) return res.status(409).json({ message: 'Email already exists' });
  const bcrypt = require('bcrypt');
    const hashed = await bcrypt.hash(password, 10);
    const [id] = await db('admins').insert({ email, password: hashed });
    res.status(201).json({ id, email });
  } catch (err) {
    res.status(500).json({ message: 'Error creating admin', error: err.message });
  }
};

// Update admin
exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  try {
    const updateData = {};
    if (email) updateData.email = email;
    if (password) {
  const bcrypt = require('bcrypt');
  updateData.password = await bcrypt.hash(password, 10);
    }
    const updated = await db('admins').where({ id }).update(updateData);
    if (!updated) return res.status(404).json({ message: 'Admin not found' });
    res.json({ message: 'Admin updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating admin', error: err.message });
  }
};

// Delete admin
exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db('admins').where({ id }).del();
    if (!deleted) return res.status(404).json({ message: 'Admin not found' });
    res.json({ message: 'Admin deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting admin', error: err.message });
  }
};
