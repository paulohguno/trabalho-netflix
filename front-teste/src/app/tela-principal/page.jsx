'use client'

import { useState } from 'react'
import HeaderPrincipal from '@/components/ui/tela-principal/header-principal'
import CarroselPrincipal from '@/components/ui/tela-principal/carroselprinciapl'
import Cards from '@/components/ui/tela-principal/cards'
import FilmeAberto from '@/components/ui/tela-principal/filme-aberto'


export default function Principal() {
    const [filmeSelecionado, setFilmeSelecionado] = useState(null)

    return (
        <main>
            
            <HeaderPrincipal />
            <Cards onSelectMovie={setFilmeSelecionado} />
            <CarroselPrincipal type="popular" title="Populares" onSelectMovie={setFilmeSelecionado} />
            <CarroselPrincipal type="topRated" title="Mais Avaliados" onSelectMovie={setFilmeSelecionado} />
            <CarroselPrincipal type="upcoming" title="Em Breve" onSelectMovie={setFilmeSelecionado} />
            <FilmeAberto
                isOpen={Boolean(filmeSelecionado)}
                movie={filmeSelecionado}
                onClose={() => setFilmeSelecionado(null)}
                
            />
        </main>
    )
}