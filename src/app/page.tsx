import Image from "next/image";
import btnImg from './assets/images/btnStar.png'
import btnTT from './assets/images/ttBlueStars.png'
import banner from './assets/images/bannerLP2.png'
import onmStore  from './assets/images/ornamentStore.png'
import aboutPic1 from './assets/images/Gabi&Felipe.png'
import aboutPic2 from './assets/images/AboutPic2.png'
import aboutVector1 from './assets/images/VectorAbout1.png'
import aboutVector2 from './assets/images/VectorAbout2.png'
import aboutEnfeite from './assets/images/AbouteEnfeite.png'
import aboutEnfeite2 from './assets/images/AboutEnfeite2.png'
import Navbar from "../components/nav";
import Footer from '../components/footer'
import CardListServer from "@/components/listCardsStore";
import { Suspense } from "react";
import Link from "next/link";



export default function Home() {


  return (
    <section className="w-full h-170">
      <section className="relative w-full h-170">
            <Image src={banner} alt="" draggable="false" priority className='w-screen h-170 object-cover'/>       
            <Navbar color={true} invert={true} showLoja={true} showFav={true} showCart={true} showSobre={true} showCtt={true} /> 
          <div className="mt-25 md:mt-35 ml-10 md:ml-25 absolute inset-0 flex flex-col">
            <h1 className="cursor-default font-extrabold text-3xl md:text-6xl text-red-50">Brincar com <br />
            Segurança Nunca <br />
            Foi Tão Divertido!</h1><br />
            <p className="cursor-default text-red-50 font-semibold">
              Bem-vindo à VC Brinquedos Espumados, a loja onde a criatividade encontra a proteção! <br />
              Aqui você encontra brinquedos espumados coloridos, seguros e cheios de possibilidades <br />
              para transformar qualquer espaço em um mundo de alegria. Tudo pensado para estimular <br />
              a imaginação com conforto e confiança!
              </p>
            <Link className="flex items-center cursor-pointer p-5 font-medium w-50 h-15 self-start mt-20 border-1 rounded-4xl border-white text-red-50 hover:scale-108 transition" href={"#toys"}>
              Ver Brinquedos 
              <Image src={btnImg} alt="" draggable="false" className='w-8 h-8 object-cover ml-3'/>
              </Link>
          </div>
      </section>

      <section className="flex w-full justify-center">
        <div className="flex flex-col">
          <div id="toys" className="flex w-[90vw] h-30 pb-5 align-end justify-start ml-5 md:justify-center md:ml-0">
            <Image src={btnTT} alt="" draggable="false" className='w-7 h-7 self-end'></Image>
            <h1 className="font-normal text-4xl self-end">Loja</h1>
          </div>
          
          <div className="w-[85vw] min-h-150 mt-5 border-t self-center">
            <div>
              <h1 className="text-2xl font-bold tracking-wide p-5 mt-5">Nova Coleção</h1>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-5">
            <Suspense fallback={<div>Carregando produtos...</div>}>
              <CardListServer all={false} queryRouter="" filterRouter="" />
            </Suspense>              
            </div>

            <div className="flex justify-end">
              <Link className="font-medium text-[14pt] cursor-pointer text-[#7DACFF] mt-15  duration-800 hover:tracking-[2px]" href={"/products"}>Ver Mais {">>>"}</Link>
            </div>
          </div>
        </div>        
      </section>

      <section className="flex w-full xl:h-230 mt-15 xl:mt-0 pb-20 justify-center" id="about">
        <div className="block flex flex-col">
          <div className="flex w-[90vw] h-30 pb-5 align-end justify-center ">
            <Image src={btnTT} alt="" draggable="false" className='w-7 h-7 self-end'></Image>
            <h1 className="font-normal text-4xl self-end">Sobre Nós</h1>
          </div>
          
        <div className="relative w-[85vw] xl:h-250 mt-5 border border-t self-center"> 
          <div className="hidden w-full h-full xl:flex absolute z-5">
            <div className="absolute">
              <Image src={aboutVector1} alt="" draggable="false" height={320} />
            </div>

            <div className="absolute self-end">
              <Image src={aboutVector2} alt="" draggable="false" height={180} />
            </div>
            
            <div className="absolute h-20 right-0 pb-50 self-start ">
              <Image src={aboutEnfeite} alt="" draggable="false" height={200}/>
            </div>
            {/* <div className="absolute h-20 right-0 pb-50 self-start rotate-0">
              <Image src={aboutEnfeite2} alt="" height={260}/>
            </div> */}
          </div>

          <div className="hidden xl:block xl:absolute right-5">
              <Image src={aboutPic1} alt="" width={460} className="overflow-hidden mt-5 rounded-2xl"></Image>
          </div>           

          <div className="hidden xl:block xl:absolute right-5 bottom-30">
            <Image src={aboutPic2} alt="" width={300} className="overflow-hidden mr-80 border-15 border-white rounded-2xl"/>
          </div>

          

          <div className="relative xl:w-[40vw] xl:mt-5 text-center xl:text-left p-5 z-10">
             <p className="text-[14pt] font-medium">
                Na VC Brinquedos Espumados, acreditamos que brincar é uma 
                das partes mais importantes da infância, e deve ser feita com 
                <strong> segurança</strong>, criatividade e alegria!
              </p>
              
              <br />
              <p className="text-[14pt]  font-medium">                
                Somos uma loja especializada na produção e venda de brinquedos 
                espumados, ideais para escolas, creches, brinquedotecas, espaços 
                recreativos e ambientes que priorizam o bem-estar das crianças. <br /> 
                Nossos produtos são desenvolvidos com materiais macios, <strong>duráveis </strong> e 
                coloridos, pensados para estimular o aprendizado, o movimento e a 
                imaginação de forma segura.
              </p>
              <br />
              <p className="text-[14pt] font-medium">
                Nosso compromisso vai além da diversão: prezamos pela <strong> qualidade</strong>, 
                resistência e segurança, sempre seguindo normas rigorosas para 
                garantir <strong>tranquilidade</strong> a pais, educadores e instituições.
              </p>
              <br />
              <p className="text-[14pt] font-medium">
                Cada peça da VC Brinquedos Espumados é criada com <strong>carinho</strong> e 
                responsabilidade, porque sabemos que <strong>brincar é coisa séria</strong>
              , e também a forma mais bonita de crescer.
              </p>
            </div>
          </div>          
        </div>
      </section>

      <section className="flex w-full h-200 justify-center mt-5" id="footer">
        <div className="flex flex-col">
          
        <div className="w-screen sm:w-[99.2vw] h-400 self-center">            
            <div>
              <Footer/>
            </div>
          </div>          
        </div>
      </section>

    </section>
    

  );
}


