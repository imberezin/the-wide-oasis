import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://yngoixghdieshjyonkkv.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluZ29peGdoZGllc2hqeW9ua2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NzI3NDYsImV4cCI6MjA1NzM0ODc0Nn0.BIO5fLxBQdDeGJwMEqBNun7K4I9L_6PGxsK5lhAsFqQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
