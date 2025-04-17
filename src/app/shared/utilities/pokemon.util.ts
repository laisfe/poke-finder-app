import { PokemonStatEnum } from '../../types/pokemon.types';

export const getStatDisplayName = (statName: string): string => {
  switch (statName) {
    case PokemonStatEnum.HP:
      return 'HP';
    case PokemonStatEnum.ATK:
      return 'ATK';
    case PokemonStatEnum.DEF:
      return 'DEF';
    case PokemonStatEnum.SATK:
      return 'SATK';
    case PokemonStatEnum.SDEF:
      return 'SDEF';
    case PokemonStatEnum.SPD:
      return 'SPD';
    case PokemonStatEnum.ACC:
      return 'ACC';
    case PokemonStatEnum.EVS:
      return 'EVS';
    default:
      return statName;
  }
};
