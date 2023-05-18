type PokemonDimension = {
  minimum: string;
  maximum: string;
};

type PokemonAttack = {
  fast: {
    name: string;
    type: string;
    damage: number;
  }[];
  special: {
    name: string;
    type: string;
    damage: number;
  }[];
};

type PokemonEvolutionRequirement = {
  maxHP: number;
  image: string;
};

export type PokemonType = {
  id?: string;
  number?: string;
  name?: string;
  weight?: PokemonDimension;
  height?: PokemonDimension;
  classification?: string;
  types?: string[];
  resistant?: string[];
  attacks?: PokemonAttack;
  weaknesses?: string[];
  fleeRate?: number;
  maxCP?: number;
  evolutions?: any;
  evolutionRequirements?: PokemonEvolutionRequirement;
  maxHP?: number;
  image: string;
};
