"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import LoginImg from "../assets/images/login.png"
import Vine from "../assets/images/vinha.png"
import SideImage from "../assets/images/Crianças-brincando.png"

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      router.push("/");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5555/users");
      const users = await response.json();
      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!foundUser) {
        setMessage("Email ou senha incorretos");
        setTimeout(() => setMessage(""), 3000);
        return;
      }

      localStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);
      router.push("/");
      
    } catch (error: any) {
      setMessage(
        "Erro ao tentar logar: " + (error.message || "Erro desconhecido")
      );
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <section className="flex h-screen w-full overflow-hidden">
      <div className="relative flex h-full flex-1 items-center justify-center">
        <Image src={LoginImg} alt="img-login" className="absolute h-[100vh] w-[100vw]"/>
        <div className="relative flex w-full max-w-[90%] flex-col items-center justify-center md:max-w-[404px]">
          <Image src={Vine} alt="vinha superior" className="absolute top-[-200px] h-[35vh] rotate-90 md:top-[-270px] md:h-[450px]"/>
          <form onSubmit={handleLogin} className="relative flex w-full max-w-[55%] flex-col md:max-w-[404px]">
            <div>
              <Image src={Vine} alt="vinha esquerda" className="absolute left-[-90px] h-[394px] max-w-[70%] md:left-[-90px] md:h-[404px] md:max-w-[404px]"/>
              <Image src={Vine} alt="vinha direita" className="absolute right-[-90px] h-[394px] max-w-[70%] rotate-180 md:right-[-90px] md:h-[404px] md:max-w-[404px]"/>
            </div>
            <h1 className="pb-2 text-2xl font-bold text-black">Bem vindo(a) de volta!!</h1>
            <p className="pb-4 text-base">Digite suas credenciais para acessar sua conta</p>
            <p className="text-sm">E-mail</p>
            <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mb-2 rounded-lg border border-gray-400 px-4 py-2"/>
            <p className="text-sm">Senha</p>
            <input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required className="mb-4 rounded-lg border border-gray-400 px-4 py-2"/>
            <button type="submit" className="rounded-lg bg-yellow-400 px-4 py-2 text-white transition hover:bg-yellow-500">Entrar</button>
            {message && <p className="mt-2 text-sm text-red-500">{message}</p>}

            <p className="py-4 text-center">Ou</p>
            <p className="text-center text-sm">
              Não tem uma conta?{" "}
              <Link href="/signUp" className="text-blue-600 underline">Cadastrar-se</Link>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden h-full flex-1 scale-[1.05] overflow-hidden min-[1000px]:flex">
        <Image src={SideImage} alt="crianças brincando" className="h-full w-full object-cover"/>
      </div>
    </section>
  );
}