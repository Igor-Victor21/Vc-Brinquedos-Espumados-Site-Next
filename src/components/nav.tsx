"use client"

import Image from "next/image";
import logo from '../app/assets/images/Logo.png'
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"

interface navProps{
    color: boolean
    invert: boolean
    showLoja: boolean
    showFav: boolean
    showCart: boolean
    showSobre: boolean
    showCtt: boolean
  }

export default function Navbar({color, invert, showLoja, showFav, showCart, showSobre, showCtt} : navProps) {

  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    setIsLoggedIn(!!user)
  }, [])

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 5000)
      return
      
    }
    router.push('/favorites')
  }

  return (
    <div className={`w-full absolute top-0 left-0 z-50 ${color ? 'text-white' : 'text-black'}`}>
      <div className={`${color ? 'bg-black md:bg-transparent' : 'bg-white'} max-w-7xl mx-auto px-9 py-2 flex items-center justify-between`}>
        <div>
          <Link className="flex items-center motion-safe:hover:scale-105 transition" href={"/"}>
            <Image src={logo} alt="VC" width={40} height={40} className={invert ? 'invert' : ''} />
            <h1 className="ml-2 font-extrabold cursor-pointer">Brinquedos Espumados</h1>
          </Link>
        </div>
        <div className="hidden md:flex gap-6 items-center xl:mr-35">
          <Link className={`${showLoja ? 'block' : 'hidden'} cursor-pointer hover:tracking-wide duration-200`} href={"/products"}>Loja</Link>
          <Link className={`${showFav ? 'block' : 'hidden'} cursor-pointer hover:tracking-wide duration-200`} href={"/favorites"}
            onClick={(e) => 
              {
              if(!isLoggedIn){e.preventDefault()
              handleFavoriteClick()}}}>Favoritos</Link>
          <Link className={`${showCart ? 'block' : 'hidden'} cursor-pointer hover:tracking-wide duration-200`} href={"/cart"}>Carrinho</Link>
          <Link className={`${showSobre ? 'block' : 'hidden'} cursor-pointer hover:tracking-wide duration-200`} href={"/#about"}>Sobre</Link>
          <Link className={`${showCtt ? 'block' : 'hidden'} cursor-pointer hover:tracking-wide duration-200`} href={"#footer"}>Contato</Link>
        </div>
        {!isLoggedIn && (
          <div className="hidden md:flex gap-6 justify-center items-center">
            <button onClick={() => router.push("/login")} className={`w-20 py-1 px-3 rounded-3xl cursor-pointer font-bold duration-350 ${color ? 'text-black hover:text-white' : 'text-white hover:text-black'} ${invert ? 'bg-white hover:bg-black' : 'bg-black hover:bg-white hover:border'}`}>
              Login
            </button>
          </div>
        )}
        <button className="md:hidden p-2 cursor-pointer focus:outline-none motion-safe:hover:scale-110 transition" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          <span className="block w-6 h-0.5 bg-current mb-1"></span>
          <span className="block w-6 h-0.5 bg-current mb-1"></span>
          <span className="block w-6 h-0.5 bg-current"></span>
        </button>
      </div>
      {menuOpen && (
        <div className={`relative rounded-b-lg ${color ? 'bg-black' : 'bg-white'} md:hidden`}>
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-[-1]"/>
          <div className="flex flex-col items-center px-9 py-4 space-y-4 shadow-md relative z-10">
            {showLoja && <Link href="/products" className="hover:tracking-widest duration-200">Loja</Link>}
            {showFav && <Link href="/favorites" className="hover:tracking-widest duration-200"
            onClick={(e) => {if(!isLoggedIn){e.preventDefault()
            handleFavoriteClick()}}}>Favoritos</Link>}
            {showCart && <Link href="/cart" className="hover:tracking-widest duration-200">Carrinho</Link>}
            {showSobre && <Link href="/#about" className="hover:tracking-widest duration-200">Sobre</Link>}
            {showCtt && <Link href="#footer" className="hover:tracking-widest duration-200">Contato</Link>}
            {!isLoggedIn && (
              <button onClick={() => router.push("/login")} className={`w-[25vw] py-1 px-3 rounded-3xl cursor-pointer font-bold duration-350 ${color ? 'text-black hover:text-white' : 'text-white hover:text-black'} ${invert ? 'bg-white hover:bg-black' : 'bg-black hover:bg-white hover:border'}`}>Login</button>
            )}
          </div>
        </div>
      )}
      {showToast && (
        <div className="flex flex-col absolute w-[80vw] md:w-[40vw] xl:w-[20vw] top-[10%] md:top-[85%] left-[10%] bg-gray-500 p-4 z-40 rounded-lg">
          <button onClick={() => setShowToast(false)} className="text-gray-300 hover:text-white duration-200 font-bold self-end cursor-pointer">X</button>
          <p className="text-[12px] font-bold text-white">Você precisa estar logado para acessar os favoritos.</p>
        </div>
      )}
    </div>
  )
}