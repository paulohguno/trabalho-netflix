'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { autenticacaoAPI } from '@/src/app/utils/api'

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

export default function Iconeye() {
    // aqui o router troca de pagina sem recarregar
    const router = useRouter()
    // aqui o email guarda o valor digitado
    const [email, setEmail] = useState('')
    // aqui a password guarda a senha digitada
    const [password, setPassword] = useState('')
    // aqui showPassword define se a senha vai aparecer ou nao
    const [showPassword, setShowPassword] = useState(false)
    // aqui loading mostra se o login ainda esta sendo feito
    const [loading, setLoading] = useState(false)

    const togglePasswordVisibility = () => {
        // aqui ele troca entre mostrar e esconder a senha
        setShowPassword((currentValue) => !currentValue)
    }
    function getIdUsuario() {
        // aqui ele pega o id do usuario que esta salvo no navegador
        const idUsuario = localStorage.getItem('idusuario')
        return idUsuario
    }

    const handleLogin = async () => {
        // primeiro ele confere se os campos estao vazios
        if (!email.trim() || !password.trim()) {
            alert('Preencha todos os campos')
            return
        }

        // depois liga o loading para mostrar que esta enviando
        setLoading(true)

        try {
            // aqui o await espera a resposta da api de login
            const response = await autenticacaoAPI.login(email, password)

            // aqui confere se a resposta veio como sucesso
            if (response?.data?.type === 'success') {
                // se deu certo ele salva o token no navegador
                localStorage.setItem('token', response.data.data)
                alert('Login realizado com sucesso!')
                router.push('/tela-dados') // aqui ele vai para a tela de perfis
                const idusuario = response?.data?.usuario?.id || null
                localStorage.setItem('idusuario', idusuario) // aqui ele salva o id do usuario para usar depois
                const idUsuario = getIdUsuario()
            } else {
                // se nao der certo ele mostra a mensagem que veio da api
                alert(response?.data?.message || 'Erro ao fazer login')
            }
        } catch (error) {
            // se der erro ele pega a mensagem e mostra para o usuario
            const mensagem = error?.response?.data?.message || error.message || 'Erro de conexão'
            alert(mensagem)
            console.error('Erro ao fazer login:', error)
        } finally {
            // por fim ele desliga o loading
            setLoading(false)
        }
    }

    return (
        <main className="z-10 w-full max-w-112.5 px-8 pt-4 pb-12">
            <div className="p-8 backdrop-blur-sm">
                <div className="mb-8 flex flex-col gap-2">
                    <h2 className="text-[32px] font-bold leading-tight text-texto-branco">
                        Informe seus dados para entrar
                    </h2>
                    <p className="text-base leading-relaxed text-texto-pequeno">
                        Ou{' '}
                        <Link
                            href="/tela-register"
                            className="cursor-pointer text-texto-branco hover:underline"
                        >
                            crie uma conta
                        </Link>.
                    </p>
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
                        className="w-full rounded-xl bg-botao-confirmar py-3 text-lg font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-netflix-red-dark disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Continuar'}
                    </button>
                </div>
            </div>
        </main>
    )
}