import { gql, useQuery } from '@apollo/client';
import { PokemonType } from '@/types/Pokemon';

export const GET_POKEMONS = gql`
  query GET_POKEMONS {
    pokemons(first: 1000) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const GET_POKEMON = gql`
  query GET_POKEMON_BY_NAME($search: String!) {
    pokemon(name: $search) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

// type PokemonByNameType = {
//   pokemon: PokemonType;
// };

export function usePokemonQuery(search: string, skip: boolean) {
  return useQuery<PokemonType | any>(GET_POKEMON, {
    variables: { search },
    skip,
    fetchPolicy: 'network-only',
  });
}
