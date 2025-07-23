
// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

//const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
//const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = 'https://pyeefbssdgedhifudsar.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWVmYnNzZGdlZGhpZnVkc2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMzgzMTMsImV4cCI6MjA2NTkxNDMxM30.-1CNoKdasGpTud1feKiYknrCvhxJTJ7aKuQXn7L5BAs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
