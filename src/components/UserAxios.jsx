import React, { useState, useEffect } from 'react';
import './UserAxios.css';

const UserAxios = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: ''
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('users');
    if (stored) {
      setUsers(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, password, phone, city } = form;

    if (!name || !email || !password || !phone || !city) {
      alert('Please fill in all fields.');
      return false;
    }

    if (!email.endsWith('@gmail.com')) {
      alert('Email must end with @gmail.com');
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert('Phone number must be exactly 10 digits.');
      return false;
    }

    if (password.length !== 8) {
      alert('Password must be exactly 8 characters.');
      return false;
    }

    return true;
  };

  const addUser = () => {
    if (!validateForm()) return;

    const newUser = {
      ...form,
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1
    };

    const newUsers = [...users, newUser];
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
    setForm({ name: '', email: '', password: '', phone: '', city: '' });
    alert('User added successfully!');
  };

  const updateUser = () => {
    if (!validateForm()) return;

    const updatedUsers = users.map(user =>
      user.id === editingUserId ? { ...form, id: editingUserId } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setForm({ name: '', email: '', password: '', phone: '', city: '' });
    setEditingUserId(null);
    alert('User updated successfully!');
  };

  const deleteUser = (id) => {
    const filteredUsers = users.filter(user => user.id !== id);
    setUsers(filteredUsers);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
    alert('User deleted successfully!');
  };

  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      city: user.city
    });
    setEditingUserId(user.id);
  };

  return (
    <div className="container">
      <h1 className='head'>User Details</h1>

      <div className="input-group">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email (e.g. abc@gmail.com)" />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password (8 chars)" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (10 digits)" />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
      </div>

      <div className="button-group">
        <button onClick={editingUserId ? updateUser : addUser}>
          {editingUserId ? 'Update User' : 'Add User'}
        </button>
        <button onClick={() => setShowUsers(!showUsers)}>
          {showUsers ? 'Hide Users' : 'View Users'}
        </button>
      </div>

      {showUsers && (
        <div className="user-list">
          {users.map(user => (
            <div key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Password:</strong> {user.password}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>City:</strong> {user.city}</p>
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAxios;
