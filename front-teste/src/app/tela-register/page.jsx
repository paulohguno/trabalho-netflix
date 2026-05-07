'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Iconeye from '@/components/ui/tela-login/iconeye'
import { autenticacaoAPI } from '../utils/api'
import { useRouter } from 'next/navigation'


const EyeIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx={12} cy={12} r={3} />
    </svg>
)

const EyeOffIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1={2} x2={22} y1={2} y2={22} />
    </svg>
)


export default function Register() {
    const searchParams = useSearchParams()
    // aqui pega email e senha da url se tiver
    const [email, setEmail] = useState(searchParams.get('email') ?? '')
    const [password, setPassword] = useState(searchParams.get('password') ?? '')
    
const router = useRouter()
// aqui loading mostra se a requisicao ainda esta andando
const [loading , setLoading] = useState(false)

// aqui showPassword decide se a senha fica visivel ou nao
const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        // aqui ele troca entre mostrar e esconder a senha
        setShowPassword((currentValue) => !currentValue)
    }

    const registro = async () => {
        // primeiro ele confere se os campos estao vazios
        if (!email.trim() || !password.trim()) {
            alert('Preencha todos os campos')
            return
        }

        // depois liga o loading para mostrar que esta enviando
        setLoading(true)

        try {
            // aqui o await espera a resposta da api de cadastro
            const response = await autenticacaoAPI.registrar({
                email,
                password,
                nivelAcesso: 1
            })

            // aqui confere se a resposta veio como sucesso
            if (response?.data?.type === 'success') {
                alert('Cadastro realizado com sucesso!')
                router.push('/tela-login')
            } else {
                // se nao der certo ele mostra a mensagem que veio da api
                alert(response?.data?.message || 'Erro ao cadastrar')
            }
        } catch (error) {
            // se der erro ele pega a mensagem e mostra para o usuario
            const mensagem = error?.response?.data?.message || error.message || 'Erro de conexão'
            alert(mensagem)
            console.error('Erro ao registrar:', error)
        } finally {
            // por fim ele desliga o loading
            setLoading(false)
        }
    }

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
            <main className="z-10 w-full max-w-112.5 px-8 pt-4">
                <div className="flex flex-col gap-1 mb-8">
                    <h2 className="text-white text-[32px] font-bold">
                        Crie sua conta para Continuar
                    </h2>
                </div>

                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email ou número de telefone"
                        className="w-full rounded-xl border border-white/15 bg-[rgba(22,22,22,0.78)] px-4 py-4 text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Informe sua senha"
                            className="w-full rounded-xl border border-white/15 bg-[rgba(22,22,22,0.78)] px-4 py-4 pr-12 text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                        />

                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition-colors hover:text-white"
                            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                        >
                            {showPassword ? (
                                <EyeOffIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    <button 
                        className="w-full bg-buton-cont bg-botao-confirmar text-white font-bold py-3 rounded transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={registro}
                        disabled={loading}
                    >
                        {loading ? 'Enviando...' : 'Continuar'}
                    </button>
                    </div>
            </main>
        </div>
);
};
