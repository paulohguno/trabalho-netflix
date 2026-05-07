'use Client'
import { useEffect, useState } from 'react'


export default function AddProfile() {
    return (
        
        <div className="flex flex-col items-center gap-3 cursor-pointer group">
            <div className="w-28 h-28 border-2 border-dashed border-gray-500 rounded-md flex items-center justify-center group-hover:border-white transition">
                <span className="text-4xl text-gray-400 group-hover:text-white">+</span>
            </div>

            <span className="text-gray-400 group-hover:text-white">
                Adicionar perfil
            </span>
        </div>
    )
}