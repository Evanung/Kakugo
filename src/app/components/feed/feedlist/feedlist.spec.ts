import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feedlist } from './feedlist';

describe('Feedlist', () => {
  let component: Feedlist;
  let fixture: ComponentFixture<Feedlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feedlist],
    }).compileComponents();

    fixture = TestBed.createComponent(Feedlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
