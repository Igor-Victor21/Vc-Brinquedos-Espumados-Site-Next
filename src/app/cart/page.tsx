'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import Navbar from '@/components/nav'
import EmptyCart from '../assets/images/isempty.png'
import ModalEndereco from "../../components/modalEndereco";

interface CartItem {
  id: string
  quantity: number
  finalPrice?: number
}

interface Produto {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export default function CartPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Modal endereço
  const [open, setOpen] = useState(false)
  const [enderecoValido, setEnderecoValido] = useState(false)
  const [enderecoData, setEnderecoData] = useState<any>(null)

  // ALERTA para o botão FINALIZAR COMPRA
  const [showAlert, setShowAlert] = useState(false)

  const whatsappNumber = "5541997642501"

  const handleValidacaoEndereco = (valid: boolean, data: any) => {
    setEnderecoValido(valid)
    setEnderecoData(data)
  }

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (!storedCart) return

    const parsedCart: CartItem[] = JSON.parse(storedCart)
    setCartItems(parsedCart)

    fetch('https://api-vc-brinquedos-espumados.onrender.com/products')
      .then(res => res.json())
      .then((allProducts: Produto[]) => {
        const idsNoCarrinho = parsedCart.map(item => item.id)
        const filtrados = allProducts.filter(produto =>
          idsNoCarrinho.includes(produto.id)
        )
        setProdutos(filtrados)
      })
      .catch(err => console.error('Erro ao buscar produtos:', err))
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("endereco_cliente");

    if (saved) {
      const parsed = JSON.parse(saved);

      const valid =
        parsed.nome &&
        parsed.cep &&
        parsed.rua &&
        parsed.numero &&
        parsed.bairro &&
        parsed.cidade;

      setEnderecoValido(!!valid);
      setEnderecoData(parsed);

      // 🔥 Se NÃO estiver válido → abrir modal
      if (!valid) setOpen(true);
    } else {
      // Nenhum endereço salvo → abrir modal
      setOpen(true);
    }
  }, []);


  const getQuantidade = (id: string) =>
    cartItems.find(item => item.id === id)?.quantity ?? 0

  const atualizarCarrinho = (novoCarrinho: CartItem[]) => {
    setCartItems(novoCarrinho)
    localStorage.setItem('cart', JSON.stringify(novoCarrinho))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const alterarQuantidade = (id: string, tipo: 'incrementar' | 'decrementar') => {
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
    const itemCarrinho = cartItems.find(item => item.id === produto.id)
    const valor = itemCarrinho?.finalPrice ?? produto.price
    const quantidade = itemCarrinho?.quantity ?? 0
    return acc + valor * quantidade
  }, 0)

  // FINALIZAR COMPRA
  const handleZap = () => {
    if (!enderecoValido) {
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
      return
    }

    const enderecoTexto = `
📍 *Endereço do cliente*
Nome: ${enderecoData.nome}
Telefone: ${enderecoData.telefone}
CEP: ${enderecoData.cep}
Rua: ${enderecoData.rua}, Nº ${enderecoData.numero} - ${enderecoData.complemento}
Bairro: ${enderecoData.bairro}
Cidade: ${enderecoData.cidade}
`

    const itemList = produtos.map((produto) => {
      const quantidade = getQuantidade(produto.id)
      const item = cartItems.find(item => item.id === produto.id)
      const valorUnitario = item?.finalPrice ?? produto.price
      const valorTotal = valorUnitario * quantidade
      return `• ${produto.name} x${quantidade} = R$${valorTotal.toFixed(2)}`
    }).join('\n')

    const message = `
Olá! Gostaria de comprar os seguintes itens:

${itemList}

💰 Total: R$${total.toFixed(2)}

${enderecoTexto}
    `

    const zapURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`
    window.open(zapURL, "_blank")
  }

  return (
    <>
      <Navbar
        color={false}
        invert={false}
        showLoja={true}
        showFav={true}
        showCart={false}
        showSobre={false}
        showCtt={false}
      />

      {/* Modal de endereço */}
      <ModalEndereco
        isOpen={open}
        onClose={() => setOpen(false)}
        onValidChange={handleValidacaoEndereco}
      />

      {/* LISTA DE PRODUTOS */}
      <section className="flex flex-col mt-40 w-screen min-h-[200px] shadow-md px-6 py-8 gap-4 h-[500px] overflow-y-auto scroll-smooth">
        {produtos.length === 0 ? (
          <Image src={EmptyCart} alt='' draggable='false' className='flex self-center pt-20' />
        ) : (
          produtos.map(produto => {
            const quantidade = getQuantidade(produto.id)
            return (
              <div key={produto.id} className="flex flex-row gap-4 border-b border-gray-300 xl:w-[80vw] self-center pb-4">
                <img src={produto.image} alt={produto.name} className="w-24 h-24 rounded-lg object-cover" draggable={false} />
                <div className="flex flex-col justify-between flex-grow">

                  <div className="flex flex-row justify-between">
                    <h2 className="text-lg font-medium">{produto.name}</h2>
                    <p className="text-right font-bold">
                      R$ {((cartItems.find(item => item.id === produto.id)?.finalPrice ?? produto.price) * quantidade).toFixed(2)}
                    </p>
                  </div>

                  <p className="text-sm text-gray-600">{produto.description}</p>

                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => alterarQuantidade(produto.id, 'decrementar')}
                      className="w-6 h-6 flex justify-center cursor-pointer items-center bg-gray-300 rounded hover:bg-black hover:text-white duration-200"
                    >
                      –
                    </button>

                    <span className="text-sm">{quantidade}</span>

                    <button
                      onClick={() => alterarQuantidade(produto.id, 'incrementar')}
                      className="w-6 h-6 flex justify-center cursor-pointer items-center bg-gray-300 rounded hover:bg-black hover:text-white duration-200"
                    >
                      +
                    </button>
                  </div>

                </div>
              </div>
            )
          })
        )}
      </section>

      {/* BOTÕES + ALERTA */}
      <section className="flex flex-col p-5 gap-5 relative">

        <div className="flex flex-row justify-between md:justify-around">
          <h3>SubTotal</h3>
          <p>R$: {total.toFixed(2)}</p>
        </div>

        <div className="flex flex-row justify-between md:justify-around">
          <h3>Total</h3>
          <p>R$: {total.toFixed(2)}</p>
        </div>
        <div className='h-30'>
          {/* ALERTA DO FINALIZAR COMPRA */}
          {showAlert && (
            <div className="absolute bottom-25 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow text-sm animate-pulse z-50">
              Informe o endereço antes de finalizar a compra
            </div>
          )}

          {/* Botão Finalizar Compra */}
          <button
            onClick={handleZap}
            className="absolute w-52 bottom-14 left-1/2 -translate-x-1/2 cursor-pointer motion-safe:hover:scale-105 p-2 bg-[#7DACFF] active:bg-[#6C85B3] rounded-lg duration-200"
          >
            Finalizar Compra
          </button>


          {/* Botão Editar Endereço */}
          <button
            onClick={() => setOpen(true)}
            className="absolute w-52 bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#7DACFF] cursor-pointer rounded "
          >
            Editar Endereço
          </button>
        </div>



      </section>
    </>
  )
}
