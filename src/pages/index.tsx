import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import Pokemon from '@/components/App/Pokemon';
import { PokemonType } from '@/types/Pokemon';
import { GET_POKEMONS, usePokemonQuery } from '@/gql/usePokemonQuery';
import { Image, InputText } from '@/components/Common';
import { apolloClient } from '@/controller/client';
import { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import queryString from 'query-string';

type Props = {
  loading: boolean;
  error?: boolean;
  isServer?: boolean;
  pokemons: PokemonType[];
  search: string;
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  // get all pokemons
  const { data, loading, error } = await apolloClient.query({
    query: GET_POKEMONS,
  });

  // check server side render
  const isServer = !!context.req;

  return {
    props: {
      pokemons: data.pokemons,
      loading,
      error: error || null,
      isServer,
    },
  };
};

const Pokemons: NextPage<Props> = (props: Props) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [skip, setSkip] = useState<boolean>(true);
  const [searchList, setSearchList] = useState<PokemonType[]>([]);

  // call PokemonByName API from client side
  const { data: searchData = null, loading, called, refetch } = usePokemonQuery(inputVal, skip);

  useEffect(() => {
    if (searchData) {
      setSearchList([searchData?.pokemon]);
    }

    const param = {
      search: inputVal,
    };
    const url = `${window.location.pathname}?${queryString.stringify(param)}`;
    window.history.pushState(null, '', url);

  }, [searchData, inputVal]);

  if (props.loading) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <Image type="loading" width={50} height={50} alt="loading" />
        </div>
      </>
    );
  }

  if (props.error) {
    return <>An error occurred</>;
  }

  return (
    <>
      <div className="space-y-[20px] py-[30px]">
        <div className="grid grid-cols-12">
          <div className="md:col-start-2 md:col-span-4 col-span-12">
            <div className="flex items-end justify-start gap-x-[10px] maxSm:px-[16px]">
              <div>
                <InputText
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  label="Search Pokemon"
                  placeholder="Search Pokemon by name"
                />
              </div>
              <Button
                onClick={() => {
                  setSkip(false);

                  if (!skip) {
                    refetch({
                      search: inputVal,
                    });
                  }
                }}
                disabled={inputVal === '' ? true : false}
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        <Pokemon pokemons={searchData ? searchList : props.pokemons} />
      </div>
    </>
  );
};

export default Pokemons;
