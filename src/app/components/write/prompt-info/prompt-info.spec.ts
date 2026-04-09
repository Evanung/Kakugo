import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptInfo } from './prompt-info';

describe('PromptInfo', () => {
  let component: PromptInfo;
  let fixture: ComponentFixture<PromptInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(PromptInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
