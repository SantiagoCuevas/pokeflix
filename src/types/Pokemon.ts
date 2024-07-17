export interface Pokemon {
  id: number;
  name: string;
  sprites: PokemonSprites;
  stats: any[];
  types: PokemonType[];
}

export interface PokemonSprites {
  front_default: string;
  other: {
    showdown: {
      front_default: string;
    };
  };
}

export interface PokemonType {
  type: { name: string };
}
