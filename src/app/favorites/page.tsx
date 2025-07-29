'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import NavBar from '@/components/nav'
import EmptyFave from '../assets/images/faveEsmpty.png'

interface FavoriteItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])

  useEffect(() => {
    const storedFaves = localStorage.getItem('favorites')
    if (!storedFaves) return

    const parsedFaves: FavoriteItem[] = JSON.parse(storedFaves)
    setFavorites(parsedFaves)
  }, [])

  const removerFavorito = (id: number) => {
    const novosFavoritos = favorites.filter(item => item.id !== id)
    setFavorites(novosFavoritos)
    localStorage.setItem('favorites', JSON.stringify(novosFavoritos))
    window.dispatchEvent(new Event('faveUpdated'))
  }

  return (
    <>
      <NavBar color={false} invert={false} showLoja={true} showFav={false} showCart={true} showSobre={false} showCtt={false}/>

      <section className="flex flex-col mt-20 w-screen min-h-[200px] shadow-md px-6 py-8 gap-4 h-[80vh] overflow-y-auto scroll-smooth">
        {favorites.length === 0 ? (
          <Image src={EmptyFave} alt='Lista de favoritos vazia' draggable='false' className='flex self-center max-w-[80vw] xl:w-[40vw] pt-20'/>
        ) : (
          favorites.map(item => (
            <div key={item.id} className="flex flex-row gap-4 border-b border-gray-300 pb-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" draggable={false}/>
              <div className="flex flex-col justify-between flex-grow">
                <div className="flex flex-row justify-between">
                  <h2 className="text-lg font-medium">{item.name}</h2>
                </div>
                <p className="text-sm text-gray-600">R$ {item.price.toFixed(2)}</p>
                <button onClick={() => removerFavorito(item.id)} className="mt-2 w-20 cursor-pointer text-sm hover:text-white bg-red-300 hover:bg-red-600 duration-450 rounded-md py-1 px-2">Remover</button>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  )
}