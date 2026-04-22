import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptStats } from './prompt-stats';

describe('PromptStats', () => {
  let component: PromptStats;
  let fixture: ComponentFixture<PromptStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptStats],
    }).compileComponents();

    fixture = TestBed.createComponent(PromptStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
