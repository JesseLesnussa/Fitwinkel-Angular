import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlachtVervolgComponent } from './klacht-vervolg.component';

describe('KlachtVervolgComponent', () => {
  let component: KlachtVervolgComponent;
  let fixture: ComponentFixture<KlachtVervolgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlachtVervolgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlachtVervolgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
