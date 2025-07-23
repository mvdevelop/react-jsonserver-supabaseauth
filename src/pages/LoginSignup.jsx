
import React, { useState } from 'react';
import supabase from '../supabaseClient';

import './styles/LoginSignup.css';

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signIn({
          email,
          password,
        });
        if (error) {
          setError(error.message);
        } else {
          console.log('Login realizado com sucesso!');
          // Redirecione o usuário para a página principal
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) {
          setError(error.message);
        } else {
          console.log('Cadastro realizado com sucesso!');
          // Redirecione o usuário para a página de login
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  return (
    <div className='loginsignup-container'>
        <div className='w-100 text-center'>
            <h2 className='font-bold'>Religions.com</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque odio inventore vero qui tenetur sequi eius impedit consequatur voluptates dicta cupiditate nulla, velit, adipisci, saepe vel ex nemo incidunt reprehenderit.</p>
        </div>
        <div className='loginsignup-box w-100'>
            <h1 className='font-bold'>{isLogin ? 'Login' : 'Cadastro'}</h1>
            <form className='' onSubmit={handleSubmit}>
                {isLogin ? (
                <>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <br />
                    <label>Senha:</label>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </>
                ) : (
                <>
                    <label>Nome:</label>
                    <input type="text" value={nome} onChange={(event) => setNome(event.target.value)} />
                    <br />
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <br />
                    <label>Senha:</label>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </>
                )}
                <button type="submit">{isLogin ? 'Login' : 'Cadastrar'}</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <p>
            {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-pill' onClick={handleToggle}>{isLogin ? 'Cadastrar' : 'Login'}</button>
            </p>
        </div>
    </div>
  );
}
