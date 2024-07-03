import { INamedApiResourceList, IPokemon } from 'pokeapi-typescript';

export const queryItems = async (searchQuery?: string) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${searchQuery || ''}`,
  );
  const items = await res.json();
  return items as INamedApiResourceList<IPokemon>;
};

export const getItemByID = async (url: string) => {
  const pokemon = await fetch(url);
  return await pokemon.json();
};
