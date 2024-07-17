import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Pokemon } from "../../types/Pokemon";

const generationsUrl =
  "https://pokeapi.co/api/v2/generation/?limit=100000&offset=0";
export const usePokemonData = () => {
  const [data, setData] = useState<null | Array<Pokemon[]>>(null);
  const startedFetchRef = useRef(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        startedFetchRef.current = true;
        const { data: generationList } = await axios.get(generationsUrl);
        const genRequests = generationList.results.map((gen: any) => {
          return axios.get(gen.url);
        });

        const genData = await Promise.all(genRequests);
        const pokeRequests = genData.map((res) =>
          res.data.pokemon_species.map((poke: any) =>
            axios.get(`https://pokeapi.co/api/v2/pokemon/${poke.name}`)
          )
        );

        const pokemonData: any[] = [];
        for (let i = 0; i < pokeRequests.length; i++) {
          const results: any[] = [];
          pokeRequests[i].forEach(async (element: any) => {
            const { data } = await element;
            results.push(data);
          });
          pokemonData.push(results);
        }

        setData(pokemonData);
      } catch (e) {
        console.log(e);
      }
    };
    if (startedFetchRef.current) {
      return;
    }

    fetchPokemonData();
  }, []);

  return data;
};
