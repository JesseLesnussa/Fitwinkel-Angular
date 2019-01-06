import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectKlantComponent } from './select-klant.component';

describe('SelectKlantComponent', () => {
  let component: SelectKlantComponent;
  let fixture: ComponentFixture<SelectKlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectKlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectKlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
