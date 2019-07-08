import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMerkComponent } from './edit-merk.component';

describe('EditMerkComponent', () => {
  let component: EditMerkComponent;
  let fixture: ComponentFixture<EditMerkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMerkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMerkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
