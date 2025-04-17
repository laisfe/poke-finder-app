import { Component, input } from '@angular/core';
import { Pokemon } from '../../../types/pokemon.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-stats-modal',
  imports: [CommonModule],
  templateUrl: './pokemon-stats-modal.component.html',
  styleUrl: './pokemon-stats-modal.component.scss',
})
export class PokemonStatsModalComponent {
  public pokemonData = input<Pokemon>(undefined, {
    alias: 'pokemonData',
  });
}
