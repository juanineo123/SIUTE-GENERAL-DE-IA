import React, { useState } from 'react';
// Importamos el cliente de Supabase aquí para poder usarlo en App.jsx
import { supabase } from './supabaseClient.js'; 
// He mantenido la importación del nuevo icono CalendarDays
import { BrainCircuit, FileText, CheckSquare, Users, GitMerge, Zap, ArrowRight, X, Loader2, Code, CalendarDays } from 'lucide-react';

// --- Global Styles for Animations (Sin cambios) ---
const GlobalStyles = () => (
  <style>{`
    @keyframes fade-in-down {
      0% {
        opacity: 0;
        transform: translateY(-20px);
      }
      100% {\
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fade-in-down {
      animation: fade-in-down 0.8s ease-out forwards;
    }
  `}</style>
);


// --- Helper & General Components ---

const WelcomePage = ({ onEnter }) => (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-white to-sky-100 text-center overflow-hidden">
        <GlobalStyles />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        <main className="relative z-10 flex flex-col items-center justify-center flex-grow p-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-700 tracking-tight animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
                    Central del Docente Innovador
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed animate-fade-in-down" style={{ animationDelay: '0.4s' }}>
                    Bienvenido a una colección de herramientas diseñadas por y para docentes, con el objetivo de revolucionar nuestra labor diaria. Todos estos generadores son de **uso gratuito** y se encuentran en su **versión 1.0**.
                </p>
                <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed animate-fade-in-down" style={{ animationDelay: '0.6s' }}>
                    Nuestro compromiso es seguir mejorando e implementando nuevas funcionalidades mes a mes, escuchando siempre las necesidades de la comunidad educativa. Juntos, estamos construyendo el futuro de la educación en el Perú.
                </p>
                <div className="animate-fade-in-down" style={{ animationDelay: '0.8s' }}>
                  <button
                      onClick={onEnter}
                      className="group mt-12 inline-flex items-center gap-3 rounded-full bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                  >
                      Entrar a la Suite
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={24} />
                  </button>
                </div>
            </div>
        </main>
        <footer className="relative z-10 py-6 text-sm text-gray-600 animate-fade-in-down" style={{ animationDelay: '1s' }}>
            Un proyecto de <strong className="font-semibold text-gray-800">Juan Manuel Caicedo Oliva</strong> con la asistencia de <strong className="font-semibold text-gray-800">Gemini</strong>.
        </footer>
    </div>
);


// Modificamos el Header para aceptar la función onLogout
const Header = ({ onLogout }) => (
    <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
                <h1 className="text-2xl font-bold text-indigo-600">Central del Docente Innovador</h1>
                <div className="flex items-center gap-4"> {/* Agregamos gap para separar el texto y el botón */}
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <Code size={18} className="text-indigo-500"/>
                        <span>Juan Caicedo, desarrollador</span>
                    </div>
                    {/* Botón de Cerrar Sesión */}
                    <button
                        onClick={onLogout}
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    </header>
);

const IframeModuleCard = ({ icon, title, description, onClick, disabled = false, iconColor = 'bg-indigo-100 text-indigo-600', hoverBorderColor = 'hover:border-indigo-500', cardBgColor = 'bg-white' }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`group block h-full rounded-xl border p-6 text-center shadow-md transition-all duration-300 ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-100' : `${cardBgColor} ${hoverBorderColor} hover:shadow-xl hover:-translate-y-1`}`}
    >
        <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${disabled ? 'bg-gray-200 text-gray-500' : iconColor}`}>
            {icon}
        </div>
        <h3 className="mt-4 text-xl font-semibold text-gray-800">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        {!disabled && (
            <span className={`mt-4 inline-block font-semibold transition-all duration-300 ${iconColor.replace('bg-', 'text-').replace('-100', '-600')}`}>
                Abrir Herramienta →
            </span>
        )}
    </button>
);


const Dashboard = ({ setView }) => {
    const tools = [
        { id: 1, title: "Generador de Sesiones", description: "Crea sesiones de aprendizaje completas.", url: "https://glistening-starlight-1588bf.netlify.app/", icon: <BrainCircuit size={32} />, iconColor: "bg-sky-100 text-sky-600", hoverBorderColor: "hover:border-sky-500", cardBgColor: "bg-sky-50" },
        { id: 2, title: "Generador de Unidades", description: "Elabora unidades de aprendizaje estructuradas.", url: "https://vocal-cendol-d4bf47.netlify.app/", icon: <FileText size={32} />, iconColor: "bg-emerald-100 text-emerald-600", hoverBorderColor: "hover:border-emerald-500", cardBgColor: "bg-emerald-50" },
        { id: 3, title: "Fichas y Exámenes", description: "Diseña material de evaluación y práctica.", url: "https://jazzy-moxie-e34a66.netlify.app/", icon: <CheckSquare size={32} />, iconColor: "bg-amber-100 text-amber-600", hoverBorderColor: "hover:border-amber-500", cardBgColor: "bg-amber-50" },
        { id: 4, title: "Generador de Solicitudes", description: "Redacta documentos administrativos.", url: "https://fancy-profiterole-01445b.netlify.app/", icon: <FileText size={32} />, iconColor: "bg-rose-100 text-rose-600", hoverBorderColor: "hover:border-rose-500", cardBgColor: "bg-rose-50" },
        { id: 5, title: "Solucionador de Conflictos", description: "Asistente para mediación de conflictos.", url: "https://elegant-duckanoo-d702fe.netlify.app/", icon: <Users size={32} />, iconColor: "bg-violet-100 text-violet-600", hoverBorderColor: "hover:border-violet-500", cardBgColor: "bg-violet-50" },
        { id: 6, title: "Proyectos Integrados", description: "Define proyectos basados en tu realidad local.", url: "https://jocular-concha-e30cbd.netlify.app/", icon: <GitMerge size={32} />, iconColor: "bg-teal-100 text-teal-600", hoverBorderColor: "hover:border-teal-500", cardBgColor: "bg-teal-50" },
        { id: 7, title: "Generador de Programación anual", description: "Planifica todo tu año escolar curricular.", url: "https://unrivaled-unicorn-fe7373.netlify.app/", icon: <CalendarDays size={32} />, iconColor: "bg-fuchsia-100 text-fuchsia-600", hoverBorderColor: "hover:border-fuchsia-500", cardBgColor: "bg-fuchsia-50" },
    ];

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Tus Herramientas</h2>
            <p className="mt-2 text-lg text-gray-600">Selecciona un generador para empezar a trabajar.</p>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {tools.map(tool => (
                    <IframeModuleCard
                        key={tool.id}
                        icon={tool.icon}
                        title={tool.title}
                        description={tool.description}
                        onClick={() => setView(tool.url)}
                        iconColor={tool.iconColor}
                        hoverBorderColor={tool.hoverBorderColor}
                        cardBgColor={tool.cardBgColor}
                    />
                ))}
                 <IframeModuleCard
                    icon={<Zap size={32} />}
                    title="Próximamente"
                    description="El futuro de la planificación educativa. Espéralo."
                    disabled
                />
            </div>
        </div>
    );
};

const IframeView = ({ url, setView }) => {
    const [loading, setLoading] = useState(true);
    const getToolTitle = (currentUrl) => {
        const toolMap = {
            "https://glistening-starlight-1588bf.netlify.app/": "Generador de Sesiones",
            "https://vocal-cendol-d4bf47.netlify.app/": "Generador de Unidades",
            "https://jazzy-moxie-e34a66.netlify.app/": "Fichas y Exámenes",
            "https://fancy-profiterole-01445b.netlify.app/": "Generador de Solicitudes",
            "https://elegant-duckanoo-d702fe.netlify.app/": "Solucionador de Conflictos",
            "https://jocular-concha-e30cbd.netlify.app/": "Proyectos Integrados",
            "https://unrivaled-unicorn-fe7373.netlify.app/": "Generador de Programación anual",
        };
        return toolMap[currentUrl] || "Herramienta";
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-30 flex items-center justify-center p-2 sm:p-4">
            <div className="relative w-full h-full max-w-screen-2xl bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-xl font-semibold text-gray-800">{getToolTitle(url)}</h3>
                    <button onClick={() => setView('dashboard')} className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <div className="flex-grow relative">
                    {loading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
                           <Loader2 className="h-12 w-12 text-indigo-500 animate-spin" />
                           <p className="mt-4 text-lg text-gray-600">Cargando generador...</p>
                        </div>
                    )}
                    <iframe
                        src={url}
                        title={getToolTitle(url)}
                        className={`w-full h-full border-0 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setLoading(false)}
                    />
                </div>
            </div>
        </div>
    );
};

export default function App() {
    const [view, setView] = useState('landing');

    // Función para manejar el cierre de sesión
    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("Error al cerrar sesión:", error.message);
                // Podrías mostrar una alerta o un mensaje en la UI aquí
                alert("Error al cerrar sesión: " + error.message); // Usar un modal personalizado en producción
            } else {
                console.log("Sesión cerrada exitosamente.");
                // Redirigir a la página de login después de cerrar sesión
                window.location.href = '/login.html'; 
            }
        } catch (e) {
            console.error("Excepción durante el cierre de sesión:", e);
            alert("Ocurrió un error inesperado al cerrar sesión."); // Usar un modal personalizado en producción
        }
    };

    if (view === 'landing') {
        return <WelcomePage onEnter={() => setView('dashboard')} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Pasamos la función handleLogout al componente Header */}
            <Header onLogout={handleLogout} /> 
            <main>
                <Dashboard setView={setView} />
            </main>
            {view.startsWith('http') && <IframeView url={view} setView={setView} />}
        </div>
    );
}
