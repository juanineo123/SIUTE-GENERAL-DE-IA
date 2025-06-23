import { createClient } from '@supabase/supabase-js';

// Leemos las variables del entorno de Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://inifpgfipwdbmirxqrhq.supabase.co"; 
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluaWZwZ2ZpcHdkYm1pcnhxcmhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2Mzk4MjgsImV4cCI6MjA2NjIxNTgyOH0.6-qoWCcNp1pq_LSLWFIDjErJdk4zVU3s-ixyqbpkq0Q"; 

console.log("Diagnóstico - supabaseClient.js (en React):");
console.log("  URL Supabase usada:", supabaseUrl);
console.log("  Key Supabase usada:", supabaseKey ? "Cargada (no se muestra por seguridad)" : "No cargada");

// Creamos y exportamos el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    // Esto asegura que Supabase persista la sesión en localStorage (más robusto que cookies para SPAs en algunos entornos)
    storage: localStorage, 
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true, // Importante para detectar sesiones en la URL de callback
    // Configuración para las cookies, si Supabase las usa internamente o para otros fines
    // 'Lax' es el valor por defecto y más seguro para la mayoría de casos
    // 'None' es más permisivo (requiere secure: true) pero puede tener implicaciones de seguridad
    cookieOptions: {
      name: 'sb', // Nombre de la cookie de Supabase
      maxAge: 60 * 60 * 24 * 365, // 1 año
      sameSite: 'Lax', // O 'Strict', o 'None' (con secure: true)
      secure: true // Esencial para 'None' y recomendado siempre en HTTPS
    }
  }
});

console.log("Diagnóstico - supabaseClient.js: Cliente de Supabase inicializado con opciones de autenticación.");
