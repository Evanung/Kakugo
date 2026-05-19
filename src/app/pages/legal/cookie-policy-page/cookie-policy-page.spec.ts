import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiePolicyPage } from './cookie-policy-page';

describe('CookiePolicyPage', () => {
  let component: CookiePolicyPage;
  let fixture: ComponentFixture<CookiePolicyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiePolicyPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CookiePolicyPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
