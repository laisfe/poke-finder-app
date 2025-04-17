import {
  Component,
  computed,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Pokemon } from '../types/pokemon.types';
import { PokemonStatsModalComponent } from '../shared/modal/pokemon-stats-modal/pokemon-stats-modal.component';
import { PokemonStatsModalService } from '../shared/modal/pokemon-stats-modal/pokemon-stats-modal.service';
import { FormsModule } from '@angular/forms';
import { PokemonListStore } from './pokemon-list.store';
import { ErrorFeedbackComponent } from '../shared/components/feedback-templates/error-feedback/error-feedback.component';
import { NoMatchesFeedbackComponent } from '../shared/components/feedback-templates/no-matches-feedback/no-matches-feedback.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    PokemonStatsModalComponent,
    FormsModule,
    ErrorFeedbackComponent,
    NoMatchesFeedbackComponent,
    LoadingComponent,
    NavbarComponent,
    PaginationComponent,
  ],
  providers: [PokemonListStore],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  public filteredPokemons: WritableSignal<Pokemon[]> = signal([]);
  public isListFiltered = signal(false);
  public pokemonData = signal<Pokemon | undefined>(undefined);
  public isInputFocused = signal(false);
  public currentPage = signal(1);
  public searchText = signal('');

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
        return this.getPaginatedFilteredPokemons(
          this.currentPage(),
          this.pageSize
        );
      } else {
        return this.getPaginatedPokemons(this.currentPage(), this.pageSize);
      }
    });

    this.noResultsAfterFilter = computed(
      () => this.isListFiltered() && this.pokemonsPaginated().length === 0
    );

    this.shouldDisplayPagination = computed(
      () =>
        !this.isListFiltered() ||
        (this.isListFiltered() && this.filteredPokemons().length > 20)
    );

    this.totalPages = computed(() => {
      const totalPokemons = this.isListFiltered()
        ? this.filteredPokemons().length
        : this.pokemons().length;
      return Math.ceil(totalPokemons / this.pageSize);
    });
  }

  public ngOnInit(): void {
    const stored = localStorage.getItem('recentSearches');
    if (stored) this.recentSearches = JSON.parse(stored);
  }

  public getPokemonData(pokemon: Pokemon) {
    this.pokemonData.set(pokemon);
    this.pokemonStatsModalService.openModal('statsModal');
  }

  private getPaginatedFilteredPokemons(page: number, pageSize: number) {
    const startIndex = (page - 1) * pageSize;
    return this.filteredPokemons().slice(startIndex, startIndex + pageSize);
  }

  private getPaginatedPokemons(page: number, pageSize: number) {
    const startIndex = (page - 1) * pageSize;
    return this.pokemons().slice(startIndex, startIndex + pageSize);
  }
}
