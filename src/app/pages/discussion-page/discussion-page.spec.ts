import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionPage } from './discussion-page';

describe('DiscussionPage', () => {
  let component: DiscussionPage;
  let fixture: ComponentFixture<DiscussionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscussionPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscussionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
