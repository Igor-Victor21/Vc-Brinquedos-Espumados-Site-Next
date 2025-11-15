'use client'

import CartBtn from './btnCart'
import FaveBtn from './btnFave'

interface Props {
  name: string
  image: string
  description: string
  width?: number | null
  length?: number | null
  height?: number | null
  diameter?: number | null
  price: number
  discount?: number | string | null
  id: string
}

export const CardStore = ({
  name,
  image,
  description,
  width,
  length,
  height,
  diameter,
  price,
  discount,
  id
}: Props) => {
  const discountNumber =
    typeof discount === 'string'
      ? parseFloat(discount)
      : discount ?? 0

  const finalPrice = price - price * (discountNumber / 100)

  return (
    <div className="flex flex-col w-60 self-center md:self-start gap-1 rounded-[25px] shadow-[0px_13px_19px_rgba(0,0,0,0.15)]">
      <div>
        <img
          src={image}
          alt={name}
          width={300}
          height={200}
          draggable={false}
          className="rounded-t-[25px]"
        />
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex w-50 flex-col ml-5">
          <h2 className="h-auto font-medium">{name}</h2>
          <strong className='mt-[10px]'>Descrição:</strong>
          <p className="h-auto">{description}</p>
          <strong className='mt-[10px]'>Medidas:</strong>
          <p className="h-10">
            {(diameter ?? 0) > 0
              ? `${(diameter ?? 0).toFixed(2)} X ${(height ?? 0).toFixed(2)}`
              : `${(width ?? 0).toFixed(2)} X ${(length ?? 0).toFixed(2)} X ${(height ?? 0).toFixed(2)}`}
          </p>
        </div>

        <div className="flex w-10 h-10 self-end justify-center mr-5">
          <FaveBtn id={id} name={name} price={price} image={image} />
        </div>
      </div>

      <div className="flex mb-10 pt-4 items-baseline justify-center">
        <div className="flex h-10 w-full justify-between items-center pl-[20px]">
          <div className="flex flex-col">
            {discountNumber > 0 ? (
              <>
                <span className="text-gray-400 line-through text-sm">
                  R$ {price.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-[#7DACFF] text-2xl font-bold">
                  R$ {finalPrice.toFixed(2).replace('.', ',')}
                </span>
              </>
            ) : (
              <span className="text-[#7DACFF] text-2xl font-bold">
                R$ {price.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>

          <CartBtn id={id} name={name} width={width} length={length} height={height} diameter={diameter} discount={discount} price={price} finalPrice={finalPrice} image={image} />
        </div>
      </div>
    </div>
  )
}
