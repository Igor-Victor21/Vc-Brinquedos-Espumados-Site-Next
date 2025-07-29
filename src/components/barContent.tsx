"use client"

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation"
import { useState } from "react"

export const BarContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const initialFilter = searchParams.get('filter') || 'todos';
    const [bar, setBar] = useState(initialFilter);

    const handleFilterChange = (newFilter: string) => {
        setBar(newFilter);

        const params = new URLSearchParams(searchParams.toString());
        params.set('filter', newFilter);

        // preserve query param if it exists
        router.push(`/products?${params.toString()}`);
    };

    

    return(
        <div className="flex flex-row gap-10 mt-[2vh] justify-center">
            
            <button onClick={() => handleFilterChange('todos')} className={`w-25 p-1 rounded-md cursor-pointer hover:bg-[#a2c4ff] duration-330 ${bar==='todos' ? 'bg-[#7DACFF] scale-110' : 'bg-transparent'}`}>Todos</button>
            <button onClick={() => handleFilterChange('kits')} className={`w-25 p-1 rounded-md cursor-pointer hover:bg-[#a2c4ff] duration-330 ${bar==='kits' ? 'bg-[#7DACFF] scale-110' : 'bg-transparent'}`}>Kits</button>
            <button onClick={() => handleFilterChange('promocoes')} className={`w-25 p-1 rounded-md cursor-pointer hover:bg-[#a2c4ff] duration-330 ${bar==='promocoes' ? 'bg-[#7DACFF] scale-110' : 'bg-transparent'}`}>Promoções</button>
            
        </div>
    )
}