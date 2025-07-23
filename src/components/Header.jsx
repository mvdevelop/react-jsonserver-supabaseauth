
import React, { useState, useEffect } from 'react';
import { FaRegUser } from "react-icons/fa";
//import supabase from '../supabaseClient';

import './styles/Header.css';

export default function Header() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }, []);

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
          <input className='bg-white text-black' type="text" />
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-pill'>Search</button>
        </div>
        <div className='user flex items-center'>
          <FaRegUser />
          {users.map(item => (
            <p key={item.id}>{item.name}</p>
          ))}
        </div>
        <button className="md:hidden text-gray-600 hover:text-blue-500">Menu</button>
    </header>
  )
}
