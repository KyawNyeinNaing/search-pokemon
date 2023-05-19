import React, { useState } from 'react';
import { Card, Typography } from '@material-tailwind/react';
import { PokemonType } from '@/types/Pokemon';
import { Image } from '../Common';
import { css, styled } from 'styled-components';
import Modal from '../Common/Dialog';

type Props = {
  pokemons: PokemonType[];
};

const typeColor: any = {
  grass: '#00b894',
  poison: '#6c5ce7',
  fire: '#f0932b',
  water: '#0190FF',
  flying: '#81ecec',
  bug: '#26de81',
  normal: '#95afc0',
  electric: '#fed330',
  ground: '#EFB549',
  fairy: '#FF0069',
  fighting: '#30336b',
  psychic: '#a29bfe',
  rock: '#2d3436',
  ghost: '#a55eea',
  dragon: '#ffeaa7',
  ice: '#74b9ff',
};

const Pokemon: React.FC<Props> = ({ pokemons }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [getPokemon, setGetPokemon] = useState<PokemonType>();
  const keys = Object.keys(typeColor);

  const handleOpen = (pokemon?: PokemonType) => {
    setOpen(!open);
    if (!pokemon) return;
    setGetPokemon(pokemon);
  };

  if (!pokemons[0]) {
    return (
      <>
        <div className="grid grid-cols-12">
          <div className="col-start-2 col-span-4">
            <Typography>No result found!</Typography>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="grid grid-cols-12 md:gap-[20px] maxSm:flex maxSm:flex-wrap maxSm:justify-center maxSm:gap-[20px]">
      {pokemons?.map((pokemon, key) => {
        let colStart;
        if (key === 0) {
          colStart = 'md:col-start-2';
        } else {
          if (key % 5 === 0) {
            colStart = 'md:col-start-2';
          } else {
            colStart = '';
          }
        }

        const getVal: any = keys.find(val => val === pokemon?.types![0].toLowerCase());

        return (
          <div key={key} className={`${colStart} md:col-span-2`}>
            <CardStyled typecolor={typeColor[getVal]} onClick={() => handleOpen(pokemon)}>
              <div className="w-full h-[300px]">
                <div className="relative flex flex-col items-center justify-center">
                  <div className="bg-white absolute top-[5px] right-[15px] px-[5px] py-[2px] rounded-[10px] text-[12px]">
                    <span className="font-[600]">HP </span>- {pokemon?.maxHP}
                  </div>
                  <div className="bg-white flex items-center justify-center rounded-[50%] overflow-hidden w-[100px] h-[100px] mt-[40px]">
                    <Image type="image" src={pokemon?.image || ''} width={70} height={70} alt={pokemon?.name} />
                  </div>
                  <h2 color="black">{pokemon?.name}</h2>
                  <Type
                    typecolor={typeColor[getVal]}
                    className="text-white mt-[10px] px-[7px] py-[2px] rounded-[10px] text-[12px]"
                  >
                    <span>{pokemon?.types![0]}</span>
                    {pokemon?.types![1] && <span>, {pokemon?.types![1]}</span>}
                  </Type>
                  <div className="w-full flex items-start justify-between px-[10px] mt-[35px]">
                    <div className="flex flex-col justify-center items-center w-[45px]">
                      <p className="text-[12px] font-[600]">Max CP</p>
                      <p className="text-[12px]">{pokemon?.maxCP}</p>
                    </div>
                    {pokemon?.evolutions && (
                      <div className="flex flex-col justify-center items-center w-[90px] ">
                        <p className="text-[12px] font-[600] ">Evolutions</p>
                        {pokemon?.evolutions?.map((ev: { name: string }, i: number) => (
                          <p key={i} className="text-[12px] text-center">
                            {ev.name}
                          </p>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-col justify-center items-center w-[60px]">
                      <p className="text-[12px] font-[600]">Fleet rate</p>
                      <p className="text-[12px]">{pokemon?.fleeRate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardStyled>
          </div>
        );
      })}
      <Modal open={open} handleOpen={handleOpen} pokemonData={getPokemon} />
    </div>
  );
};

export default Pokemon;

const CardStyled = styled(Card)<{ typecolor: string }>`
  cursor: pointer;
  background: ${props =>
    props.typecolor &&
    css`
    radial-gradient(circle at 50% 0%, ${props.typecolor} 36%, rgb(255, 255, 255) 36%)
  `};
`;

const Type = styled.div<{ typecolor: string }>`
  background: ${props => props.typecolor};
`;
