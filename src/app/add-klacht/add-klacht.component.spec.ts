import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKlachtComponent } from './add-klacht.component';

describe('AddKlachtComponent', () => {
  let component: AddKlachtComponent;
  let fixture: ComponentFixture<AddKlachtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKlachtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKlachtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
