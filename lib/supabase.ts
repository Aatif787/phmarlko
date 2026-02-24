import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oemfcpwlomyqmldkiugf.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lbWZjcHdsb215cW1sZGtpdWdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyOTcyMzUsImV4cCI6MjA4Njg3MzIzNX0.SarLQMxki886nnvd_PLENbBq_5owzLfd7wM1ixSuaIw';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey);
