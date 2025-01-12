import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentAddComponent } from './comment-add.component';

describe('CommentAddComponent', () => {
  let component: CommentAddComponent;
  let fixture: ComponentFixture<CommentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
