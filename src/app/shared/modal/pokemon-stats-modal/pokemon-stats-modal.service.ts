import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root',
})
export class PokemonStatsModalService {
  private modalInstance: bootstrap.Modal | null = null;

  constructor() {}

  public openModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    } else {
      console.error(`Modal with id "${modalId}" not found.`);
    }
  }

  public closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.modalInstance = null;
    }
  }
}
