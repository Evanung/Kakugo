import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptsPage } from './prompts-page';

describe('PromptsPage', () => {
  let component: PromptsPage;
  let fixture: ComponentFixture<PromptsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PromptsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
