import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceAnalyze } from './sentence-analyze';

describe('SentenceAnalyze', () => {
  let component: SentenceAnalyze;
  let fixture: ComponentFixture<SentenceAnalyze>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentenceAnalyze],
    }).compileComponents();

    fixture = TestBed.createComponent(SentenceAnalyze);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
