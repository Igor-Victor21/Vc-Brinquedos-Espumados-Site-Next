import CartBtn from './btnCart'
import FaveBtn from './btnFave'

interface Props{
    name: string,
    image: string,
    description: string,
    price: number,
    id: number,
}

export const CardStore = ({ name, image, description, price, id } : Props) => {
    return(
        <div className="flex flex-col w-60 self-center md:self-start gap-1 rounded-[25px] shadow-[0px_13px_19px_rgba(0,0,0,0.15)]">
            <div>
               <img src={image} alt={name} width={300} height={200} draggable={false}/>
            </div>
            <div className='flex flex-row justify-between'>
                <div className="flex w-50 flex-col ml-5">
                    <h2 className='h-20 font-medium'>{name}</h2>
                    <p className="h-30">{description}</p>
                </div>
                <div className='flex w-10 h-10 self-end justify-center mr-5'>
                    <FaveBtn id={id} name={name} price={price} image={image} />
                </div>
            </div>
            <div className="flex mb-10 pt-4 items-baseline justify-center">
                <div className="flex h-10 w-full justify-between items-center">
                    <strong className='ml-5'>R$ {price.toFixed(2)}</strong>
                    <CartBtn id={id} name={name} price={price} image={image}/>
                </div>
            </div>
        </div>
    )
}