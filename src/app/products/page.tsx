import CardListServer from "@/components/listCardsStore"
import Navbar from "@/components/nav"
import { Suspense } from "react"
import Image from "next/image"
import btnTT from '../assets/images/ttBlueStars.png'
import Footer from "@/components/footer"
import { SearchBar } from "@/components/searchBar"
import { BarContent } from "@/components/barContent"

interface Props {
  searchParams?: Record<string, string | undefined>;
}


export default async function productsPage({ searchParams }: Props) {
  const params = searchParams ?? {};
  const query = params.query || "";
  const filter = params.filter || "todos";


  return (
    <>
      <Navbar color={false} invert={false} showLoja={false} showFav={true} showCart={true} showSobre={false} showCtt={false} />
      <section className="flex w-full h-[auto] mb-15 justify-center pt-[20%] md:pt-[5%]">
        <div className="flex flex-col">
          <div className="flex w-[90vw] h-30 pb-5 align-end justify-start ml-5 md:justify-center md:ml-0">
            <Image src={btnTT} alt="" draggable="false" className='w-7 h-7 self-end'></Image>
            <a className="self-end" href="/products">
              <h1 className="font-normal text-4xl duration-350 hover:tracking-[2px] cursor-default">{query === '' ? 'Loja' : 'Voltar'}</h1>
            </a>
          </div>

          <div className="w-[85vw] min-h-150 mt-5 border-t self-center">
            <div className="flex flex-col md:flex-row justify-center md:gap-50 xl:justify-between">
              <h1 className="text-2xl self-center mb-5 xl:mb-0 font-bold tracking-wide p-0 mt-5 cursor-default">{query === '' ? 'Nova Coleção' : 'Item pesquisado: ' + query}</h1>
              <SearchBar />

            </div>

            <div className="flex flex-row gap-5 mt-[2vh] justify-center">
              <BarContent />
            </div>

            <div className="flex flex-wrap flex-col md:flex-row gap-5 justify-center  mt-[3rem]" id="searchProducts">
              <Suspense fallback={<div className="mt-50">Carregando produtos...</div>}>
                <CardListServer all={true} queryRouter={query} filterRouter={filter} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
      <section><Footer /></section>
    </>
  )
}