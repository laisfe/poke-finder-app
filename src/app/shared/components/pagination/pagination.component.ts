import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  public currentPage = input<number>(1, { alias: 'currentPage' });
  public totalPages = input<number>(1, { alias: 'totalPages' });

  public currentPageChange = output<number>({ alias: 'currentPageChange' });

  public goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages()) {
      this.currentPageChange.emit(page);
    }
  }

  public nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPageChange.emit(this.currentPage() + 1);
    }
  }

  public previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPageChange.emit(this.currentPage() - 1);
    }
  }
}
