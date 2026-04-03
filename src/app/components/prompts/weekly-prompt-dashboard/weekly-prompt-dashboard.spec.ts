import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyPromptDashboard } from './weekly-prompt-dashboard';

describe('WeeklyPromptDashboard', () => {
  let component: WeeklyPromptDashboard;
  let fixture: ComponentFixture<WeeklyPromptDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyPromptDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(WeeklyPromptDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
