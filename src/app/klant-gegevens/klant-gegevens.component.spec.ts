import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlantGegevensComponent } from './klant-gegevens.component';

describe('KlantGegevensComponent', () => {
  let component: KlantGegevensComponent;
  let fixture: ComponentFixture<KlantGegevensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlantGegevensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlantGegevensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
