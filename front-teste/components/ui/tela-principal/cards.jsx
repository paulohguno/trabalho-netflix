"use client"

import { useEffect, useState } from 'react'
import { sinopseAPI } from '../../../src/app/utils/api'
import Image from 'next/image'
//como funciona a chamada da api 
//ela funciona deste jeito porque a api tem um limite de 20 itens por chamadaa
export default function Cards({ onSelectMovie }) {
    const [items, setItems] = useState([])
    const [index, setIndex] = useState(0)

    const visible = 6

    useEffect(() => {
        let mounted = true
        sinopseAPI
            .popular()
            .then((res) => {
                if (!mounted) return
                setItems(Array.isArray(res.data?.data?.results) ? res.data.data.results : [])
            })
            .catch(() => {
                if (!mounted) return
                setItems([])
            })
        return () => (mounted = false)
    }, [])

    const prev = () => {
        setIndex((i) => Math.max(0, i - visible))
    }

    const next = () => {
        setIndex((i) =>
            Math.min(items.length - visible, i + visible)
        )
    }

    const pickImage = (it) =>
        it?.local_poster || it?.poster_path || it?.imagem || it?.capa || it?.url || ''

    const pickTitle = (it) =>
        it?.title || it?.nome || it?.titulo || 'Sem título'

    if (!items.length) {
        return (
            <div className="w-full py-8 text-center text-gray-400">
                Carregando...
            </div>
        )
    }

    return (
        <section className="w-full bg-black py-8 group">
            <div className="relative px-6">


                <button
                    onClick={prev}
                    className="absolute left-0 top-0 bottom-0 z-20 px-4 bg-black/60 text-white text-4xl opacity-0 group-hover:opacity-100 transition"
                >
                    ‹
                </button>


                <div className="overflow-hidden">
                    <div
                        className="flex gap-3 transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${index * (100 / visible)}%)`
                        }}
                    >
                        {items.map((it, i) => (
                            <div
                                key={i}
                                className="min-w-[160px] md:min-w-[180px] lg:min-w-[220px] flex-shrink-0"
                            >
                                <button
                                    type="button"
                                    onClick={() => onSelectMovie?.(it)}
                                    className="relative w-full rounded-lg overflow-hidden cursor-pointer group/item text-left"
                                >

                                    <Image
                                        src={pickImage(it) || '/placeholder.png'}
                                        alt={pickTitle(it)}
                                        width={300}
                                        height={450}
                                        className="object-cover w-full h-full transition-transform duration-300 group-hover/item:scale-110"
                                        unoptimized
                                    />


                                    <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/40 transition" />


                                    <div className="absolute bottom-0 p-3 opacity-0 group-hover/item:opacity-100 transition">
                                        <h3 className="text-white text-sm font-semibold">
                                            {pickTitle(it)}
                                        </h3>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={next}
                    className="absolute right-0 top-0 bottom-0 z-20 px-4 bg-black/60 text-white text-4xl opacity-0 group-hover:opacity-100 transition"
                >
                    ›
                </button>
            </div>
        </section>
    )
}