import { createClient } from '@supabase/supabase-js';

// Leemos las variables del entorno de Vite
// Netlify las proporcionará en producción si están configuradas en su panel
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// --- NUEVOS DIAGNÓSTICOS ---
// Estos logs nos dirán si las variables de entorno se están cargando correctamente en la app React
console.log("Diagnóstico - supabaseUrl:", supabaseUrl ? "URL cargada correctamente" : "¡ERROR! URL NO ENCONTRADA");
console.log("Diagnóstico - supabaseKey:", supabaseKey ? "Clave cargada correctamente" : "¡ERROR! CLAVE NO ENCONTRADA");
// --- FIN DE NUEVOS DIAGNÓSTICOS ---

// Creamos y exportamos el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
