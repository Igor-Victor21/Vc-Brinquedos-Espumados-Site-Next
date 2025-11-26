"use client"

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"

import botaoFavorito from '../app/assets/images/botaoFavorito.png'

interface FaveBtnProps {
  id: string
  name: string
  price: number
  image: string

  onToastChange: (show: boolean) => void

}

interface FaveItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export default function FaveBtn({ id, name, price, image, onToastChange }: FaveBtnProps) {

  const [isAdding, setIsAdding] = useState(false)
  const router = useRouter()

  const addToFave = () => {
    if (typeof window === 'undefined') return

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
      onToastChange(true)
      setTimeout(() => onToastChange(false), 4000)
    }
  }

  return (
    <div className="relative">
      <button onClick={(e) => {
        e.preventDefault()
        addToFave()
      }} disabled={isAdding} className='cursor-pointer duration-350 hover:bg-black rounded-md p-1'><Image className='duration-350 hover:invert' src={botaoFavorito} alt="" width={30} /></button>
    </div>
  )
}