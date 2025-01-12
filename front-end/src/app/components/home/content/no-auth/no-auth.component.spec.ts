import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAuthComponent } from './no-auth.component';

describe('NoAuthComponent', () => {
  let component: NoAuthComponent;
  let fixture: ComponentFixture<NoAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
