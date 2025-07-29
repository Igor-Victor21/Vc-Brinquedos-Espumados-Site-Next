'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import LoginImg from "../assets/images/login.png"
import Vine from "../assets/images/vinha.png"
import SideImage from "../assets/images/Crianças-brincando.png"

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    try {
      const response = await fetch('http://localhost:5555/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: name,
          email,
          password,
          cpf: '00000000000',
          socialReason: 'Pessoa Física',
          stateRegistration: 'ISENTO',
          cnpj: '00000000000000',
          cep: '00000000',
          uf: 'UF',
          city: 'Cidade',
          neighborhood: 'Bairro',
          road: 'Rua',
          numberHouse: 0,
          complement: 'Não informado',
          numberPhone: '00000000000',
          dateOfBirth: '2000-01-01',
        }),
      })

      if (response.status === 201) {
        setMessage('Cadastro realizado com sucesso!')
        setTimeout(() => router.push('/'), 2000)
      } else {
        throw new Error('Falha no cadastro')
      }
    } catch (error) {
      console.error(error)
      setMessage('Erro ao tentar cadastrar. Verifique os dados e tente novamente.')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <section className="flex h-screen w-full overflow-hidden">
      <div className="relative flex h-full flex-1 items-center justify-center">
        <Image src={LoginImg} alt="img-login" className="absolute h-[100vh] w-[100vw]"/>

        <div className="relative flex w-full max-w-[90%] flex-col items-center justify-center md:max-w-[404px]">
          <Image src={Vine} alt="vinha superior" className="absolute top-[-100px] h-[324px] rotate-90 md:top-[-170px] md:h-[450px]"/>
          <form onSubmit={handleRegister} className="relative mt-20 flex w-full max-w-[55%] flex-col md:max-w-[404px]">
            <div>
              <Image src={Vine} alt="vinha esquerda" className="absolute left-4 h-[394px] max-w-[70%] md:left-[-90px] md:h-[404px] md:max-w-[404px]"/>
              <Image src={Vine} alt="vinha direita" className="absolute right-4 top-20 h-[394px] max-w-[70%] rotate-180 md:right-[-90px] md:h-[414px] md:max-w-[404px]"/>
            </div>
            <h1 className="pb-2 text-2xl font-bold text-black">Crie sua conta</h1>
            <p className="pb-4 text-base">Preencha os campos para se registrar</p>
            <div className="mb-2">
              <p className="text-sm">Nome</p>
              <input type="text" placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full rounded-lg border border-gray-400 px-4 py-2"/>
            </div>

            <div className="mb-2">
              <p className="text-sm">E-mail</p>
              <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full rounded-lg border border-gray-400 px-4 py-2"/>
            </div>

            <div className="mb-2">
              <p className="text-sm">Senha</p>
              <input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 w-full rounded-lg border border-gray-400 px-4 py-2"/>
            </div>

            <div className="mb-4">
              <p className="text-sm">Confirmar Senha</p>
              <input type="password" placeholder="Confirme sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1 w-full rounded-lg border border-gray-400 px-4 py-2"/>
            </div>

            <div className="flex flex-col items-center justify-center">
              <button type="submit" className="rounded-lg bg-yellow-400 px-4 py-2 text-white transition hover:bg-yellow-500">Registrar-se</button>
            </div>

            {message && <p className="mt-2 text-sm text-red-500">{message}</p>}

            <p className="py-4 text-center">Ou</p>
            <p className="text-center text-sm">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-blue-600 underline">Entre aqui</Link>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden h-full flex-1 scale-[1.05] overflow-hidden min-[1000px]:flex">
        <Image src={SideImage} alt="crianças brincando" className="h-full w-full object-cover" />
      </div>
    </section>
  )
}