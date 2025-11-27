'use client'

import { useState } from 'react'

export default function CopiarEmail() {
  const email = "vcbrinquedosespumados@gmail.com"
  const [copiado, setCopiado] = useState(false)

  const copiar = async () => {
    await navigator.clipboard.writeText(email)
    setCopiado(true)

    setTimeout(() => {
      setCopiado(false)
    }, 5000)
  }

  return (
    <div className="relative w-fit">
      <button
        onClick={copiar}
        className="p-1 border-solid border-2 border-black-400 rounded-lg cursor-pointer hover:bg-black hover:border-black hover:text-white transition"
      >
        {copiado ? "E-mail copiado" : "Copiar e-mail"}
      </button>
    </div>
  )
}
