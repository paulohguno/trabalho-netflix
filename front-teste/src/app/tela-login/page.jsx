'use client'
import { useState } from 'react'
import Link from 'next/link'
import Iconeye from '@/components/ui/tela-login/iconeye';


export default function LoginPage(){
    

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-black relative overflow-hidden">
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: 'radial-gradient(circle at 50% 40%, var(--color-fundo-telas) 0%, var(--color-botao-escuro) 70%)'
                }}
            />

            <header className="w-full max-w-300 p-6 z-10 flex justify-start">
                <h1 className="text-texto-logos text-4xl font-bold tracking-tighter">
                    NETFLIX
                </h1>
            </header>
            <Iconeye/>

            
        </div>
    );
}