import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Pokemon } from '../types/pokemon.types';
import * as bootstrap from 'bootstrap';
import { scrollToTop } from '../shared/utilities/scrolll-to-top.util';
import { PokemonStatsModalComponent } from '../shared/modal/pokemon-stats-modal/pokemon-stats-modal.component';
import { PokemonStatsModalService } from '../shared/modal/pokemon-stats-modal/pokemon-stats-modal.service';
import { SearchHistoryService } from '../services/search-history.service';
import { FormsModule } from '@angular/forms';
import { PokemonListStore } from './pokemon-list.store';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonStatsModalComponent, FormsModule],
  providers: [PokemonListStore],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  public filteredPokemonsByType = signal<Pokemon[]>([]);
  public isListFiltered = signal(false);
  public pokemonData = signal<Pokemon | undefined>(undefined);
  public isInputFocused = signal(false);
  public currentPage = signal(1);

  public pokemons: Signal<Pokemon[]>;
  public isPokemonsLoading: Signal<boolean>;
  public isTypesLoading: Signal<boolean>;
  public error: Signal<string | null>;
  public types: Signal<string[]>;
  public pokemonsPaginated: Signal<Pokemon[]>;
  public noResultsAfterFilter: Signal<boolean>;
  public shouldDisplayPagination: Signal<boolean>;
  public totalPages: Signal<number>;

  public pageSize = 20;
  public searchText = '';
  public recentSearches: string[] = [];

  constructor(
    private pokemonStatsModalService: PokemonStatsModalService,
    private pokemonListStore: PokemonListStore
  ) {
    this.types = toSignal(this.pokemonListStore.types$, {
      initialValue: [],
    });

    this.pokemons = toSignal(this.pokemonListStore.pokemons$, {
      initialValue: [],
    });

    this.isPokemonsLoading = toSignal(
      this.pokemonListStore.isPokemonsLoading$,
      {
        initialValue: false,
      }
    );
    this.isTypesLoading = toSignal(this.pokemonListStore.isTypesLoading$, {
      initialValue: false,
    });
    this.error = toSignal(this.pokemonListStore.error$, {
      initialValue: null,
    });

    this.pokemonsPaginated = computed(() => {
      if (this.isListFiltered()) {
        return this.getPaginatedPokemons(this.currentPage(), this.pageSize);
      } else {
        return this.getPaginatedPokemons2(this.currentPage(), this.pageSize);
      }
    });

    this.noResultsAfterFilter = computed(
      () => this.isListFiltered() && this.pokemonsPaginated().length === 0
    );

    this.shouldDisplayPagination = computed(
      () =>
        !this.isListFiltered() ||
        (this.isListFiltered() && this.filteredPokemonsByType().length > 20)
    );

    this.totalPages = computed(() => {
      const totalPokemons = this.isListFiltered()
        ? this.filteredPokemonsByType().length
        : this.pokemons().length;
      return Math.ceil(totalPokemons / this.pageSize);
    });
  }

  public ngOnInit(): void {
    const stored = localStorage.getItem('recentSearches');
    if (stored) this.recentSearches = JSON.parse(stored);
  }

  public goToPage(page: number): void {
    if (page > 0) {
      this.currentPage.set(page);
      scrollToTop();
    }
  }

  public nextPage(): void {
    this.currentPage.set(this.currentPage() + 1);
    scrollToTop();
  }

  public previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      scrollToTop();
    }
  }

  public onTypeFilterChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    if (selectedValue === 'all') {
      this.isListFiltered.set(false);
      this.currentPage.set(1);
    } else {
      this.isListFiltered.set(true);
      const filteredPokemons = this.pokemons().filter((pokemon) =>
        pokemon.types.some((type) => {
          return type.toLowerCase().includes(selectedValue.toLowerCase());
        })
      );
      this.filteredPokemonsByType.set(filteredPokemons);
      this.currentPage.set(1);
    }
  }

  public onSearchChange(): void {
    if (this.searchText.trim() === '') {
      // If the search term is empty, reset to the full list
      this.isListFiltered.set(false);
      this.currentPage.set(1);
      // this.loadPokemons();
    } else {
      // Filter the Pokémon list based on the search term
      this.isListFiltered.set(true);
      this.addToRecent(this.searchText);
      const filteredPokemons = this.pokemons().filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          pokemon.types.some((type) =>
            type.toLowerCase().includes(this.searchText.toLowerCase())
          )
      );

      // Update the filteredPokemonsByType signal
      this.filteredPokemonsByType.set(filteredPokemons);

      // Reset to the first page and paginate the filtered results
      this.currentPage.set(1);
      const paginatedPokemons = this.getPaginatedPokemons2(
        this.currentPage(),
        this.pageSize
      );
    }
  }

  public getPokemonData(pokemon: Pokemon) {
    this.pokemonData.set(pokemon);
    this.pokemonStatsModalService.openModal('exampleModal');
  }

  public runSearch(query: string) {
    this.searchText = query;
    this.onSearchChange();
  }

  public addToRecent(query: string) {
    // Avoid duplicates and limit to 5
    this.recentSearches = [
      query,
      ...this.recentSearches.filter((q) => q !== query),
    ].slice(0, 5);

    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }

  public clearSearchHistory() {
    this.recentSearches = [];
    localStorage.removeItem('recentSearches');
  }

  public onInputBlur() {
    // Delay hiding the dropdown to allow click events on dropdown items
    setTimeout(() => {
      this.isInputFocused.set(false);
    }, 200);
  }

  public onInputFocus() {
    this.isInputFocused.set(true);
  }

  private getPaginatedPokemons(page: number, pageSize: number) {
    const startIndex = (page - 1) * pageSize;
    return this.filteredPokemonsByType().slice(
      startIndex,
      startIndex + pageSize
    );
  }

  private getPaginatedPokemons2(page: number, pageSize: number) {
    const startIndex = (page - 1) * pageSize;
    return this.pokemons().slice(startIndex, startIndex + pageSize);
  }
}
