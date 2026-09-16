import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginSignup from '../pages/LoginSignup';

// Mock supabase client
const mockSignInWithPassword = vi.fn();
const mockSignUp = vi.fn();

vi.mock('../supabaseClient', () => ({
  default: {
    auth: {
      signInWithPassword: mockSignInWithPassword,
      signUp: mockSignUp,
    },
  },
}));

describe('LoginSignup', () => {
  beforeEach(() => {
    mockSignInWithPassword.mockClear();
    mockSignUp.mockClear();
  });

  it('renders login form by default', () => {
    render(<LoginSignup />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('switches to signup form when toggle button clicked', () => {
    render(<LoginSignup />);

    const toggleButton = screen.getByRole('button', { name: 'Cadastrar' });
    fireEvent.click(toggleButton);

    expect(screen.getByText('Cadastro')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome completo')).toBeInTheDocument();
  });

  it('validates email format before submitting', async () => {
    render(<LoginSignup />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Email inválido.')).toBeInTheDocument();
    expect(mockSignInWithPassword).not.toHaveBeenCalled();
  });

  it('validates password minimum length', async () => {
    render(<LoginSignup />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText('A senha deve ter pelo menos 6 caracteres.')
    ).toBeInTheDocument();
    expect(mockSignInWithPassword).not.toHaveBeenCalled();
  });

  it('calls signInWithPassword with valid credentials', async () => {
    mockSignInWithPassword.mockResolvedValueOnce({ error: null });

    render(<LoginSignup />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('displays error message when login fails', async () => {
    mockSignInWithPassword.mockResolvedValueOnce({
      error: { message: 'Invalid credentials' },
    });

    render(<LoginSignup />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText('Falha no login. Verifique suas credenciais.')
    ).toBeInTheDocument();
  });

  it('masks error messages to not expose Supabase internals', async () => {
    mockSignInWithPassword.mockResolvedValueOnce({
      error: { message: 'Auth sign-in failed: user-not-found' },
    });

    render(<LoginSignup />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Should NOT expose the actual Supabase error message
    const errorElement = await screen.findByText(
      'Falha no login. Verifique suas credenciais.'
    );
    expect(errorElement).toBeInTheDocument();
    expect(screen.queryByText('user-not-found')).not.toBeInTheDocument();
  });
});
