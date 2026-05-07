'use client'
import { useState } from 'react'
import { FaSearch } from "react-icons/fa";


export default function HeaderPrincipal() {
    return (
        <header className="fixed top-0 w-full bg-black/30 backdrop-blur-xl z-50 py-4 px-4 md:px-8">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="text-4xl font-bold duration-300 hover:scale-110 text-texto-logos">
                    NETFLIX
                </div>
                <div>
                    <nav className="hidden md:flex gap-8 text-gray-300">
                        <button className="transition-all duration-300 hover:scale-110 hover:text-texto-logos">
                            <FaSearch />
                        </button>
                        <span className="transition-all duration-300 hover:scale-110 hover:text-texto-logos">Inicio</span>
                        <span className="transition-all duration-300 hover:scale-110 hover:text-texto-logos" >Series</span>
                        <span className="transition-all duration-300 hover:scale-110 hover:text-texto-logos" >Filmes</span>
                        <span className="transition-all duration-300 hover:scale-110 hover:text-texto-logos" >Novidades</span>
                    </nav>
                </div>
            </div>
        </header>
    )
}