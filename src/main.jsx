import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { supabase } from './supabaseClient.js';

const AuthGate = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Diagnóstico - AuthGate: Iniciando comprobación de sesión...");
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Diagnóstico - AuthGate: Respuesta de Supabase recibida. La sesión es:", session);
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    console.log("Diagnóstico - AuthGate: Esperando respuesta de Supabase...");
    return <p>Cargando y verificando sesión...</p>; 
  }

  if (!session) {
    console.log("Diagnóstico - AuthGate: No hay sesión. Redirigiendo a login.html");
    window.location.href = '/login.html'; 
    return null; 
  }

  return <App />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthGate />
  </React.StrictMode>
);
