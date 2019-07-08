import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActieComponent } from './add-actie.component';

describe('AddActieComponent', () => {
  let component: AddActieComponent;
  let fixture: ComponentFixture<AddActieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddActieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
