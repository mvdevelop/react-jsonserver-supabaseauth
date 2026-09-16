import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

interface Religion {
  id: string;
  img: string;
  name: string;
}

const Content: React.FC = () => {
  // Supabase data fetched from 'religions' table (used for future features)
  const [error, setError] = useState<string | null>(null);
  const [religions, setReligions] = useState<Religion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const { error: supabaseError } = await supabase
          .from('religions')
          .select('*');

        if (supabaseError) {
          setError('Falha ao carregar dados.');
        }
      } catch {
        setError('Erro inesperado ao carregar dados.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, []);

  // Remove hardcoded localhost — use environment variable instead
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_BASE_URL}/religions`, { signal: controller.signal })
      .then((response) => response.json())
      .then((data: Religion[]) => setReligions(data))
      .catch(() => {
        // Silently handle — don't expose network errors to user
      });

    return () => controller.abort();
  }, [API_BASE_URL]);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h1>Content</h1>
      <div className="list-none">
        {religions.map((item) => (
          <li key={item.id}>
            <img className="w-100" src={item.img} alt={item.name} />
            <div>
              <h2>{item.name}</h2>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Content;
