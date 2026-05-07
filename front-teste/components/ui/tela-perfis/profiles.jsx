'use client'
import React from 'react'
import Image from 'next/image'

export default function Profiles({ name, active, imagem_padrao, onClick }) {
    const imageMap = {
        1: '/download (1).png',
        2: '/download (2).png',
        3: '/download (3).png',
        4: '/download (4).png',
    }

    const imageSrc = imageMap[imagem_padrao] || null

    return (
        <div className="flex flex-col items-center gap-3 cursor-pointer group" onClick={onClick}>
            <div
                className={`
            w-28 h-28 rounded-md overflow-hidden
            ${active ? 'ring-4 ring-blue-400 shadow-lg shadow-blue-400/40' : ''}
            border-2 border-transparent group-hover:border-white
            transition-all duration-300
        `}
            >
                {imageSrc ? (
                    <div className="relative w-full h-full">
                        <Image
                            src={imageSrc}
                            alt={name || 'Perfil'}
                            fill
                            sizes="112px"
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-gray-600 to-gray-900" />
                )}
            </div>

            <span className="text-gray-400 group-hover:text-white">
                {name}
            </span>
        </div>
    )
}