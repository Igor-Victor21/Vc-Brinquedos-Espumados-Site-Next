"use client"

export default function Wpp () {
    const wppNumber = "5541987446352"
    
    const handleZap = () => {
        const URLzap = `https://api.whatsapp.com/send?phone=${wppNumber}`
        window.open(URLzap, "_blank")
    }

    return(
        <button onClick={handleZap} className="p-1 border-solid border-2 border-black-400 rounded-lg cursor-pointer hover:bg-black hover:border-black hover:text-white transition">Começar chat</button>
    )
}