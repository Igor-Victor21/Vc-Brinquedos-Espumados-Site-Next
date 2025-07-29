"use client"

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation"
import { useState } from "react"

export const SearchBar = () => {

    const router = useRouter(); 
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('query') || '';
    const [query, setQuery] = useState(initialQuery);

    const filter = searchParams.get('filter') || 'todos';


    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if(query) params.set('query', query);
        if(filter) params.set('filter',filter);
        router.push(`/products?${params.toString()}`);
    };
    return(
        <div className="flex flex-row justify-between self-center gap-5">
            <form onSubmit={handleSearch}>
            <input 
            type="text" 
            placeholder="Buscar produto"
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            className="border h-[40px] rounded-2xl self-end pl-4"/>
            </form>
        </div>
    )
}