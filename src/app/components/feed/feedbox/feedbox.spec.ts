import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feedbox } from './feedbox';

describe('Feedbox', () => {
  let component: Feedbox;
  let fixture: ComponentFixture<Feedbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feedbox],
    }).compileComponents();

    fixture = TestBed.createComponent(Feedbox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
