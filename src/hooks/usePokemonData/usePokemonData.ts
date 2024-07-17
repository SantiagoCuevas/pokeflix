import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

const generationsUrl =
  "https://pokeapi.co/api/v2/generation/?limit=100000&offset=0";
export const usePokemonData = () => {
  const [data, setData] = useState<any>(null);
  const startedRef = useRef(false);

  const fetchPokemonData = async () => {
    try {
      startedRef.current = true;
      const { data: generationList } = await axios.get(generationsUrl);
      const genRequests = generationList.results.map((gen: any) => {
        return axios.get(gen.url);
      });

      const genData = await Promise.all(genRequests);
      const pokeRequests = genData.map((res) =>
        res.data.pokemon_species
          .slice(0, 20)
          .map((poke) =>
            axios.get(`https://pokeapi.co/api/v2/pokemon/${poke.name}`)
          )
      );

      const pokemonData = [];
      for (let i = 0; i < pokeRequests.length; i++) {
        const results: any[] = [];
        pokeRequests[i].forEach(async (element) => {
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

  useEffect(() => {
    if (startedRef.current) {
      return;
    }

    fetchPokemonData();
  }, [fetchPokemonData]);

  return data;
};
