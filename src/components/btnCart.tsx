'use client'

import  Image  from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import botaoComprar from '../app/assets/images/botaoComprar.png'

interface CartBtnProps {
  id: string
  name: string
  width?: number | null
  length?: number | null
  height?: number | null
  diameter?: number | null
  price: number
  discount?: number | string | null
  image: string
  finalPrice: number

}

interface CartItem {
  id: string
  name: string
  width?: number | null
  length?: number | null
  height?: number | null
  diameter?: number | null
  price: number
  discount?: number | string | null
  image: string
  finalPrice: number
  quantity: number
}

export default function CartBtn({ id, name, width, length, height, diameter, price, discount, image, finalPrice }: CartBtnProps) {
  const [isAdding, setIsAdding] = useState(false)
  const router = useRouter()

  const addToCart = () => {
    if (typeof window === 'undefined') return

    setIsAdding(true)

    try {
      const currentCart = localStorage.getItem('cart')
      const cart: CartItem[] = currentCart ? JSON.parse(currentCart) : []

      const existingItemIndex = cart.findIndex(item => item.id === id)

      if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += 1
      } else {
        cart.push({ id, name, width, length, height, diameter, price, discount, image, finalPrice, quantity: 1 })
      }

      localStorage.setItem('cart', JSON.stringify(cart))
      window.dispatchEvent(new Event('cartUpdated'))

      router.refresh()
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsAdding(false)
    }
}

  return (
    <button onClick={addToCart} disabled={isAdding} className='right-0 mr-5 cursor-pointer h-auto'><Image className="duration-400 hover:invert" src={botaoComprar} alt="" width={40} draggable={false}/></button>
  )
}