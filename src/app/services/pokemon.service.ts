import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, forkJoin } from 'rxjs';
import {
  PokemonListResponse,
  PokemonResult,
  PokemonTypeResponse,
} from '../types/pokemon.types';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  public getAllPokemon(): Observable<PokemonResult[]> {
    return this.http
      .get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=10000&offset=0`)
      .pipe(
        switchMap((res) => {
          const pokemonDetails$: Observable<PokemonResult>[] = res.results.map(
            (pokemon) => this.http.get<PokemonResult>(pokemon.url)
          );
          return forkJoin(pokemonDetails$);
        })
      );
  }

  public getTypes(): Observable<PokemonListResponse> {
    return this.http.get<PokemonTypeResponse>(
      `${this.baseUrl}/type?limit=100&offset=0`
    );
  }
}
