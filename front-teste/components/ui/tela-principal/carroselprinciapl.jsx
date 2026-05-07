"use client"

import { useEffect, useState } from 'react'
import { sinopseAPI } from '../../../src/app/utils/api'
import Image from 'next/image'
//essa e a funcao principal do carrosel ela recebe o tipo de filme que vai ser mostrado e o titulo do carrosel
//alem de fazer a requisicao para a api e mostrar os filme em um formato de carrosel
//o type serve para escolher qual tipo de filme vai ser mostrado no carrosel

//a logica fica que o parametro de busca ica salvo em onselectmovie
export default function CarroselPrincipal({ type = 'popular', title, onSelectMovie }) {
    const [items, setItems] = useState([])
    const [index, setIndex] = useState(0)
    const visible = 6

    useEffect(() => {
        
        const funcao = {
            'popular': () => sinopseAPI.popular(),
            'topRated': () => sinopseAPI.topRated(),
            'upcoming': () => sinopseAPI.upcoming(),
        }[type]

        funcao().then(res => {
            setItems(Array.isArray(res.data?.data?.results) ? res.data.data.results : [])
        })
    }, [type])

    const prev = () => setIndex((i) => Math.max(0, i - visible))
    const next = () => setIndex((i) => Math.min(Math.max(0, items.length - visible), i + visible))

    const pickImage = (it) =>
        it?.local_poster || it?.poster_path || it?.imagem || it?.capa || it?.url || ''

    const pickTitle = (it) =>
        it?.title || it?.nome || it?.titulo || 'Sem título'

    if (!items.length) {
        return (
            <div className="w-full py-8 text-center text-gray-500 bg-black">
                Carregando...
            </div>
        )
    }

    
    const cardWidth = 140
    const gap = 12

    return (
        <section className="w-full bg-black py-6 group">
            <h2 className="text-white text-base font-semibold px-12 mb-2 tracking-wide">
                {title}
            </h2>

            <div className="relative">
                <button
                    onClick={prev}
                    disabled={index === 0}
                    className="absolute left-0 top-0 bottom-0 z-20 w-10 bg-black/70 text-white text-3xl opacity-0 group-hover:opacity-100 transition disabled:invisible flex items-center justify-center"
                >
                    ‹
                </button>

                <div className="overflow-hidden px-10 py-4">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            gap: `${gap}px`,
                            transform: `translateX(-${index * (cardWidth + gap)}px)`,
                        }}
                    >
                        {items.map((it, i) => (
                            <div
                                key={i}
                                className="shrink-0 relative transition-transform duration-300 ease-in-out hover:scale-110 hover:z-10"
                                style={{ width: `${cardWidth}px` }}
                            >
                                <button
                                    type="button"
                                    onClick={() => onSelectMovie?.(it)}
                                    className="relative w-full overflow-hidden rounded-sm ring-0 group/item text-left group-hover/item:ring-2 group-hover/item:ring-white transition-all duration-300"
                                >
                                    <Image
                                        src={pickImage(it) || '/placeholder.png'}
                                        alt={pickTitle(it)}
                                        width={cardWidth}
                                        height={Math.round(cardWidth * 1.5)}
                                        className="object-cover w-full h-52 sm:h-56 md:h-64"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/30 transition duration-300" />
                                </button>

                                <div className="absolute bottom-0 left-0 right-0 px-1 pb-1 opacity-0 group-hover/item:opacity-100 transition duration-300">
                                    <p className="text-white text-[11px] font-semibold truncate drop-shadow">
                                        {pickTitle(it)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={next}
                    disabled={index >= items.length - visible}
                    className="absolute right-0 top-0 bottom-0 z-20 w-10 bg-black/70 text-white text-3xl opacity-0 group-hover:opacity-100 transition disabled:invisible flex items-center justify-center"
                >
                    ›
                </button>
            </div>
        </section>
    )
}