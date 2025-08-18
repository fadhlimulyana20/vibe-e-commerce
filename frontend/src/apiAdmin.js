const API_URL = '/api/admins';

export async function fetchAdmins() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch admins');
  return res.json();
}

export async function createAdmin(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create admin');
  return res.json();
}

export async function updateAdmin(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update admin');
  return res.json();
}

export async function deleteAdmin(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete admin');
  return res.json();
}
