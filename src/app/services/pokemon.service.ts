import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, forkJoin, map } from 'rxjs';
import {
  Pokemon,
  PokemonListResponse,
  PokemonResult,
  PokemonStatEnum,
  PokemonTypeDefinitionResponse,
  PokemonTypeResponse,
} from '../types/pokemon.types';
import { getStatDisplayName } from '../shared/utilities/pokemon.util';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  public getAllPokemon(): Observable<any[]> {
    return this.http
      .get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=10000&offset=0`)
      .pipe(
        switchMap((res) => {
          const pokemonDetails$ = res.results.map((pokemon) =>
            this.http.get(pokemon.url)
          );
          return forkJoin(pokemonDetails$);
        })
      );
  }

  public getTypes(): Observable<any> {
    return this.http.get<PokemonTypeResponse>(
      `${this.baseUrl}/type?limit=100&offset=0`
    );
    // .pipe(
    //   map((res) => {
    //     return res.results.map((type) => type.name);
    //   })
    // );
  }

  // public getPokemonsFromType(typeName: string): Observable<Pokemon[]> {
  //   return this.http.get<any>(`${this.baseUrl}/type/${typeName}`).pipe(
  //     switchMap((res) => {
  //       const pokemonDetails$ = res.pokemon.map((pokemon: any) =>
  //         this.http.get(pokemon.pokemon.url)
  //       );
  //       return forkJoin(pokemonDetails$);
  //     }),
  //     map((pokemonList: any) => {
  //       return pokemonList.map((pokemon: any) => ({
  //         id: pokemon.id,
  //         name: pokemon.name,
  //         image: pokemon.sprites.other['official-artwork'].front_default,
  //         stats: pokemon.stats.map((stat: any) => ({
  //           name: stat.stat.name,
  //           displayName: getStatDisplayName(stat.stat.name),
  //           effort: stat.effort,
  //           baseStat: stat.base_stat.toString().padStart(3, '0'),
  //         })),
  //         types: pokemon.types.map((type: any) => type.type.name),
  //         height: pokemon.height,
  //         weight: pokemon.weight,
  //       }));
  //     })
  //   );
  // }

  // getPokemonById(id: number) {
  //   const pokemons = this.getPokemons();
  //   return pokemons.find((pokemon) => pokemon.id === id);
  // }
}
