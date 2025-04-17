export enum PokemonStatEnum {
  HP = 'hp',
  ATK = 'attack',
  DEF = 'defense',
  SATK = 'special-attack',
  SDEF = 'special-defense',
  SPD = 'speed',
  ACC = 'accuracy',
  EVS = 'evasion',
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  stats: PokemonStat[];
  types: string[];
  height: number;
  weight: number;
}

export interface PokemonDefaultResult {
  name: string;
  url: string;
}

export interface PokemonResult {
  id: number;
  name: string;
  sprites: PokemonSprites;
  stats: PokemonStatResult[];
  types: PokemonTypesResult[];
  height: number;
  weight: number;
}

export interface PokemonStatResult {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonTypesResult {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonDefaultResult[];
}

export interface PokemonStat {
  name: string;
  displayName: string;
  effort: number;
  baseStat: string;
}

export interface PokemonTypeResponse extends PokemonListResponse {}

export interface PokemonSprites {
  other: {
    [key: string]: {
      front_default?: string;
    };
  };
}
export interface PokemonListState {
  pokemons: Pokemon[];
  types: string[];
  pokemonsLoading: boolean;
  typesLoading: boolean;
  error: string | null;
}
