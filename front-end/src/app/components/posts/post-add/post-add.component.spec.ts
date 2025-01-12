import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAddComponent } from './post-add.component';

describe('PostAddComponent', () => {
  let component: PostAddComponent;
  let fixture: ComponentFixture<PostAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
