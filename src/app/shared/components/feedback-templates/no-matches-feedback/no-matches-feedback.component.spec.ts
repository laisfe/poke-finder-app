import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMatchesFeedbackComponent } from './no-matches-feedback.component';

describe('NoMatchesFeedbackComponent', () => {
  let component: NoMatchesFeedbackComponent;
  let fixture: ComponentFixture<NoMatchesFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoMatchesFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoMatchesFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
