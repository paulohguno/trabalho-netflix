"use client"
 
import { useEffect, useState, useRef } from 'react'
import { sinopseAPI } from '../../../src/app/utils/api'
import Image from 'next/image'
 
export default function Cards({ onSelectMovie }) {
    const [items, setItems] = useState([])
    const [index, setIndex] = useState(0)
    const [hovered, setHovered] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
 
    const VISIBLE = 4
 
    useEffect(() => {
        let mounted = true
        sinopseAPI
            .popular()
            .then((res) => {
                if (!mounted) return
                setItems(Array.isArray(res.data?.data?.results) ? res.data.data.results : [])
                setIsLoading(false)
            })
            .catch(() => {
                if (!mounted) return
                setItems([])
                setIsLoading(false)
            })
        return () => (mounted = false)
    }, [])
 
    const canPrev = index > 0
    const canNext = index + VISIBLE < items.length
 
    const prev = () => {
        if (canPrev) setIndex((i) => Math.max(0, i - VISIBLE))
    }
 
    const next = () => {
        if (canNext) setIndex((i) => Math.min(items.length - VISIBLE, i + VISIBLE))
    }
 
    const pickImage = (it) =>
        it?.local_poster || it?.poster_path || it?.imagem || it?.capa || it?.url || ''
 
    const pickTitle = (it) =>
        it?.title || it?.nome || it?.titulo || 'Sem título'
 
    const pickYear = (it) =>
        it?.release_date?.slice(0, 4) || it?.ano || ''
 
    const pickRating = (it) =>
        it?.vote_average ? Number(it.vote_average).toFixed(1) : null
 
    const visibleItems = items.slice(index, index + VISIBLE)
 
    if (isLoading) {
        return (
            <section className="w-full bg-[#141414] py-6 px-6">
                <div className="grid grid-cols-4 gap-3">
                    {Array.from({ length: VISIBLE }).map((_, i) => (
                        <div
                            key={i}
                            className="aspect-[2/3] rounded-md bg-[#2a2a2a] animate-pulse"
                        />
                    ))}
                </div>
            </section>
        )
    }
 
    if (!items.length) {
        return (
            <div className="w-full py-8 text-center text-gray-500 text-sm">
                Nenhum filme encontrado.
            </div>
        )
    }
 
    return (
        <section className="w-full bg-[#141414] py-6 group/section">
            <div className="relative px-12">
 
                {/* Botão Anterior */}
                <button
                    onClick={prev}
                    disabled={!canPrev}
                    aria-label="Anteriores"
                    className={[
                        "absolute left-0 top-0 bottom-0 z-20 w-10 flex items-center justify-center",
                        "bg-black/70 text-white text-3xl",
                        "transition-all duration-200",
                        "opacity-0 group-hover/section:opacity-100",
                        !canPrev && "cursor-not-allowed opacity-0 pointer-events-none",
                        "hover:bg-black/90 hover:scale-x-105 rounded-r-sm",
                    ].join(' ')}
                >
                    ‹
                </button>
 
                {/* Grid 4 colunas */}
                <div className="grid grid-cols-4 gap-3">
                    {visibleItems.map((it, i) => {
                        const globalIdx = index + i
                        const isHovered = hovered === globalIdx
                        const img = pickImage(it)
                        const title = pickTitle(it)
                        const year = pickYear(it)
                        const rating = pickRating(it)
 
                        return (
                            <button
                                key={globalIdx}
                                type="button"
                                onClick={() => onSelectMovie?.(it)}
                                onMouseEnter={() => setHovered(globalIdx)}
                                onMouseLeave={() => setHovered(null)}
                                className={[
                                    "relative w-full aspect-[2/3] rounded-md overflow-hidden",
                                    "cursor-pointer text-left group/item",
                                    "transition-transform duration-300 ease-out",
                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
                                    isHovered ? "scale-105 z-10 shadow-2xl shadow-black/80" : "scale-100 z-0",
                                ].join(' ')}
                            >
                                {/* Poster */}
                                {img ? (
                                    <Image
                                        src={img}
                                        alt={title}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className={[
                                            "object-cover transition-transform duration-500",
                                            isHovered ? "scale-110" : "scale-100",
                                        ].join(' ')}
                                        unoptimized
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-[#2a2a2a] flex items-center justify-center">
                                        <span className="text-gray-600 text-xs text-center px-2">{title}</span>
                                    </div>
                                )}
 
                                {/* Overlay escuro no hover */}
                                <div
                                    className={[
                                        "absolute inset-0 transition-all duration-300",
                                        isHovered
                                            ? "bg-gradient-to-t from-black/90 via-black/30 to-transparent"
                                            : "bg-black/0",
                                    ].join(' ')}
                                />
 
                                {/* Badge de avaliação */}
                                {rating && (
                                    <div
                                        className={[
                                            "absolute top-2 left-2 text-[10px] font-semibold px-1.5 py-0.5 rounded",
                                            "bg-black/70 backdrop-blur-sm",
                                            parseFloat(rating) >= 7
                                                ? "text-green-400"
                                                : parseFloat(rating) >= 5
                                                    ? "text-yellow-400"
                                                    : "text-red-400",
                                            "transition-opacity duration-200",
                                            isHovered ? "opacity-100" : "opacity-0",
                                        ].join(' ')}
                                    >
                                        ★ {rating}
                                    </div>
                                )}
 
                                {/* Info na base */}
                                <div
                                    className={[
                                        "absolute bottom-0 left-0 right-0 p-3",
                                        "transition-all duration-300",
                                        isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
                                    ].join(' ')}
                                >
                                    <h3 className="text-white text-sm font-semibold leading-tight line-clamp-2">
                                        {title}
                                    </h3>
                                    {year && (
                                        <p className="text-gray-400 text-xs mt-0.5">{year}</p>
                                    )}
 
                                    {/* Botão play */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="#141414"
                                                className="w-4 h-4 ml-0.5"
                                            >
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-300 text-xs">Assistir</span>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
 
                {/* Botão Próximo */}
                <button
                    onClick={next}
                    disabled={!canNext}
                    aria-label="Próximos"
                    className={[
                        "absolute right-0 top-0 bottom-0 z-20 w-10 flex items-center justify-center",
                        "bg-black/70 text-white text-3xl",
                        "transition-all duration-200",
                        "opacity-0 group-hover/section:opacity-100",
                        !canNext && "cursor-not-allowed opacity-0 pointer-events-none",
                        "hover:bg-black/90 hover:scale-x-105 rounded-l-sm",
                    ].join(' ')}
                >
                    ›
                </button>
            </div>
 
            {/* Indicador de páginas */}
            {items.length > VISIBLE && (
                <div className="flex justify-end gap-1 px-12 mt-3">
                    {Array.from({ length: Math.ceil(items.length / VISIBLE) }).map((_, p) => (
                        <span
                            key={p}
                            className={[
                                "h-0.5 rounded-full transition-all duration-300",
                                Math.floor(index / VISIBLE) === p
                                    ? "w-4 bg-white"
                                    : "w-2 bg-gray-600",
                            ].join(' ')}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}