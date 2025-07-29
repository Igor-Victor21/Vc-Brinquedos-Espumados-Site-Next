'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import Navbar from '@/components/nav'
import EmptyCart from '../assets/images/isempty.png'

interface CartItem {
  id: number
  quantity: number
}

interface Produto {
  id: number
  name: string
  description: string
  price: number
  image: string
}

export default function CartPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const whatsappNumber = "5541987446352"

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (!storedCart) return
    
    const parsedCart: CartItem[] = JSON.parse(storedCart)
    setCartItems(parsedCart)

    fetch('http://localhost:5555/products')
      .then(res => res.json())
      .then((allProducts: Produto[]) => {
        const idsNoCarrinho = parsedCart.map(item => item.id)
        const filtrados = allProducts.filter(produto =>
          idsNoCarrinho.includes(produto.id)
        )
        setProdutos(filtrados)
      })
      .catch(err => console.error('Erro ao buscar produtos:', err))

      const user = localStorage.getItem('user')
      setIsLoggedIn(!!user)
  }, [])

  const getQuantidade = (id: number) =>
    cartItems.find(item => item.id === id)?.quantity ?? 0

  const atualizarCarrinho = (novoCarrinho: CartItem[]) => {
    setCartItems(novoCarrinho)
    localStorage.setItem('cart', JSON.stringify(novoCarrinho))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const alterarQuantidade = (id: number, tipo: 'incrementar' | 'decrementar') => {
  const novoCarrinho = cartItems
    .map(item => {
      if (item.id === id) {
        const novaQuantidade =
          tipo === 'incrementar' ? item.quantity + 1 : item.quantity - 1
        return { ...item, quantity: novaQuantidade }
      }
      return item
    })
    .filter(item => item.quantity > 0)

  atualizarCarrinho(novoCarrinho)

  const idsRestantes = novoCarrinho.map(item => item.id)
  const novosProdutos = produtos.filter(produto => idsRestantes.includes(produto.id))
  setProdutos(novosProdutos)
  }

  const total = produtos.reduce((acc, produto) => {
    const quantidade = getQuantidade(produto.id)
    return acc + produto.price * quantidade
  }, 0)

  const handleZap = () => {

    if (!isLoggedIn) {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 5000)
      return
    }

    const itemList = produtos.map((produto) => {
    const quantidade = getQuantidade(produto.id)
    return ` • ${produto.name} x${quantidade} = R$${(produto.price * quantidade).toFixed(2)}`
    }).join('\n')

    const message = `Olá, e gostaria de comprar o(s) seguinte(s) item(ns):\n\n${itemList}\n\nque fica no valor de: R$${total.toFixed(2)}`
    const cleanMessage = encodeURIComponent(message)
    const URLzap = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${cleanMessage}`

    window.open(URLzap, "_blank")
  }

  return (
    <>
      <Navbar color={false} invert={false} showLoja={true} showFav={true} showCart={false} showSobre={false} showCtt={false}/>

      <section className="flex flex-col mt-40 w-screen min-h-[200px] shadow-md px-6 py-8 gap-4 h-[500px] overflow-y-auto scroll-smooth">
        {produtos.length === 0 ? (
          <Image src={EmptyCart} alt='' draggable='false' className='flex self-center pt-20'/>
        ) : (
          produtos.map(produto => {
            const quantidade = getQuantidade(produto.id)
            return (
              <div key={produto.id} className="flex flex-row gap-4 border-b border-gray-300 xl:w-[80vw] self-center pb-4">
                <img src={produto.image} alt={produto.name} className="w-24 h-24 rounded-lg object-cover" draggable={false}/>
                <div className="flex flex-col justify-between flex-grow">
                  <div className="flex flex-row justify-between">
                    <h2 className="text-lg font-medium">{produto.name}</h2>
                    <p className="text-right font-bold">R$ {(produto.price * quantidade).toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-gray-600">{produto.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => alterarQuantidade(produto.id, 'decrementar')} className="w-6 h-6 flex justify-center cursor-pointer items-center bg-gray-300 rounded hover:bg-black hover:text-white duration-200">–</button>
                    <span className="text-sm">{quantidade}</span>
                    <button onClick={() => alterarQuantidade(produto.id, 'incrementar')} className="w-6 h-6 flex justify-center cursor-pointer items-center bg-gray-300 rounded hover:bg-black hover:text-white duration-200">+</button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </section>

      <section className="flex flex-col p-5 gap-5">
        <div className="flex flex-row justify-between md:justify-around">
          <h3>SubTotal</h3>
          <p>R$: {total.toFixed(2)}</p>
        </div>
        <div className="flex flex-row justify-between md:justify-around">
          <h3>Total</h3>
          <p>R$: {total.toFixed(2)}</p>
        </div>
        {showToast && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[80vw] md:w-[40vw] xl:w-[20vw] bg-gray-500 p-4 z-50 rounded-lg shadow-md">
            <button onClick={() => setShowToast(false)} className="text-gray-300 hover:text-white cursor-pointer font-bold self-end mb-2">X</button>
            <p className="text-sm text-white font-bold text-center">Você precisa estar logado para finalizar a compra.</p>
          </div>
        )}
        <button onClick={handleZap} className="absolute w-52 -bottom-4 self-center cursor-pointer motion-safe:hover:scale-105 p-1 m-8 bg-[#7DACFF] active:bg-[#6C85B3] active:text-white rounded-lg duration-200">Finalizar Compra</button>
      </section>
    </>
  )
}