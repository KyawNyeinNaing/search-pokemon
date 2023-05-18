import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext
} from "next";
import { gql, useQuery } from "@apollo/client";
import Pokemon from "@/components/App/Pokemon";
import { PokemonType } from "@/types/Pokemon";
import { GET_POKEMONS, usePostsQuery } from "@/gql/usePokemonQuery";
import { Image } from "@/components/Common";
import { apolloClient } from "@/controller/client";
import { useEffect, useState } from "react";

type Props = {
  loading: boolean;
  isServer?: boolean;
  pokemons: PokemonType[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data, loading } = await apolloClient.query({
    query: GET_POKEMONS
  });
  const isServer = !!context.req;

  return {
    props: {
      pokemons: data.pokemons,
      loading,
      isServer
    }
  };
};

const Pokemons: NextPage<Props> = (props: Props) => {
  // call from client side
  // const { data = null, error, loading, refetch } = usePostsQuery();

  if (props.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Image type="loading" width={50} height={50} alt="loading" />
      </div>
    );
  }

  return <Pokemon pokemons={props.pokemons} />;
};

export default Pokemons;
