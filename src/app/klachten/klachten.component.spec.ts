import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlachtenComponent } from './klachten.component';

describe('KlachtenComponent', () => {
  let component: KlachtenComponent;
  let fixture: ComponentFixture<KlachtenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlachtenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlachtenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
