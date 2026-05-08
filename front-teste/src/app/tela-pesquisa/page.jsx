'use client'

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import FilmeAberto from "@/components/ui/tela-principal/filme-aberto"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333"

export default function Pesquisa() {

    const [active, setActive] = useState(null)
    const [searchInput, setSearchInput] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const sourceKeyRef = useRef("")

    // Estados para controlar o modal FilmeAberto
    const [filmeSelecionado, setFilmeSelecionado] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [generos] = useState([
        { id: 28, nome: "Ação" },
        { id: 12, nome: "Aventura" },
        { id: 16, nome: "Animação" },
        { id: 35, nome: "Comédia" },
        { id: 80, nome: "Crime" },
        { id: 99, nome: "Documentário" },
        { id: 18, nome: "Drama" },
        { id: 10751, nome: "Família" },
        { id: 14, nome: "Fantasia" },
        { id: 36, nome: "História" },
        { id: 27, nome: "Terror" },
        { id: 10402, nome: "Música" },
        { id: 9648, nome: "Mistério" },
        { id: 10749, nome: "Romance" },
        { id: 878, nome: "Ficção científica" },
        { id: 10770, nome: "Cinema TV" },
        { id: 53, nome: "Suspense" },
        { id: 10752, nome: "Guerra" },
        { id: 37, nome: "Faroeste" }
    ]);

    const termoBusca = searchQuery.trim()
    const sourceKey = termoBusca
        ? `nome:${termoBusca.toLowerCase()}`
        : active
            ? `genero:${active}`
            : ''

    function mergeUniqueMovies(current, incoming) {
        const seen = new Set(current.map((filme) => filme?.id).filter(Boolean))

        return [
            ...current,
            ...incoming.filter((filme) => {
                if (!filme?.id || seen.has(filme.id)) {
                    return false
                }

                seen.add(filme.id)
                return true
            })
        ]
    }

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setSearchQuery(searchInput.trim())
        }, 300)

        return () => window.clearTimeout(timer)
    }, [searchInput])

    useEffect(() => {
        if (!sourceKey) {
            sourceKeyRef.current = ''
            setFilmes([])
            setHasMore(true)
            setPage(1)
            return
        }

        async function carregarFilmes(paginaAtual, append = false) {

            try {
                append ? setLoadingMore(true) : setLoading(true)

                const endpoint = searchQuery.trim()
                    ? `${API_BASE_URL}/sinopse/buscar?nome=${encodeURIComponent(searchQuery.trim())}&page=${paginaAtual}`
                    : `${API_BASE_URL}/sinopse/genero/${active}?page=${paginaAtual}`

                const res = await fetch(endpoint)
                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data?.message || 'Erro ao buscar filmes')
                }

                const novosFilmes = Array.isArray(data?.data?.results)
                    ? data.data.results
                    : Array.isArray(data?.results)
                        ? data.results
                        : []

                setFilmes((current) => append ? mergeUniqueMovies(current, novosFilmes) : mergeUniqueMovies([], novosFilmes))
                setHasMore(novosFilmes.length > 0)

            } catch (error) {

                console.log(error)

                if (!append) {
                    setFilmes([])
                }

                setHasMore(false)

            } finally {

                append ? setLoadingMore(false) : setLoading(false)

            }
        }

        if (sourceKeyRef.current !== sourceKey) {
            sourceKeyRef.current = sourceKey
            setFilmes([])
            setHasMore(true)

            if (page !== 1) {
                setPage(1)
                return
            }
        }

        carregarFilmes(page, page > 1)

    }, [active, page, searchQuery, sourceKey])

    function handleScroll(event) {
        const target = event.currentTarget

        if (loading || loadingMore || !hasMore || !active) {
            return
        }

        const nearBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 300

        if (nearBottom) {
            setPage((current) => current + 1)
        }
    }

    function handleSearchSubmit(event) {
        event.preventDefault()
        setSearchQuery(searchInput.trim())
        setPage(1)
        setHasMore(true)
        setActive(null)
    }

    function handleClearSearch() {
        setSearchInput("")
        setSearchQuery("")
        setPage(1)
        setHasMore(true)
    }

    function pickImage(it) {

        if (it?.local_poster) {
            return it.local_poster
        }

        if (it?.poster_path) {
            return `https://image.tmdb.org/t/p/w500${it.poster_path}`
        }

        return (
            it?.imagem ||
            it?.capa ||
            ''
        )
    }

    function handleMovieClick(filme) {
        setFilmeSelecionado(filme)
        setIsModalOpen(true)
    }

    return (
        <div className="flex h-screen bg-[#141414]">

            {/* Sidebar */}
            <div className="w-56 bg-neutral-900 overflow-y-auto border-r border-neutral-800">

                {generos.map((genero) => (
                    <button
                        key={genero.id}
                        onClick={() => setActive(genero.id)}
                        className={`
                            w-full min-h-11 px-4 flex items-center
                            text-white text-sm font-medium
                            border-b border-neutral-800
                            transition-all duration-150
                            ${active === genero.id
                                ? "bg-red-500"
                                : "bg-neutral-900 hover:bg-red-600"
                            }
                        `}
                    >
                        {genero.nome}
                    </button>
                ))}

            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto p-6 relative" onScroll={handleScroll}>

                <form onSubmit={handleSearchSubmit} className="mb-6 flex gap-3">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                        placeholder="Pesquisar filme por nome"
                        className="flex-1 rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white placeholder:text-neutral-500 outline-none focus:border-red-500"
                    />
                    <button
                        type="submit"
                        className="rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-500"
                    >
                        Buscar
                    </button>
                    {(searchInput || searchQuery) && (
                        <button
                            type="button"
                            onClick={handleClearSearch}
                            className="rounded-lg border border-neutral-700 px-5 py-3 text-sm font-semibold text-neutral-300 hover:border-neutral-500 hover:text-white"
                        >
                            Limpar
                        </button>
                    )}
                </form>

                <h1 className="text-white text-3xl font-bold mb-6">
                    {searchQuery
                        ? `Resultados para "${searchQuery}"`
                        : active
                        ? `Filmes encontrados`
                        : "Selecione um gênero"}
                </h1>

                {/* Loading */}
                {loading && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

                        {Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={i}
                                className="aspect-2/3 rounded-lg bg-neutral-800 animate-pulse"
                            />
                        ))}

                    </div>
                )}

                {/* Sem filmes */}
                {!loading && filmes.length === 0 && (active || searchQuery) && (
                    <div className="text-gray-400">
                        Nenhum filme encontrado.
                    </div>
                )}

                {/* Grid */}
                {!loading && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

                        {filmes.map((filme, index) => {

                            const img = pickImage(filme)

                            return (
                                <div
                                    key={index}
                                    onClick={() => handleMovieClick(filme)}
                                    className="
                                        group relative overflow-hidden
                                        rounded-lg bg-neutral-900
                                        transition-transform duration-300
                                        hover:scale-105 cursor-pointer
                                    "
                                >

                                    <div className="relative aspect-2/3">

                                        {img ? (
                                            <Image
                                                src={img}
                                                alt={filme?.title || 'Filme'}
                                                fill
                                                unoptimized
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-gray-400 text-sm">
                                                Sem imagem
                                            </div>
                                        )}

                                        {/* Overlay */}
                                        <div className="
                                            absolute inset-0
                                            bg-linear-to-t
                                            from-black/90
                                            via-black/20
                                            to-transparent
                                            opacity-0
                                            group-hover:opacity-100
                                            transition-opacity
                                        " />

                                        {/* Infos */}
                                        <div className="
                                            absolute bottom-0 left-0 right-0
                                            p-3
                                            translate-y-5
                                            opacity-0
                                            group-hover:translate-y-0
                                            group-hover:opacity-100
                                            transition-all
                                        ">

                                            <h2 className="text-white text-sm font-semibold line-clamp-2">
                                                {filme?.title}
                                            </h2>

                                            <p className="text-gray-300 text-xs mt-1">
                                                {filme?.release_date?.slice(0, 4)}
                                            </p>

                                        </div>

                                    </div>

                                </div>
                            )
                        })}

                    </div>
                )}

                {loadingMore && (
                    <div className="mt-6 text-center text-gray-400 text-sm">
                        Carregando mais filmes...
                    </div>
                )}

                {!hasMore && active && filmes.length > 0 && (
                    <div className="mt-6 text-center text-gray-500 text-sm">
                        Você chegou ao fim da lista.
                    </div>
                )}
            </div>

            {/* Modal Filme Aberto */}
            <FilmeAberto
                isOpen={isModalOpen}
                movie={filmeSelecionado}
                onClose={() => setIsModalOpen(false)}
            />

        </div>
    )
}