"use client"

import ThreeDCarousel from "@/components/ui/apresentacao/carossel";
import Header from '@/components/ui/apresentacao/parte-superior';
import { useEffect, useState } from "react";
import api from "@/src/app/utils/api";
import { useRouter } from 'next/navigation'





const TMDB_BASE = 'https://image.tmdb.org/t/p/w500';



export default function NetflixHero() {
  const [email, setEmail] = useState('')
  const router = useRouter()


  const handleSubmit = () => {
    if (!email) return

    router.push(`/tela-register?email=${encodeURIComponent(email)}`)
  }
  return (
    <div className="bg-black min-h-screen font-sans">


      <div className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden">

  
  <div
    className="absolute inset-0 bg-cover bg-center z-0 scale-110"
    style={{
      backgroundImage: "url('/fundo.png')"
    }}
  />

  
  <div className="absolute inset-0 bg-black/50 z-10" />

  
  <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black via-black/70 to-transparent z-10" />

  
  <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-black via-black/90 to-transparent z-10" />

  
  <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight">
      Filmes, séries e muito mais, sem limites
    </h1>

    <p className="text-lg md:text-2xl text-white mb-8 font-medium">
      Assista onde quiser. Cancele quando quiser.
    </p>

    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full md:w-96 px-4 py-4 bg-black/40 border border-gray-500 rounded text-white focus:outline-none focus:ring-2 focus:ring-white"
      />

      <button
        onClick={handleSubmit}
        className="w-full md:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-xl font-bold rounded transition-colors duration-200"
      >
        Vamos lá
      </button>
    </div>
  </div>


        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg viewBox="0 0 1440 120" className="w-full h-[120px]" preserveAspectRatio="none">
            <defs>
              
              <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#0B1A3A" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#000000" stopOpacity="1" />

              </linearGradient>
              <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
            </defs>
            <path 
  d="M0,120 C400,0 1040,0 1440,120 L1440,120 L0,120 Z" 
  fill="url(#fadeGradient)" 
/>
<path 
  d="M0,120 C400,0 1040,0 1440,120" 
  fill="none"
  stroke="url(#borderGradient)"
  strokeWidth="3"
/>
          </svg>
        </div>
      </div>
      <section className="bg-black pt-32 pb-20 px-8">
        <div className="p-0.5 rounded-lg bg-gradient-to-r from-cyan-400 to-pink-500 dark:from-cyan-500 dark:to-pink-600"
        >
          <div className="w-full max-w-2xl mx-auto " >
            <h2 className="text-texto-branco font-bold p-4">
              A Netflix que você adora por apenas R$ 20,90.
            </h2>
            <p className="text-texto-branco p-4 " >
              Aproveite nossa opção mais acessível, o plano com anúncios.
            </p>
          </div>

        </div>

        <ImagesCarousel />
      </section>

    </div>

  );
}

function ImagesCarousel() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get('/sinopse/popular');
        const payload = res.data || res;
        const items = payload.data?.results || payload.results || payload.items || payload;

        const imgs = (Array.isArray(items) ? items : [])
          .map((it) => {
            if (!it) return null;
            if (it.local_poster) return it.local_poster;
            if (it.poster_path) return TMDB_BASE + it.poster_path;
            if (it.poster) return it.poster;
            if (it.imageUrl) return it.imageUrl;
            if (it.backdrop_path) return TMDB_BASE + it.backdrop_path;
            return null;
          })
          .filter(Boolean);

        if (mounted) setImages(imgs);
      } catch (err) {
        console.error('Erro ao buscar séries:', err?.response?.data || err.message || err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false };
  }, []);

  if (loading) return <div className="py-8 text-center">Carregando carrossel...</div>;
  if (!images.length) return <div className="py-8 text-center">Nenhuma imagem encontrada</div>;

  return <ThreeDCarousel images={images} />;
}