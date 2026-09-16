import React, { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import './styles/Header.css';

// Use environment variable instead of hardcoded localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

interface User {
  id: string;
  name: string;
}

const Header: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_BASE_URL}/users`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: User[]) => setUsers(data))
      .catch((err: Error) => {
        if (err.name === 'AbortError') return;
        setError('Falha ao carregar usuários.');
      });

    return () => controller.abort();
  }, [API_BASE_URL]);

  return (
    <header className="bg-gray-800 flex items-center justify-around text-white">
      <div className="text-lg font-semibold">Religions.com</div>
      <nav className="hidden md:flex space-x-4">
        <a href="#" className="hover:text-blue-500">Home</a>
        <a href="#" className="hover:text-blue-500">Content</a>
        <a href="#" className="hover:text-blue-500">Contact</a>
        <a href="#" className="hover:text-blue-500">Extra</a>
      </nav>
      <div>
        <input
          className="bg-white text-black"
          type="text"
          aria-label="Search"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-pill">
          Search
        </button>
      </div>
      <div className="user flex items-center">
        <FaRegUser />
        {users.map((item) => (
          <p key={item.id}>{item.name}</p>
        ))}
      </div>
      <button className="md:hidden text-gray-600 hover:text-blue-500">Menu</button>
      {error && (
        <span className="error-indicator" style={{ color: 'red' }} title={error}>
          !
        </span>
      )}
    </header>
  );
};

export default Header;
