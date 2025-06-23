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
    // Usamos localStorage para la persistencia del token de sesión.
    // Esto es generalmente más estable para SPAs que solo las cookies,
    // especialmente cuando se involucran subdominios o configuraciones de proxy.
    storage: localStorage, 
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true, 
    
    // *** CONFIGURACIÓN CLAVE PARA EL CIERRE DE SESIÓN EN PRODUCCIÓN ***
    // Estas opciones afectan cómo Supabase gestiona las cookies de sesión.
    // 'SameSite: None' es necesario para que las cookies se envíen en peticiones cross-site (tu Netlify a la API de Supabase).
    // 'Secure: true' es OBLIGATORIO cuando SameSite es 'None'. Tu sitio de Netlify ya es HTTPS.
    cookieOptions: {
      name: 'sb', // Nombre de la cookie de Supabase
      maxAge: 60 * 60 * 24 * 365, // 1 año de duración
      sameSite: 'None', // Permite que la cookie se envíe en solicitudes de terceros (cross-site)
      secure: true // SOLO se envía la cookie a través de HTTPS (obligatorio con SameSite: 'None')
    }
  }
});

console.log("Diagnóstico - supabaseClient.js: Cliente de Supabase inicializado con opciones de autenticación.");
