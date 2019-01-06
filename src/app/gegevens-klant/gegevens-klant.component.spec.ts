import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GegevensKlantComponent } from './gegevens-klant.component';

describe('GegevensKlantComponent', () => {
  let component: GegevensKlantComponent;
  let fixture: ComponentFixture<GegevensKlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GegevensKlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GegevensKlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
