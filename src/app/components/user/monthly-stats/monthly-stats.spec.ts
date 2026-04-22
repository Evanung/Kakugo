import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyStats } from './monthly-stats';

describe('MonthlyStats', () => {
  let component: MonthlyStats;
  let fixture: ComponentFixture<MonthlyStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyStats],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthlyStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
