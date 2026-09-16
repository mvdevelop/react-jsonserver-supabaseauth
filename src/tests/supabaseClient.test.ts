import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock environment variables for testing
beforeEach(() => {
  vi.stubEnv('VITE_SUPABASE_URL', 'https://test-project.supabase.co');
  vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'test-anon-key');
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe('supabaseClient', () => {
  it('throws error when VITE_SUPABASE_URL is missing', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', '');

    await expect(import('../supabaseClient')).rejects.toThrow(
      'Supabase credentials are missing'
    );
  });

  it('throws error when VITE_SUPABASE_ANON_KEY is missing', async () => {
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', '');

    await expect(import('../supabaseClient')).rejects.toThrow(
      'Supabase credentials are missing'
    );
  });

  it('creates client when both env vars are present', async () => {
    const { default: supabase } = await import('../supabaseClient');
    expect(supabase).toBeDefined();
    // Supabase client has auth and from methods
    expect(supabase.auth).toBeDefined();
    expect(typeof supabase.from).toBe('function');
  });
});
