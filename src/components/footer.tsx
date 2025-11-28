import Image from 'next/image'

import BtnWpp from './wpp'
import BtnEmail from './btnEmail'
import BoxEmail from './formEmail'
import PromoEmail from './inputEmail'

import WrapLeaf from '../app/assets/images/WrapLeaf.png'
import Leaf from '../app/assets/images/Leaf.png'
import KidsBalloon from '../app/assets/images/Kids in Balloon.png'
import Group from '../app/assets/images/GroupBottomBox.png'
import Star from '../app/assets/images/btnStar.png'

import Gmail from '../app/assets/images/IconGmail.png'
import Wpp from '../app/assets/images/IconChat.png'
import Loja from '../app/assets/images/IconPinpoint.png'
import Fone from '../app/assets/images/IconTelefone.png'
import Instagram from '../app/assets/images/insta.png'
import Linkedin from '../app/assets/images/Linkedin.png'
import Face from '../app/assets/images/Facebook.png'
import Github from '../app/assets/images/Github.png'


export default function Footer (){
    return(
        <>
            {/*  1° parte do footer */}
            <section className="relative flex flex-col bg-gradient-to-l from-[#6C85B3] from-100% to-[#7DACFF] to-0% pb-20 xl:flex-row justify-center">
                <div className='hidden xl:block xl:absolute h-[10vh] w-[12vw] right-0'>
                    <Image src={WrapLeaf} alt='' draggable="false" className='h-[28vh] w-[35vw]'/>
                </div>
                <div className='hidden xl:block xl:absolute w-[12vw] right-0 -top-6'>
                    <Image src={Leaf} alt='' draggable="false" className='h-[28vh] w-[35vw]'/>
                </div>
                <div className="">
                    <div className="flex w-[90vw] mt-8 ml-4 pb-4 align-center justify-center bg-gradient-to-l from-[#7DACFF] from-0% to-100% to-[#6C85B3] from-100% to-100% to-100% rounded-full">
                        <Image src={Star} alt="" draggable="false" className='w-7 h-7 self-end color'></Image>
                        <h1 className="font-normal text-4xl">Entre em contato</h1>
                    </div>
                    <div className="flex flex-col md:flex-row gap-20">
                        <BoxEmail/>
                        <div className='z-10 hidden xl:block xl:absolute left-0 bottom-0'>
                            <Image src={Group} alt='' draggable="false" className='h-[28vh] w-[35vw]'/>
                        </div>
                        <div className="p-5 text-center flex flex-col items-center justify-center">
                            <div className="flex flex-row pb-5 gap-5">
                                {/* parte superior */}
                                <div className="z-40 w-1/2 xl:w-3xs flex items-center flex-col">                               
                                    <Image src={Gmail} alt='' draggable='false' className='h-[26px] w-[26px] mb-4'/>
                                    <h1 className="font-medium">Email</h1>
                                    <h3 className="py-2 font-medium">Nossa equipe está pronta para ajudar.</h3>
                                    <BtnEmail/>
                                </div>
                                <div className="z-40 w-1/2 xl:w-3xs flex items-center flex-col">
                                    <Image src={Wpp} alt='' draggable='false' className='h-[26px] w-[26px] mb-4'/>
                                    <h1 className="font-medium">Whatsapp</h1>
                                    <h3 className="py-2 font-medium">Entre em contato conosco via Whatsapp.</h3>
                                    <BtnWpp/>
                                </div>
                            </div>
                            <div className="flex flex-row gap-10">
                                {/* parte inferior */}
                                <div className="z-40 w-1/2 xl:w-3xs flex items-center flex-col">
                                    <Image src={Loja} alt='' draggable='false' className='h-[26px] w-[26px] mb-4'/>
                                    <h1 className="font-medium">Sede</h1>
                                    <h3 className="py-2 font-medium">Venha dizer olá na nossa sede.</h3>
                                    <p className="text-{sm}">Cep: 81750-390 Curitiba - PR Nº 389</p>
                                </div>
                                <div className="z-40 w-1/2 xl:w-3xs flex items-center flex-col">
                                    <Image src={Fone} alt='' draggable='false' className='h-[26px] w-[26px] mb-4'/>
                                    <h1 className="font-medium">Telefone</h1>
                                    <h3 className="py-2 font-medium">Seg - Sex 8:00 até 18:00</h3>
                                    <p className="text-{sm}">(41) 99764-2501</p>
                                </div>
                                <div className='z-10 hidden xl:block xl:absolute right-0 bottom-0'>
                                    <Image src={KidsBalloon} alt='' draggable="false" className='h-[45vh] w-[28vw]'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2° parte do footer */}
            <section className="bg-gradient-to-l from-[#6C85B3] to-[#7DACFF] xl:p-8">
                <div className="">
                    {/* Mensagem inferior */}
                    <div className="flex flex-col text-center xl:flex-row gap-32 p-4">
                        <div className="py-3">
                            <div>
                                {/* Imagem logo */}
                                <h1 className="font-medium">VC Brinquedos Espumados</h1>
                            </div>
                            <p>O mundo mágico dos brinquedos macios começa aqui!</p>
                        </div>
                        <div className="flex flex-col xl:flex-row gap-5 xl:gap-32">
                            <div className="py-2">
                                <h3 className="font-medium">Pós-vendas</h3>
                                <h3 className="font-medium">Seg-Sex - 8:00 até 18:00</h3>
                                <h3 className="font-medium">+55 (41) 99764-2501</h3>
                                <h3 className="font-medium">vcbrinquedosespumados@gmail.com</h3>
                            </div>
                            <div className="py-2">
                                <h3 className="font-medium">Navegação</h3>
                                <h3 className="font-medium">Promoções</h3>
                            </div>
                            <div className="py-2">
                                <h3 className="font-medium">Social</h3>
                                <a href="https://www.instagram.com/vcbrinquedosespumados/" target='_blank' rel='noopener noreferrer'><h3 className="font-medium cursor-pointer">Instagram</h3></a>
                                <a href="https://www.facebook.com/VCBrinquedosespumados/" target='_blank' rel='noopener noreferrer'><h3 className="font-medium cursor-pointer">Facebook</h3></a>
                                
                                
                            </div>
                        </div>
                    </div>
                    {/* imagem de divisão */}
                    <div className="flex flex-col-reverse pt-10 gap-12 xl:flex-row justify-between gap-0">
                        <p className="pl-2">© 2025 VC Brinquedos Espumados. Todos os direitos reservados.</p>
                        <div className='flex items-center flex-row justify-center gap-4 pb-2'>
                            <a href="https://www.instagram.com/vcbrinquedosespumados/" target='_blank' rel='noopener noreferrer'><Image src={Instagram} alt='X' draggable='false' className='h-[26px] w-[26px] motion-safe:hover:scale-110 transition'/></a>
                            <a href="https://www.facebook.com/VCBrinquedosespumados/" target='_blank' rel='noopener noreferrer'><Image src={Face} alt='Facebook' draggable='false' className='h-[26px] w-[26px] motion-safe:hover:scale-110 transition'/></a>
                            <a href="https://github.com/Igor-Victor21" target='_blank' rel='noopener noreferrer'><Image src={Github} alt='Github' draggable='false' className='h-[26px] w-[26px] motion-safe:hover:scale-110 transition'/></a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}