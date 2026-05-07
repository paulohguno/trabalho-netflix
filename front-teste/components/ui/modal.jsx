"use client";
import { useState } from "react";
//comandos de front 
    //fixed para deixar modal fixo na tela
    //inset-0 para ocupar toda a tela
    //z-50 para ficar acima de outros elementos
    //flex, items-center e justify-center para centralizar o modal
    //bg-black/60 para dar um fundo preto com opacidade
    //backdrop-blur-sm para dar um efeito de desfoque no fundo
    //rounded-2xl para deixar as bordas arredondadas
    //p-6 para dar um padding interno
    //w-full e max-w-md para controlar a largura do modal
    //shadow-2xl para dar uma sombra mais intensa
    //bg-slate-900 para o fundo do modal
    //border e border-[#0CAFF0]/30 para dar uma borda com a cor personalizada
    //space-y-4 para dar um espaçamento entre os elementos internos
    //min-h-screen para garantir que a altura mínima seja a altura da tela
    //flex-col para organizar os elementos em coluna
    //bg-[#020617] para o fundo da página
    //text-white para a cor do texto
    //font-sans para a fonte sans-serif
    //flex-1 para o conteúdo ocupar o espaço restante
    //min-h-0 para permitir que o conteúdo encolha se necessário
    //px-2, py-2, sm:px-6, lg:px-8 para o padding responsivo
    //items-center e justify-center para centralizar o conteúdo
    //border-b e border-[#0CAFF0]/20 para dar uma borda inferior com a cor personalizada
    //max-w-5xl para limitar a largura do conteúdo
    //rounded-2xl para deixar as bordas arredondadas
    //border e border-[#0CAFF0]/30 para dar uma borda com a cor personalizada
    //bg-[#020617]/80 para um fundo com opacidade
    //p-6 para o padding interno
    //backdrop-blur-md para um efeito de desfoque mais intenso
    //shadow-[0_0_25px_rgba(12,175,240,0.15)] para uma sombra personalizada
    //grid e grid-cols-5 para organizar os elementos em uma grade de 5 colunas





export default function Modal({ isOpen, onClose, onSave }) {
    const [form, setForm] = useState({
        nome: "",
        descricao: "",
        prazo: "",
    });

    if (!isOpen) return null;

    const handleChange = (campo, valor) => {
        setForm({ ...form, [campo]: valor });
    };

    const handleSubmit = () => {
        onSave(form);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="rounded-2xl p-6 w-full max-w-md shadow-lg bg-slate-900 border border-cyan-400/30">
                <h1 className="text-2xl font-bold mb-4 text-teal">Nova tarefa</h1>
                    <div className="space-y-4">
                        <input
                            value={form.nome}
                            onChange={(e) => handleChange("nome", e.target.value)}
                            className="w-full rounded-lg border border-cyan-400/30 bg-dark-020617 px-3 py-2 text-white"
                            placeholder="Nome"
                        />

                        <textarea
                            value={form.descricao}
                            onChange={(e) => handleChange("descricao", e.target.value)}
                            className="mb-3 w-full rounded-lg border border-cyan-400/30 bg-dark-020617 px-3 py-2 text-white h-24"
                            placeholder="Descricao"
                        />

                        <input
                            value={form.prazo}
                            onChange={(e) => handleChange("prazo", e.target.value)}
                            className="mb-3 w-full rounded-lg border border-cyan-400/30 bg-dark-020617 px-3 py-2 text-white"
                            placeholder="Prazo"
                        />
                    </div>
                <button
                    onClick={handleSubmit}
                    className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-bold"
                    
                >
                    Salvar
                </button>

                <button
                    onClick={onClose}
                    className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-bold"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
}