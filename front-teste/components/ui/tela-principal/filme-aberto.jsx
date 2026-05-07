"use client"

import { useEffect, useState } from 'react'
import { X, Volume2, Plus, ThumbsUp, Play } from 'lucide-react'
import Image from 'next/image'
import Player from './plyers/player.jsx'
import PlaySeries from './plyers/playseries.jsx'

const pickImage = (movie) =>
	movie?.local_poster || movie?.poster_path || movie?.imagem || movie?.capa || movie?.url || ''

const pickTitle = (movie) => movie?.title || movie?.nome || movie?.titulo || 'Sem título'

const pickDescription = (movie) =>
	movie?.overview || movie?.descricao || movie?.descricao_curta || 'Sem sinopse disponível no momento.'

const pickMeta = (movie) => {
	const meta = []

	if (movie?.release_date || movie?.ano) {
		meta.push(movie.release_date || movie.ano)
	}

	if (movie?.vote_average) {
		meta.push(`${movie.vote_average.toFixed(1)} / 10`)
	}

	return meta
}

export default function FilmeAberto({ isOpen, movie, onClose }) {
	const [openPlayer, setOpenPlayer] = useState(false)

	useEffect(() => {
		if (!isOpen) return

		const handleEscape = (event) => {
			if (event.key === 'Escape') {
				onClose?.()
				setOpenPlayer(false)
			}
		}

		window.addEventListener('keydown', handleEscape)
		return () => window.removeEventListener('keydown', handleEscape)
	}, [isOpen, onClose])

	if (!isOpen || !movie) return null

	const meta = pickMeta(movie)

	return (
		<>
			
			<div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/75 backdrop-blur-md p-4">
				<div className="relative w-full max-w-5xl rounded-2xl bg-[#141414] text-white overflow-hidden">

					<button
						onClick={onClose}
						className="absolute top-4 right-4 z-20 bg-black/70 p-2 rounded-full"
					>
						<X />
					</button>

					<div className="relative min-h-[400px]">
						<Image
							src={pickImage(movie) || '/placeholder.png'}
							alt={pickTitle(movie)}
							fill
							className="object-cover"
							unoptimized
						/>

						<div className="absolute bottom-0 p-6">
							<h2 className="text-3xl font-bold">{pickTitle(movie)}</h2>

							<div className="mt-4 flex gap-2">
								
								<button
									onClick={() => {
										console.log("clicou")
										setOpenPlayer(true)
									}}
									className="flex items-center gap-2 bg-white text-black px-5 py-3 rounded font-semibold"
								>
									
									Assistir
								</button>

								
							</div>
						</div>
					</div>

					<div className="p-6 bg-[#181818]">
						<div className="flex gap-2 text-xs">
							{meta.map((item, i) => (
								<span key={i} className="bg-white/10 px-2 py-1 rounded">
									{item}
								</span>
							))}
						</div>

						<p className="mt-4 text-sm text-white/80">
							{pickDescription(movie)}
						</p>

						<button className="mt-4 h-10 w-10 border rounded-full flex items-center justify-center">
							<Volume2 />
						</button>
					</div>
				</div>
			</div>
			
			{openPlayer && (
				<div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95">
					
					<button
						onClick={() => setOpenPlayer(false)}
						className="absolute top-6 right-6 text-white text-2xl"
					>
						<X />
					</button>

					<div className="w-[90%] h-[80%]">
						{movie?.isSerie ? <PlaySeries id={movie.id} /> : <Player id={movie.id} />}
					</div>
				</div>
			)}
		</>
	)
}