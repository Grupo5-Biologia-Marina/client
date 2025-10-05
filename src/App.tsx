import './App.css' 

function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 via-sky-400 to-blue-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4)_0%,transparent_70%)] animate-pulse"></div>
      <h1 className="relative text-5xl font-bold text-white drop-shadow-lg text-center">
        Sumérgete en <span className="text-yellow-200">El Gran Azul</span> 🌊
      </h1>
    </div>
  )
}

export default App
