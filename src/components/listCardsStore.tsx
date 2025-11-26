import { CardStore } from "./cardsStore";

type Produto = {
  id: string;
  name: string;
  description: string;
  width?: number | null
  length?: number | null
  height?: number | null
  diameter?: number | null
  image: string;
  price: number;
  discount?: number | string | null;
  section: string,
}[];

interface Props {
  all: boolean;
  queryRouter: string;
  filterRouter: string;
}

export default async function CardListServer({ all, queryRouter, filterRouter }: Props) {

  function removeAcentos(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  try {
    const res = await fetch("https://api-vc-brinquedos-espumados.onrender.com/products", {
      cache: "no-store",
    });

    const data: Produto = await res.json();

    const produtos = all ? data : data.slice(0, 3);

    // Filter by name (search)
    const filtradosPorNome = queryRouter !== ""
      ? produtos.filter((produto) =>
        removeAcentos(produto.name.toLowerCase()).includes(
          removeAcentos(queryRouter.toLowerCase())
        )
      )
      : produtos;

    // Filter by category (filterRouter)
    const filtradosFinais = filtradosPorNome.filter((produto) => {
      if (filterRouter === 'todos') return true;
      if (filterRouter === 'playgrounds') return produto.section.includes('Playgrounds');
      if (filterRouter === 'promocoes') return produto.section.includes('Promocoes');
      if (filterRouter === 'modulos') return produto.section.includes('Modulos');

      return true;
    });

    if (filtradosFinais.length === 0) return <>Nenhum produto foi encontrado!</>;

    return (
      <>
        {filtradosFinais.map((item) => (
          <CardStore
            key={item.id}
            name={item.name}
            description={item.description}
            width={item.width}
            length={item.length}
            height={item.height}
            diameter={item.diameter}
            image={item.image}
            price={item.price}
            discount={item.discount}
            id={item.id}
          />
        ))}
      </>
    );
  } catch (erro) {
    console.error(erro, "Erro ao carregar produtos");
    return <div>Erro ao carregar produtos</div>;
  }
}
