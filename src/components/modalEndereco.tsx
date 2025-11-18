"use client";

import { useEffect, useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onValidChange: (valid: boolean, data: any) => void;
}

export default function ModalEndereco({ isOpen, onClose, onValidChange }: ModalProps) {
    const [form, setForm] = useState({
        nome: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        complemento: ""
    });

    const [isValid, setIsValid] = useState(false);

    // 🔥 Carregar endereço salvo no localStorage
    useEffect(() => {
        const saved = localStorage.getItem("endereco_cliente");
        if (saved) {
            const parsed = JSON.parse(saved);
            setForm(parsed);

            const valid =
                parsed.nome &&
                parsed.cep &&
                parsed.rua &&
                parsed.numero &&
                parsed.bairro &&
                parsed.cidade;

            setIsValid(!!valid);
            onValidChange(!!valid, parsed);
        }
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        const updated = { ...form, [name]: value };
        setForm(updated);

        const valid =
            updated.nome.trim() !== "" &&
            updated.cep.trim() !== "" &&
            updated.rua.trim() !== "" &&
            updated.numero.trim() !== "" &&
            updated.bairro.trim() !== "" &&
            updated.cidade.trim() !== "";

        setIsValid(valid);
        onValidChange(valid, updated);

        // 🔥 Salvar no localStorage a cada atualização
        localStorage.setItem("endereco_cliente", JSON.stringify(updated));
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-[90%] max-w-md max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-xl flex flex-col gap-3"
            >
                <h2 className="text-xl font-bold text-center mb-1">Preencha seu endereço</h2>

                {Object.entries({
                    nome: "Nome Completo *",
                    cep: "CEP *",
                    rua: "Rua *",
                    numero: "Número *",
                    complemento: "Complemento (opcional)",
                    bairro: "Bairro *",
                    cidade: "Cidade *"
                }).map(([key, label]) => (
                    <div key={key} className="flex flex-col">
                        <label className="font-semibold text-sm mb-1">{label}</label>
                        <input
                            name={key}
                            value={(form as any)[key]}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            placeholder={`Digite ${label.toLowerCase()}`}
                        />
                    </div>
                ))}

                <div className="flex justify-center mt-4">
                    <button
                        onClick={onClose}
                        className={`px-6 py-2 rounded-full text-white transition-all cursor-pointer
                            ${isValid ? "bg-[#7DACFF]" : "bg-red-600"}
                        `}
                    >
                        {isValid ? "Salvar Endereço" : "Fechar - dados incompletos"}
                    </button>
                </div>
            </div>
        </div>
    );
}
