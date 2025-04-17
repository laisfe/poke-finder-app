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

export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonResult[];
}

export interface PokemonStat {
  name: string;
  displayName: string;
  effort: number;
  baseStat: number;
}

export interface PokemonTypeDefinitionResponse {
  id: number;
  pokemon: PokemonResult[];
}

export interface PokemonTypeResponse extends PokemonListResponse {}
