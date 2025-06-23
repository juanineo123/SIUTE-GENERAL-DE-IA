import { createClient } from '@supabase/supabase-js';

// Leemos las variables del entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// --- NUESTROS ESPÍAS ---
console.log("Diagnóstico - supabaseUrl:", supabaseUrl ? "URL cargada correctamente" : "¡ERROR! URL NO ENCONTRADA");
console.log("Diagnóstico - supabaseKey:", supabaseKey ? "Clave cargada correctamente" : "¡ERROR! CLAVE NO ENCONTRADA");
// --- FIN DE LOS ESPÍAS ---

// Creamos y exportamos el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);