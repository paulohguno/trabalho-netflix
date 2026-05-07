'use client'

import { useState } from 'react'


export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-black/80 backdrop-blur-xl z-50 py-4 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        <div className="text-4xl font-bold duration-300 hover:scale-110 text-texto-logos">
          NETFLIX
        </div>

        
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => window.location.href = '/tela-login'} 
            className="bg-botao-confirmar w-32 h-10 duration-300 hover:scale-110 rounded-sm "
          >
            Login
          </button>
          <select className="bg-black text-white border border-gray-600 px-3 py-1 rounded-md text-sm">
            <option>Português</option>
            <option>English</option>
            <option>Español</option>
          </select>
        </nav>

        
        <button 
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>
    </header>
  )
}