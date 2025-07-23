
import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

export default function Content() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: tableData, error } = await supabase
          .from('user')
          .select('*');
        if (error) {
          setError(error);
        } else {
          setData(tableData);
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/religions')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }, []);

  if (error) {
    return <div>Erro: {error.message}</div>;
  } else {
    {data}
  }

  return (
    <div>
      <h1>Content</h1>
      <div className='list-none'>
        {users.map(item => (
          <li key={item.id}>
              <img className='w-100' src={item.img} alt="" />
            <div>
              <h2>{item.name}</h2>
              <p>{item.ocupation}</p>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}
