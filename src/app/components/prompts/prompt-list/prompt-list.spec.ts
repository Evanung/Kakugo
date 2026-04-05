import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptList } from './prompt-list';

describe('PromptList', () => {
  let component: PromptList;
  let fixture: ComponentFixture<PromptList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptList],
    }).compileComponents();

    fixture = TestBed.createComponent(PromptList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
