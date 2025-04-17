import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonStatsModalComponent } from './pokemon-stats-modal.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PokemonStatsModalComponent', () => {
  let component: PokemonStatsModalComponent;
  let fixture: ComponentFixture<PokemonStatsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        PokemonStatsModalComponent,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonStatsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
