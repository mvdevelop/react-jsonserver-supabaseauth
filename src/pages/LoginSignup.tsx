import React, { useState } from 'react';
import supabase from '../supabaseClient';
import './styles/LoginSignup.css';

interface LoginSignupProps {
  onAuthSuccess?: () => void;
}

const LoginSignup: React.FC<LoginSignupProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Rate limiting: simple cooldown to prevent brute-force
  const [lastAttempt, setLastAttempt] = useState<number>(0);
  const RATE_LIMIT_MS = 5000; // 5 seconds between attempts

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Input validation FIRST (security: validate before any processing)
    if (!validateEmail(email)) {
      setError('Email inválido.');
      return;
    }
    if (!validatePassword(password)) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // Rate limiting check (prevent brute-force attacks)
    const now = Date.now();
    if (now - lastAttempt < RATE_LIMIT_MS) {
      setError(`Aguarde ${Math.ceil((RATE_LIMIT_MS - (now - lastAttempt)) / 1000)}s antes de tentar novamente.`);
      return;
    }
    setLastAttempt(now);

    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          // Mask internal error details — don't leak Supabase internals
          setError('Falha no login. Verifique suas credenciais.');
        } else {
          onAuthSuccess?.();
        }
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: nome || undefined, // Only send if provided
            },
          },
        });
        if (signUpError) {
          setError('Falha no cadastro. Tente novamente.');
        } else {
          onAuthSuccess?.();
        }
      }
    } catch {
      // Generic error — never expose stack traces to users
      setError('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError(null);
    setEmail('');
    setPassword('');
    setNome('');
  };

  return (
    <div className="loginsignup-container">
      <div className="w-100 text-center">
        <h2 className="font-bold">Religions.com</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque odio
          inventore vero qui tenetur sequi eius impedit consequatur voluptates
          dicta cupiditate nulla, velit, adipisci, saepe vel ex nemo incidunt
          reprehenderit.
        </p>
      </div>
      <div className="loginsignup-box w-100">
        <h1 className="font-bold">{isLogin ? 'Login' : 'Cadastro'}</h1>
        <form className="" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label>Nome:</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                disabled={loading}
                aria-label="Nome completo"
              />
              <br />
            </>
          )}
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            aria-label="Email"
            required
          />
          <br />
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            aria-label="Senha"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Carregando...' : isLogin ? 'Login' : 'Cadastrar'}
          </button>
          {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        </form>
        <p>
          {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-pill"
            onClick={handleToggle}
            disabled={loading}
          >
            {isLogin ? 'Cadastrar' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
