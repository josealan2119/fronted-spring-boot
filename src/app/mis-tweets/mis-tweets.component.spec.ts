import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTweetsComponent } from './mis-tweets.component';

describe('MisTweetsComponent', () => {
  let component: MisTweetsComponent;
  let fixture: ComponentFixture<MisTweetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisTweetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
