"use client"

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"

import botaoFavorito from '../app/assets/images/botaoFavorito.png'

interface FaveBtnProps {
  id: number
  name: string
  price: number
  image: string
}

interface FaveItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export default function FaveBtn({ id, name, price, image }: FaveBtnProps) {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const router = useRouter()

  const addToFave = () => {
    if (typeof window === 'undefined') return

      const user = localStorage.getItem('user')
      const isLoggedIn = !!user

      if (!isLoggedIn) {
        setShowToast(true)
        setTimeout(() => setShowToast(false), 5000)
        return
      }

        setIsAdding(true)

        try {
        const currentCart = localStorage.getItem('favorites')
        const cart: FaveItem[] = currentCart ? JSON.parse(currentCart) : []

        const existingItemIndex = cart.findIndex(item => item.id === id)

        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += 1
        } else {
            cart.push({ id, name, price, image, quantity: 1 })
        }

        localStorage.setItem('favorites', JSON.stringify(cart))
        window.dispatchEvent(new Event('faveUpdated'))

        router.refresh()
        } catch (error) {
        console.error('Error adding to cart:', error)
        } finally {
        setIsAdding(false)
        }
    }

  return (
    <div className="relative">
    {showToast && (
      <div className="absolute items-center -top-20 -left-60 w-[80vw] md:w-[40vw] xl:w-[20vw] bg-gray-500 p-4 z-40 rounded-lg">
        <button onClick={() => setShowToast(false)} className="text-gray-300 hover:text-white cursor-pointer font-bold self-end">X</button>
        <p className="text-[12px] font-bold text-white">Você precisa estar logado para adicionar o item aos favoritos.</p>
      </div>
    )}
    <button onClick={(e) => {
      if(!isLoggedIn){
        e.preventDefault()
        addToFave()
      }}} disabled={isAdding} className='cursor-pointer duration-350 hover:bg-black rounded-md'><Image className='duration-350 hover:invert' src={botaoFavorito} alt="" width={30}/></button>
    </div>
  )
}