import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoConnectComponent } from './no-connect.component';

describe('NoConnectComponent', () => {
  let component: NoConnectComponent;
  let fixture: ComponentFixture<NoConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoConnectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
