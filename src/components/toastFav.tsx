'use client'

interface ToastProps {
  message: string
  show: boolean
}

export default function Toast({ message, show }: ToastProps) {
  if (!show) return null

  return (
    <div className="mt-1 bg-[#7DACFF] text-white text-xs font-bold px-3 py-2 rounded-lg shadow">
      {message}
    </div>
  )
}
