'use client'

import { useState } from 'react'
import { usuariosAPI } from '@/src/app/utils/api'
import { useRouter } from 'next/navigation'


export default function Dados() {
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataPagamento, setDataPagamento] = useState('')
    const [loc, setLoc] = useState('')
    const [statusDaConta, setStatusDaConta] = useState(true)
    const [idPlanoUsuario, setIdPlanoUsuario] = useState('')
    const [idAutenticacaoUsuario, setIdAutenticacaoUsuario] = useState('')
    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    function formatCPF(value) {
        let v = value.replace(/\D/g, '').slice(0, 11)
        v = v.replace(/(\d{3})(\d)/, '$1.$2')
        v = v.replace(/(\d{3})(\d)/, '$1.$2')
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        return v
    }
    
    async function salvarDados() {
        try {
            setErro('')

            if (!nome || !cpf || !dataPagamento || !loc || !idPlanoUsuario || !idAutenticacaoUsuario) {
                setErro('Preencha todos os campos antes de continuar.')
                return
            }

            setLoading(true)
            const res = await usuariosAPI.criar({
                nome,
                cpf,
                status_da_conta: statusDaConta,
                data_pagamento: dataPagamento,
                localizacao: loc,
                id_plano_usuario: Number(idPlanoUsuario),
                id_autenticacao_usuario: Number(idAutenticacaoUsuario),
            })
            console.log(res.data)
            setErro('sucesso:Dados salvos com sucesso!')
            router.push('tela-de-usuarios')
        } catch (err) {
            setErro(err?.response?.data?.message || 'Erro ao salvar os dados.')
        } finally {
            setLoading(false)
        }
    }

    const isSuccess = erro.startsWith('sucesso:')
    const mensagem = isSuccess ? erro.replace('sucesso:', '') : erro

    const inputClass = `
    w-full bg-[#242424] border border-[#333] rounded-sm px-4 py-3 text-sm
    text-[#e5e5e5] placeholder-[#555] outline-none font-sans
    focus:border-[#E50914] hover:border-[#555] transition-colors
    `
    const labelClass = `block text-[11px] font-semibold tracking-widest uppercase text-[#808080] mb-1.5 peer-focus:text-[#E50914]`

    return (
        <main className="min-h-screen bg-[#141414] flex items-center justify-center p-6"
            style={{ backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(229,9,20,0.12) 0%, transparent 60%)' }}>

            <div className="bg-[#1a1a1a] border border-[#333] rounded-sm w-full max-w-[460px] px-11 py-10 shadow-2xl">

                {/* Logo */}
                <span className="block text-[#E50914] text-4xl tracking-wide font-black mb-7"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}>NETFLIX</span>

                <h1 className="text-white text-2xl font-semibold mb-1">Cadastro de Usuário</h1>
                <p className="text-[#808080] text-xs mb-7">Preencha os dados abaixo para criar uma nova conta</p>
                <div className="h-px bg-[#333] mb-7" />

                {/* Nome */}
                <div className="mb-4">
                    <label className={labelClass}>Nome completo</label>
                    <input className={inputClass} type="text" placeholder="Ex: João da Silva"
                        value={nome} onChange={e => setNome(e.target.value)} />
                </div>

                {/* CPF */}
                <div className="mb-4">
                    <label className={labelClass}>CPF</label>
                    <input className={inputClass} type="text" placeholder="000.000.000-00"
                        value={cpf} onChange={e => setCpf(formatCPF(e.target.value))} maxLength={14} />
                </div>

                {/* Data + Localização */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                        <label className={labelClass}>Data de pagamento</label>
                        <input className={inputClass} type="date"
                            value={dataPagamento} onChange={e => setDataPagamento(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>Localização</label>
                        <input className={inputClass} type="text" placeholder="Ex: São Paulo"
                            value={loc} onChange={e => setLoc(e.target.value)} />
                    </div>
                </div>

                {/* IDs */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                        <label className={labelClass}>ID do Plano</label>
                        <input className={inputClass} type="number" placeholder="Ex: 1"
                            value={idPlanoUsuario} onChange={e => setIdPlanoUsuario(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>ID de Autenticação</label>
                        <input className={inputClass} type="number" placeholder="Ex: 42"
                            value={idAutenticacaoUsuario} onChange={e => setIdAutenticacaoUsuario(e.target.value)} />
                    </div>
                </div>

                {/* Toggle status */}
                <div className="flex items-center justify-between bg-[#242424] border border-[#333] rounded-sm px-4 py-3 mb-5 cursor-pointer hover:border-[#555] transition-colors"
                    onClick={() => setStatusDaConta(s => !s)}>
                    <div>
                        <p className="text-sm font-medium text-[#e5e5e5]">Status da conta</p>
                        <p className="text-xs text-[#808080]">{statusDaConta ? 'Conta ativa' : 'Conta inativa'}</p>
                    </div>
                    <div className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 ${statusDaConta ? 'bg-[#E50914]' : 'bg-[#444]'}`}>
                        <div className={`absolute top-[3px] w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${statusDaConta ? 'translate-x-[21px]' : 'translate-x-[3px]'}`} />
                    </div>
                </div>

                {/* Botão */}
                <button onClick={salvarDados} disabled={loading}
                    className={`w-full py-4 rounded-sm text-white text-sm font-semibold tracking-wide transition-all
            ${loading ? 'bg-[#b20710] opacity-70 cursor-not-allowed' : 'bg-[#E50914] hover:bg-[#f40612] active:scale-[0.985]'}`}>
                    {loading ? 'Salvando…' : 'Salvar dados'}

                </button>

                {/* Mensagem */}
                {mensagem && (
                    <div className={`mt-4 px-4 py-3 rounded-sm text-xs font-medium flex items-center gap-2
            ${isSuccess
                            ? 'bg-[rgba(70,211,105,0.1)] border border-[rgba(70,211,105,0.25)] text-[#46d369]'
                            : 'bg-[rgba(229,9,20,0.12)] border border-[rgba(229,9,20,0.3)] text-[#ff6b6b]'}`}>
                        <span>{isSuccess ? '✓' : '⚠'}</span> {mensagem}
                    </div>
                )}
            </div>
        </main>
    )
}