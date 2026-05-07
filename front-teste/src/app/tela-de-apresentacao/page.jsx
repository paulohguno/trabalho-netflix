
'use client'


import Header from '@/components/ui/apresentacao/parte-superior';
import NetflixHero from '@/components/ui/apresentacao/corpo';


export default function Home() {
    return (
        <main className="bg-black text-white">
            <div>
                <Header />
                <NetflixHero/>
            </div>
        </main>
    )
}